import React, { useState, useEffect } from "react";

import { useAppDispatch, useAppSelector } from "hooks/useAppDispatch";
import { getBanners } from "redux/home/homeThunk";
import { INTERVAL_DURATION } from "contains";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import LoadingBlock from "customs/LoadingBlock";
import Button from "customs/Button";

const Banner: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const dispatch = useAppDispatch();
  const { banners, loadingBanner } = useAppSelector((state) => state.home);
  useEffect(() => {
    const interval: NodeJS.Timeout = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, INTERVAL_DURATION);

    return () => clearInterval(interval);
  }, [banners.length]);

  useEffect(() => {
    if (!banners || banners.length === 0) {
      dispatch(getBanners());
    }
  }, [dispatch, banners]);

  useEffect(function () {}, []);
  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex === 0 ? banners.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex === banners.length - 1 ? 0 : prevIndex + 1));
  };

  const handleIndicatorClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className="relative bg-white">
      <div className="relative overflow-hidden w-full min-h-32 sm:min-h-72 md:min-h-96 lg:min-h-[400px] rounded-lg">
        <div
          className="carousel-main absolute top-0 bottom-0 start-0 flex flex-nowrap transition-transform duration-1000 ease-in-out"
          style={{
            transform: `translateX(-${activeIndex * 100}%)`,
          }}
        >
          {loadingBanner ? (
            <LoadingBlock />
          ) : (
            <>
              {banners.map((banner) => (
                <div key={banner.id} className={`carousel-item flex justify-center w-full h-full rounded-md`}>
                  <img className="w-full rounded-md object-contain" src={banner.image} />
                </div>
              ))}
            </>
          )}
        </div>
      </div>
      <Button
        width="46px"
        styles={
          "disabled:pointer-events-none absolute inset-y-0 start-0 inline-flex justify-center items-center  text-gray-800  focus:outline-none marker:rounded-s-lg"
        }
        onClick={handlePrev}
      >
        <ChevronLeftIcon className="w-10 h-10" />
      </Button>
      <Button
        width="46px"
        styles={"disabled:pointer-events-none absolute inset-y-0 end-0 inline-flex justify-center items-center  text-gray-800 rounded-e-lg"}
        onClick={handleNext}
      >
        <ChevronRightIcon className="w-10 h-10 " />
      </Button>
      <div className="flex justify-center absolute bottom-0 start-0 end-0 space-x-2">
        {!!banners &&
          banners.map((_, index) => (
            <span
              key={index}
              className={`w-[30px] h-1 border border-gray-400 mb-2  cursor-pointer ${activeIndex === index ? "bg-black" : "bg-white"}`}
              onClick={() => handleIndicatorClick(index)}
            ></span>
          ))}
      </div>
    </div>
  );
};

export default Banner;

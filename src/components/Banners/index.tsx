import React, { useState, useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../hooks/useAppDispatch";
import { getBanners } from "../../redux/reducer/productReducer/productThunk";
import { INTERVAL_DURATION } from "../../contains";

const Banner: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const dispatch = useAppDispatch();
  const { banners, isLoading } = useAppSelector((state) => state.product);
  useEffect(() => {
    const interval: NodeJS.Timeout = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, INTERVAL_DURATION);

    return () => clearInterval(interval);
  }, [banners.length]);

  useEffect(() => {
    dispatch(getBanners());
  }, []);

  useEffect(function () {}, []);
  const handlePrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? banners.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === banners.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleIndicatorClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className='relative bg-white'>
      <div className='relative overflow-hidden w-full min-h-56 sm:min-h-72 md:min-h-96 lg:min-h-[400px] rounded-lg'>
        <div
          className='carousel-main absolute top-0 bottom-0 start-0 flex flex-nowrap transition-transform duration-1000 ease-in-out'
          style={{
            transform: `translateX(-${activeIndex * 100}%)`,
          }}
        >
          {isLoading && (
            <div
              role='status'
              className='flex justify-center items-center w-full h-full'
            >
              <div className='dot-spinner'>
                <div className='dot-spinner__dot'></div>
                <div className='dot-spinner__dot'></div>
                <div className='dot-spinner__dot'></div>
                <div className='dot-spinner__dot'></div>
                <div className='dot-spinner__dot'></div>
                <div className='dot-spinner__dot'></div>
                <div className='dot-spinner__dot'></div>
                <div className='dot-spinner__dot'></div>
              </div>
            </div>
          )}
          {banners.map((banner) => (
            <div
              key={banner.id}
              className={`carousel-item flex justify-center w-full h-full p-6 rounded-md`}
            >
              <img className='w-full rounded-md' src={banner.image} />
            </div>
          ))}
        </div>
      </div>

      <button
        type='button'
        className='disabled:pointer-events-none absolute inset-y-0 start-0 inline-flex justify-center items-center w-[46px] h-full text-gray-800  focus:outline-none marker:rounded-s-lg'
        onClick={handlePrev}
      >
        <span className='text-2xl' aria-hidden='true'>
          <svg
            className='shrink-0 size-5'
            xmlns='http://www.w3.org/2000/svg'
            width='50'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <path d='m15 18-6-6 6-6'></path>
          </svg>
        </span>
        <span className='sr-only'>Previous</span>
      </button>

      <button
        type='button'
        className='disabled:pointer-events-none absolute inset-y-0 end-0 inline-flex justify-center items-center w-[46px] h-full text-gray-800 rounded-e-lg'
        onClick={handleNext}
      >
        <span className='sr-only'>Next</span>
        <span className='text-2xl' aria-hidden='true'>
          <svg
            className='shrink-0 size-5'
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <path d='m9 18 6-6-6-6'></path>
          </svg>
        </span>
      </button>

      <div className='flex justify-center absolute bottom-0 start-0 end-0 space-x-2'>
        {banners.map((_, index) => (
          <span
            key={index}
            className={`w-[30px] h-1 border border-gray-400 mb-2  cursor-pointer ${
              activeIndex === index ? "bg-black" : "bg-white"
            }`}
            onClick={() => handleIndicatorClick(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Banner;

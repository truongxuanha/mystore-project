import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import styled from "styled-components";
import ProductCard from "components/Products/ProductCard";
import TitleListProduct from "customs/TitleListProduct";
import LoadingBlock from "customs/LoadingBlock";
type Props = {
  data: any;
  title: string;
  loading?: boolean;
};
const SliderWrapper = styled.div`
  .slick-dots {
    bottom: 0;
  }
  .slick-dots li {
    margin: 0 2px;
  }
  .slick-dots li button {
    color: #333;
    &:before {
      font-size: 10px;
    }
  }
  .slick-dots li button:before {
    color: #f2f0f0;
    opacity: 1;
  }
  .slick-dots li.slick-active button {
    &:before {
      color: #655e5e;
    }
  }
`;
const SliderListProduct = ({ data, title, loading }: Props) => {
  const PrevArrow = ({ onClick }: any) => (
    <button
      className="absolute top-1/2 transform -translate-y-1/2 left-2 z-10 bg-orange-200 text-black rounded-full p-2 shadow hover:bg-orange-100"
      onClick={onClick}
    >
      <ChevronLeftIcon className="w-6 h-6" />
    </button>
  );

  const NextArrow = ({ onClick }: any) => (
    <button
      className="absolute top-1/2 transform -translate-y-1/2 right-2 z-10 bg-orange-200 text-black rounded-full p-2 shadow hover:bg-orange-100"
      onClick={onClick}
    >
      <ChevronRightIcon className="w-6 h-6" />
    </button>
  );

  const settings = {
    dots: false,
    infinite: true,
    speed: 700,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 4000,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div className="bg-white p-3">
      <TitleListProduct title={title} />
      {loading ? (
        <LoadingBlock />
      ) : (
        <>
          <SliderWrapper className="relative">
            <Slider {...settings}>
              {data.map((item: any, index: number) => (
                <ProductCard key={index} product={item} />
              ))}
            </Slider>
          </SliderWrapper>
        </>
      )}
    </div>
  );
};

export default SliderListProduct;

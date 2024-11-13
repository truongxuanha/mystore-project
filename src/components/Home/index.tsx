import { assets } from "assets/index";
import { BannerLeft, BannerRight } from "./styled";
import ImageLazy from "customs/ImageLazy";
import { XMarkIcon } from "@heroicons/react/24/outline";

import { Link } from "react-router-dom";
import { useState } from "react";
import Manufacture from "components/Manufacture";
import Banner from "components/Banners";
import HotProducts from "components/HotProducts";
import ProductNews from "components/ProductNews";

function Home() {
  const [isShow, setIsShow] = useState(true);

  // useEffect(() => {
  //   const hasPopup = sessionStorage.getItem("hasVisited");
  //   if (hasPopup === "true" || !hasPopup) {
  //     setIsShow(true);
  //   }
  // }, []);
  const handleClose = () => {
    // sessionStorage.setItem("hasVisited", "false");
    setIsShow(false);
  };
  return (
    <>
      <div className="w-full mx-auto">
        <Manufacture />
        <Banner />
        <HotProducts />
        <ProductNews />
        <BannerLeft className="fixed">
          <img src={assets.bannerLeft} alt="" />
        </BannerLeft>
        <BannerRight className="fixed">
          <img src={assets.bannerRight} alt="" />
        </BannerRight>
        {isShow && (
          <div className="fixed top-0 right-0 left-0 z-50 flex items-center justify-center w-full h-full bg-[rgba(0,0,0,0.5)]">
            <div className="w-96 relative flex flex-col">
              <Link to="/product?manufacture=all">
                <ImageLazy isObjectFitCover="cover" src="https://cf.shopee.vn/file/vn-11134258-7ras8-m2fbdgz10zhube" alt="popup" />
              </Link>
              <XMarkIcon onClick={handleClose} className="w-10 h-10 text-white -top-8 -right-8 absolute cursor-pointer" width={40} height={40} />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Home;

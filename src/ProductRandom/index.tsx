import React, { useState, useEffect } from "react";
import { randomProduct } from "redux/product/api";
import { ProductsType } from "types";
import SliderListProduct from "customs/SliderListProduct";
import { texts } from "libs/contains/texts";

const ProductRandom: React.FC = () => {
  const [productRandom, setProductRandom] = useState<ProductsType[]>([]);

  useEffect(() => {
    async function fetcRandom() {
      const res = await randomProduct();
      setProductRandom(res.data);
    }
    fetcRandom();
  }, []);

  return <SliderListProduct title={texts.product.PRODUCT_OTHER} data={productRandom} />;
};

export default ProductRandom;

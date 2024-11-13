import React, { useState, useEffect } from "react";
import { randomProduct } from "redux/product";
import { ProductsType } from "types";
import { texts } from "contains/texts";
import ListProductHome from "components/ListProductHome";

const ProductRandom: React.FC = () => {
  const [productRandom, setProductRandom] = useState<ProductsType[]>([]);

  useEffect(() => {
    async function fetcRandom() {
      const res = await randomProduct();
      setProductRandom(res.data);
    }
    fetcRandom();
  }, []);

  return <ListProductHome title={texts.product.PRODUCT_OTHER} data={productRandom} />;
};

export default ProductRandom;

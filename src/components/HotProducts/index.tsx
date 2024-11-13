import React, { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "hooks/useAppDispatch";

import { texts } from "contains/texts";
import ListProductHome from "components/ListProductHome";
import { getHotProducts } from "redux/product/productThunk";

const HotProducts: React.FC = () => {
  const dispatch = useAppDispatch();
  const { productHots, loadingProductHot } = useAppSelector((state) => state.product);
  useEffect(() => {
    dispatch(getHotProducts());
  }, [dispatch]);

  return <ListProductHome title={texts.product.BEST_SELLER} data={productHots} loading={loadingProductHot} />;
};

export default HotProducts;

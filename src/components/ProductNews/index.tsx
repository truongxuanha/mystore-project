import React, { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "hooks/useAppDispatch";

import ListProductHome from "components/ListProductHome";
import { texts } from "contains/texts";
import { getProductNews } from "redux/product/productThunk";

const ProductNews: React.FC = () => {
  const dispatch = useAppDispatch();
  const { productNews, loadingProductNew } = useAppSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProductNews());
  }, [dispatch]);

  return <ListProductHome data={productNews} title={texts.product.PRODUCT_NEW} loading={loadingProductNew} />;
};

export default ProductNews;

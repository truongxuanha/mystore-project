import { ProductsType } from "./../../../types/product.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getBanners,
  getHotProducts,
  getInFoProducts,
  getProductNews,
  getProducts,
} from "./productThunk";
import { BannerType } from "../../../api/banner/type";

export interface ProductStateType {
  products: ProductsType[];
  productNews: ProductsType[];
  productHots: ProductsType[];
  isLoading: boolean;
  totalPage: number;
  banners: BannerType[];
  infoProduct: ProductsType | null;
}

const setIsLoading = (state: ProductStateType, isLoading: boolean) => {
  state.isLoading = isLoading;
};

const initialState: ProductStateType = {
  isLoading: false,
  products: [],
  productNews: [],
  productHots: [],
  totalPage: 1,
  banners: [],
  infoProduct: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getProducts.fulfilled,
        (
          state,
          action: PayloadAction<{ data: ProductsType[]; totalPage: number }>
        ) => {
          setIsLoading(state, false);
          state.products = action.payload.data ?? [];
          state.totalPage = action.payload.totalPage;
        }
      )
      .addCase(getProducts.rejected, (state) => {
        setIsLoading(state, false);
        state.products = [];
        state.totalPage = 1;
      });

    builder
      .addCase(getInFoProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getInFoProducts.fulfilled, (state, action) => {
        setIsLoading(state, false);
        state.infoProduct = action.payload ?? null;
      })
      .addCase(getInFoProducts.rejected, (state) => {
        setIsLoading(state, false);
        state.infoProduct = null;
      });

    builder
      .addCase(getProductNews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductNews.fulfilled, (state, action) => {
        setIsLoading(state, false);
        state.productNews = action.payload ?? [];
      })
      .addCase(getProductNews.rejected, (state) => {
        setIsLoading(state, false);
        state.productNews = [];
      });
    builder
      .addCase(getHotProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getHotProducts.fulfilled, (state, action) => {
        setIsLoading(state, false);
        state.productHots = action.payload ?? [];
      })
      .addCase(getHotProducts.rejected, (state) => {
        setIsLoading(state, false);
        state.productHots = [];
      });
    builder
      .addCase(getBanners.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBanners.fulfilled, (state, action) => {
        setIsLoading(state, false);
        state.banners = action.payload ?? [];
      })
      .addCase(getBanners.rejected, (state) => {
        setIsLoading(state, false);
      });
  },
});

export default productSlice.reducer;
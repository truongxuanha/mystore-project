import { ProductsType } from "./../../../types/product.type";
import { createSlice } from "@reduxjs/toolkit";
import {
  createProductThunk,
  deleteProductThunk,
  editProductThunk,
  getBanners,
  getCommentByIdProductThunk,
  getHotProducts,
  getInFoProducts,
  getProductNews,
  getProductRandom,
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
  infoProduct?: ProductsType;
  productRandom: ProductsType[];
  totalProduct: number;
  dataCommentById: any;
  commentById: any;
  dataAccountCmts: any;
  loadingProductNew: boolean;
  loadingBanner: boolean;
}

const setIsLoading = (state: ProductStateType, isLoading: boolean) => {
  state.isLoading = isLoading;
};

const initialState: ProductStateType = {
  isLoading: false,
  loadingBanner: false,
  loadingProductNew: false,
  products: [],
  productNews: [],
  productHots: [],
  totalPage: 1,
  totalProduct: 0,
  banners: [],
  infoProduct: undefined,
  productRandom: [],
  dataCommentById: [],
  dataAccountCmts: [],
  commentById: {},
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
      .addCase(getProducts.fulfilled, (state, action) => {
        setIsLoading(state, false);
        state.products = action.payload.data;
        state.totalPage = action.payload.totalPage;
        state.totalProduct = action.payload.totalItem;
      })
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
        state.infoProduct = action.payload;
      })
      .addCase(getInFoProducts.rejected, (state) => {
        setIsLoading(state, false);
      });

    builder
      .addCase(getProductNews.pending, (state) => {
        state.loadingProductNew = true;
      })
      .addCase(getProductNews.fulfilled, (state, action) => {
        state.loadingProductNew = false;
        state.productNews = action.payload;
      })
      .addCase(getProductNews.rejected, (state) => {
        state.loadingProductNew = false;
        state.productNews = [];
      });
    builder
      .addCase(getHotProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getHotProducts.fulfilled, (state, action) => {
        setIsLoading(state, false);
        state.productHots = action.payload;
      })
      .addCase(getHotProducts.rejected, (state) => {
        setIsLoading(state, false);
        state.productHots = [];
      });
    builder
      .addCase(getBanners.pending, (state) => {
        state.loadingBanner = true;
      })
      .addCase(getBanners.fulfilled, (state, action) => {
        state.loadingBanner = false;
        state.banners = action.payload ?? [];
      })
      .addCase(getBanners.rejected, (state) => {
        state.loadingBanner = false;
      });
    builder
      .addCase(getProductRandom.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductRandom.fulfilled, (state, action) => {
        setIsLoading(state, false);
        state.productRandom = action.payload ?? [];
      })
      .addCase(getProductRandom.rejected, (state) => {
        setIsLoading(state, false);
      });
    builder
      .addCase(createProductThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProductThunk.fulfilled, (state) => {
        setIsLoading(state, false);
      })
      .addCase(createProductThunk.rejected, (state) => {
        setIsLoading(state, false);
      });
    builder
      .addCase(deleteProductThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProductThunk.fulfilled, (state) => {
        setIsLoading(state, false);
      })
      .addCase(deleteProductThunk.rejected, (state) => {
        setIsLoading(state, false);
      });
    builder
      .addCase(editProductThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editProductThunk.fulfilled, (state) => {
        setIsLoading(state, false);
      })
      .addCase(editProductThunk.rejected, (state) => {
        setIsLoading(state, false);
      });
    builder
      .addCase(getCommentByIdProductThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCommentByIdProductThunk.fulfilled, (state, action) => {
        setIsLoading(state, false);
        state.dataCommentById = action.payload.data;
        state.dataAccountCmts = action.payload.dataAccount;
        state.commentById = action.payload;
      })
      .addCase(getCommentByIdProductThunk.rejected, (state) => {
        setIsLoading(state, false);
      });
  },
});

export default productSlice.reducer;

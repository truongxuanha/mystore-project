import { ProductsType } from "../../types";

export interface ResProductType {
  data: {
    totalItem: number;
    status: boolean;
    data: ProductsType[];
    totalPage: number;
  };
}

export interface ProductParaType {
  currentPage?: number;
  itemsPerPage?: number;
  totalItem?: number;
  sort?: string;
  manufacturer?: string | number;
}
export interface ProductManuType {
  min?: number;
  max?: number;
  manufacturer?: string;
  currentPage?: number;
  itemsPerPage?: number;
  sort?: number;
}

export type CreateProductType = {
  price: number;
  product_name: string;
  id_manu: number;
  discount: number;
  quantity: number;
  createAt?: string;
  thumbnail: string;
  description: string;
  other_discount: number;
};
export type EditProductType = {
  product_id: number;
} & CreateProductType;

export type CommentProductType = {
  item?: number;
  page?: number;
  sort?: string;
  star?: string | number;
  createAt?: string;
  product_id?: number;
};

import { CurrentAccount } from "types";

export type InitialLoginState = {
  value: string;
  password: string;
};
export type InitialRegisterState = {
  account_name: string;
  full_name?: string;
  phone: string;
  email: string;
  password: string;
  birthday?: any;
  sex?: number;
  permission?: number;
};
export type AddressType = {
  createAt: string;
  detail_address: string;
  district: string;
  full_name: string;
  phone: string;
  province: string;
  wards: string;
};
export type District = {
  code: number | string;
  name: string;
};

export type AddressStateType = {
  createAt: string;
  detail_address: string;
  district: District;
  full_name: string;
  phone: string;
  province: District;
  wards: District;
};

export type CustomerParamsType = {
  query?: string;
  sex?: string;
  page?: number;
  item?: number;
  permission?: string | number;
};

export type ResResfreshType = {
  status: boolean;
  data: {
    data: RefreshTokenType;
  };
};

export type RefreshTokenType = CurrentAccount["refresh"];
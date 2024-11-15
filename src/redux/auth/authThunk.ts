import { createAsyncThunk } from "@reduxjs/toolkit";
import { createAddressUser, getAddressUser, getAllAccount, getAllCustomer, getInfo, loginUser, registerUser } from "./api";
import { AddressType, CustomerParamsType, InitialLoginState, InitialRegisterState } from "./type";

export const authRegister = createAsyncThunk("auth/authRegister", async (initAccount: InitialRegisterState, { rejectWithValue }) => {
  try {
    const data = await registerUser(initAccount);
    return data;
  } catch (error) {
    let errorMessage = "";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return rejectWithValue(errorMessage);
  }
});

export const authUpdate = createAsyncThunk("auth/authUpdate", async (initAccount: InitialRegisterState, { rejectWithValue }) => {
  try {
    const data = await registerUser(initAccount);
    return data;
  } catch (error) {
    let errorMessage = "";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return rejectWithValue(errorMessage);
  }
});
export const authDelete = createAsyncThunk("auth/authDelete", async (initAccount: InitialRegisterState, { rejectWithValue }) => {
  try {
    const data = await registerUser(initAccount);
    if (data.status) {
      return data;
    }
  } catch (error) {
    let errorMessage = "";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return rejectWithValue(errorMessage);
  }
});
export const authLogin = createAsyncThunk("auth/authLogin", async (initAccount: InitialLoginState, { rejectWithValue }) => {
  try {
    const data = await loginUser(initAccount);

    localStorage.setItem("access_token", data.data.token);
    localStorage.setItem("currentUser", JSON.stringify(data.data));
    return data;
  } catch (error) {
    let errorMessage = "";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return rejectWithValue(errorMessage);
  }
});

export const authProfle = createAsyncThunk("auth/profile", async (_, { rejectWithValue }) => {
  try {
    const data = await getInfo();

    return data;
  } catch (error) {
    let errorMessage = "";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return rejectWithValue(errorMessage);
  }
});

export const authGetAllAccount = createAsyncThunk("auth/getAllAccount", async ({ ...params }: CustomerParamsType, { rejectWithValue }) => {
  try {
    const data = await getAllAccount({ ...params });

    return data;
  } catch (errer) {
    rejectWithValue(errer);
  }
});
export const authCustomer = createAsyncThunk("auth/customer", async ({ ...params }: CustomerParamsType, { rejectWithValue }) => {
  try {
    const data = await getAllCustomer({ ...params });

    return data;
  } catch (errer) {
    rejectWithValue(errer);
  }
});
export const authGetAddressAcc = createAsyncThunk("auth/getAddressAcc", async (_, { rejectWithValue }) => {
  try {
    const data = await getAddressUser();

    return data;
  } catch (errer) {
    rejectWithValue(errer);
  }
});

export const authCreateAddressThunk = createAsyncThunk("auth/createAddress", async (address: AddressType, { rejectWithValue }) => {
  try {
    const data = await createAddressUser(address);

    return data;
  } catch (errer) {
    rejectWithValue(errer);
  }
});

// export const authGetInfoUser = createAsyncThunk("auth/inforUser", async (_, { rejectWithValue }) => {
//   try {
//     const data = await getInfoUser();

//     return data;
//   } catch (error) {
//     let errorMessage = "";
//     if (error instanceof Error) {
//       errorMessage = error.message;
//     }
//     return rejectWithValue(errorMessage);
//   }
// });

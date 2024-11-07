import { Input } from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch } from "../../../../../../hooks/useAppDispatch";
import { SubmitHandler, useForm } from "react-hook-form";
import { authUpdate, authDelete } from "../../../../../../redux/reducer/userReducer/authThunk";
import { toastifySuccess, toastifyWarning } from "../../../../../../utils/toastify";
import { schemaProduct } from "../../../../../../utils/schema";
import Button from "../../../../../../customs/Button";
import { CreateProductType } from "../../../../../../api/product/type";
import { createProductThunk, deleteProductThunk } from "../../../../../../redux/reducer/productReducer/productThunk";
import dayjs from "dayjs";

type Props = {
  setShow: (value: boolean) => void;
  initialData?: any;
  actionType: "add" | "edit" | "delete" | "view" | null;
};

function FormAddProductAdmin({ setShow, initialData, actionType }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateProductType>({
    resolver: yupResolver(schemaProduct) as any,
    defaultValues: initialData || {
      name: "",
      id_manu: "",
      price: 0,
      quantity: null,
      thumbnail: null,
      discount: 0,
      description: "",
      other_discount: 0,
      createAt: `${dayjs().format("YYYY-MM-DD")}`,
    },
    context: { actionType },
  });

  const dispatch = useAppDispatch();
  const onSubmit: SubmitHandler<CreateProductType> = async (formValue) => {
    let resultsAction;
    formValue.thumbnail = formValue.thumbnail[0];
    formValue.createAt = formValue.createAt;
    if (actionType === "add") {
      const thumbnailFile = formValue.thumbnail?.[0];
      if (thumbnailFile) {
        console.log("Thumbnail file:", thumbnailFile);
      }
      resultsAction = await dispatch(createProductThunk(formValue));

      if (createProductThunk.rejected.match(resultsAction)) {
        toastifyWarning((resultsAction.payload as string) || "Thêm tài khoản thất bại!");
        return;
      }
      toastifySuccess("Thêm tài khoản thành công!");
    } else if (actionType === "edit") {
      const updatedData = {
        ...initialData,
        ...formValue,
      };
      resultsAction = await dispatch(createProductThunk(updatedData));
      if (authUpdate.rejected.match(resultsAction)) {
        toastifyWarning((resultsAction.payload as string) || "Sửa tài khoản thất bại!");
        return;
      }
      toastifySuccess("Sửa tài khoản thành công!");
    } else if (actionType === "delete" || actionType === "view") {
      console.log("hello");

      resultsAction = await dispatch(deleteProductThunk(initialData.id));
      if (authDelete.rejected.match(resultsAction)) {
        toastifyWarning((resultsAction.payload as string) || "Xóa tài khoản thất bại!");
        return;
      }
      toastifySuccess("Xóa tài khoản thành công!");
    }

    reset();
    setShow(false);
  };
  const isDisable = actionType === "delete" || actionType === "view";
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 w-screen h-screen bg-[rgba(0,0,0,0.5)] flex justify-center items-center z-50">
      <div className="bg-white w-4/5 p-5 rounded-md flex flex-col">
        <div className="border-b pb-3">
          <h1 className="text-center uppercase">
            {actionType === "add" ? "Thêm sán phẩm mới mới" : actionType === "edit" ? "Sửa thông tin sản phẩm" : "Xóa sản phẩm"}
          </h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4 mt-8 overflow-hidden">
          <div>
            <div className="flex flex-col gap-2">
              <label htmlFor="account_name">Ảnh</label>
              <Input className="border px-1 py-1 rounded-sm" id="thumbnail" type="file" {...register("thumbnail")} disabled={isDisable} />
              {errors.thumbnail && <span className="text-red-500">{errors.thumbnail.message}</span>}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="account_name">Nhà cung cấp</label>
              <Input className="border px-1 py-1 rounded-sm" id="account_name" {...register("id_manu")} disabled={isDisable} />
              {errors.id_manu && <span className="text-red-500">{errors.id_manu.message}</span>}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="phone">Tên sản phẩm</label>
              <Input className="border px-1 py-1 rounded-sm" id="name" {...register("name")} disabled={isDisable} />
              {errors.name && <span className="text-red-500">{errors.name.message}</span>}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="birthday">Đơn giá</label>
              <Input className="border px-1 py-1 rounded-sm" type="number" id="price" {...register("price")} disabled={isDisable} />
              {errors.price && <span className="text-red-500">{errors.price.message?.toString()}</span>}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="full_name">Chiết khấu</label>
              <Input className="border px-1 py-1 rounded-sm" type="number" id="discount" {...register("discount")} disabled={isDisable} />
              {errors.discount && <span className="text-red-500">{errors.discount.message}</span>}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email">Chiết khấu khác</label>
              <Input className="border px-1 py-1 rounded-sm" id="other_discount" {...register("other_discount")} disabled={isDisable} />
              {errors.other_discount && <span className="text-red-500">{errors.other_discount.message}</span>}
            </div>
          </div>
          <div className="grid grid-rows-5">
            <div className="flex flex-col gap-2 row-span-1">
              <label htmlFor="email">Số lượng nhập</label>
              <Input className="border px-1 py-1 rounded-sm" id="quantity" {...register("quantity")} disabled={isDisable} />
              {errors.quantity && <span className="text-red-500">{errors.quantity.message}</span>}
            </div>
            <div className="flex flex-col gap-2 row-span-4">
              <label htmlFor="email">Mô tả sản phẩm</label>
              <textarea className="border px-1 py-1 h-full rounded-sm" id="quantity" {...register("description")} disabled={isDisable} />
              {errors.description && <span className="text-red-500">{errors.description.message}</span>}
            </div>
          </div>
          <div className="col-span-2 border-t flex justify-end gap-2 p-5">
            {actionType === "view" ? null : (
              <Button width="150px" height="30px" type="submit" styles=" bg-colorPrimary text-white rounded ">
                {actionType === "add" ? "Thêm mới" : actionType === "edit" ? "Sửa" : "Xóa"}
              </Button>
            )}
            <Button width="150px" height="30px" onClick={() => setShow(false)} type="button" styles=" bg-blue-500 text-white rounded">
              Thoát
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormAddProductAdmin;

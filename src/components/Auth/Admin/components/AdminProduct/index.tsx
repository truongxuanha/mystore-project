import { MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/outline";
import HeaderAdmin from "../components/HeaderAdmin";
import Input from "../../../../../customs/Input";
import { texts } from "../../../../../contains/texts";
import FormAddProductAdmin from "../components/FormAddProductAdmin";
import { useAppDispatch, useAppSelector } from "../../../../../hooks/useAppDispatch";
import { useEffect, useState } from "react";
import Table from "../../../../../customs/Table";
import ButtonAction from "../../../../../customs/ButtonAction";
import Pagination from "../../../../../customs/Pagination";
import useGetSearchParams from "../../../../../hooks/useGetSearchParams";
import { getProducts } from "../../../../../redux/product/productThunk";
import { ActionAdminEnum } from "../../../../../types/admin.type";

const option = [
  { option_id: 1, title: texts.list_staff.ALL_STAFF, value: "all" },
  { option_id: 2, title: texts.list_staff.MANAGER, value: "0" },
  { option_id: 3, title: texts.list_staff.STAFF, value: "2" },
];

function AdminProduct() {
  const dispatch = useAppDispatch();
  const { products, totalPage } = useAppSelector((state) => state.product);
  const [show, setShow] = useState<boolean>(false);
  const [actionType, setActionType] = useState<ActionAdminEnum>();
  const [currentProduct, setCurrentProduct] = useState<any>();
  const page = useGetSearchParams(["page"]).page || 1;
  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
  };

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    dispatch(getProducts({ query: searchQuery, itemsPerPage: 5 }));
  };
  useEffect(() => {
    dispatch(getProducts({ currentPage: page, itemsPerPage: 5 }));
  }, [dispatch, page]);
  const columns = [
    texts.product.PRODUCT_ID,
    texts.product.PRODUCT_NAME,
    texts.product.MANUFACTURE,
    texts.product.PRICE,
    texts.product.DISCOUNT,
    texts.product.ORTHER_DISCOUNT,
    texts.product.QUANTITY,
    texts.product.REMAINING_QUANTITY,
    texts.infor_account.ACTION,
  ];
  const rowProduct = products?.map((product) => [
    product.product_id,
    product.product_name,
    product.slug,
    product.price,
    product.discount,
    product.other_discount,
    product.quantity,
    product.remaining_quantity,
  ]);
  const handleEdit = (id: number | string) => {
    setShow(true);
    setActionType(ActionAdminEnum.EDIT);
    const acc = products.filter((acc) => acc.product_id === id);
    setCurrentProduct(acc[0]);
  };
  const handleAdd = () => {
    setShow(true);
    setActionType(ActionAdminEnum.ADD);
    setCurrentProduct([]);
  };
  const handleDelete = (id: number | string) => {
    setShow(true);
    setActionType(ActionAdminEnum.DELETE);
    const acc = products.filter((acc) => acc.product_id === id);
    setCurrentProduct(acc[0]);
  };

  const handleView = (id: number | string) => {
    setShow(true);
    setActionType(ActionAdminEnum.VIEW);
    const acc = products.filter((acc) => acc.product_id === id);
    setCurrentProduct(acc[0]);
  };
  return (
    <div className="col-span-5 px-3">
      <HeaderAdmin />
      <div>
        <div className="flex justify-between mt-2 bg-colorBody p-4">
          <div className="flex bg-white items-center h-8 border">
            <Input type="search" placeholder="Tìm kiếm..." className="h-full px-2" onChange={handleChange} />
            <span onClick={handleSearch} className="bg-colorPrimary h-full flex items-center px-3 cursor-pointer">
              <MagnifyingGlassIcon className="w-4 h-4 " />
            </span>
          </div>
          <div className="flex gap-2 items-center">
            <select className="h-8 px-4">
              {option.map((opt) => (
                <option key={opt.option_id} value={opt.value}>
                  {opt.title}
                </option>
              ))}
            </select>
            <button onClick={() => handleAdd()} className="bg-colorPrimary px-5 h-8">
              <PlusIcon className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
        <div className="mb-5">
          <Table
            columns={columns}
            rows={rowProduct}
            operations={(id: number | string) => <ButtonAction id={id} onEdit={handleEdit} onDelete={handleDelete} onView={handleView} />}
          />
          <Pagination totalPage={totalPage} currentPage={1} />
          {show && <FormAddProductAdmin actionType={actionType} setShow={setShow} initialData={currentProduct} />}
        </div>
      </div>
    </div>
  );
}

export default AdminProduct;

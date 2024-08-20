import { useEffect, useState } from "react";

import Loader from "../Loader";
import Product from "./Product";
import { ProductsType } from "../../types";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/24/outline";

import { Button } from "@headlessui/react";
import { getProduct } from "../../api/product";

function Products() {
  const [products, setProducts] = useState<ProductsType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const itemsPerPage = 8;

  useEffect(() => {
    async function fetchProduct(): Promise<void> {
      setIsLoading(true);
      try {
        const res = await getProduct(currentPage, itemsPerPage);
        if (!res) return;
        console.log(res);
        setProducts(res.data.data ?? []);
        setTotalPages(res.data.totalPage);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProduct();
  }, [currentPage, itemsPerPage]);
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <h1 className='text-2xl mb-10'>Danh sách sản phẩm:</h1>
          <div className='grid grid-cols-2 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  w-full'>
            {products.map((product) => (
              <Product
                key={product.id}
                product={product}
                typeCss='grid grid-rows-3gap-2 h-full w-full p-2 md:px-5 pt-2 border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out text-xs sm:text-base hover:transform hover:scale-105 duration-300'
              />
            ))}
          </div>

          <div className='flex justify-center mt-8'>
            <button
              className={`px-3 py-1 mx-1 border rounded ${
                currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronDoubleLeftIcon className='w-3 h-3' />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (_, index) => (
                <button
                  key={index}
                  className={`px-3 py-1 mx-1 border rounded ${
                    currentPage === index + 1
                      ? "bg-colorPrimary text-white"
                      : "bg-white text-black"
                  }`}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              )
            )}

            <Button
              className={`px-3 py-1 mx-1 border rounded ${
                currentPage === totalPages
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <ChevronDoubleRightIcon className='w-3 h-3' />
            </Button>
          </div>
        </>
      )}
    </>
  );
}

export default Products;
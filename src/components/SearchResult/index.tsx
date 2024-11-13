import React from "react";
import { ProductsType } from "types";
import { getInFoProduct } from "redux/product";
import { Link } from "react-router-dom";

type SearchResultsProps = {
  products: ProductsType[];
  setSearchQuery: (query: string) => void;
  handleCloseNav?: (open: boolean) => void;
};

const SearchResults: React.FC<SearchResultsProps> = ({ products, setSearchQuery, handleCloseNav }) => {
  const handleInfo = (id: number) => {
    getInFoProduct(id);
    setSearchQuery("");
    if (handleCloseNav) {
      handleCloseNav(false);
    }
  };

  return (
    <ul className="max-h-80 overflow-y-auto scroll transition-all">
      {products.map((product) => (
        <li key={product.id} className="p-2 hover:bg-orange-100 cursor-pointer border-b last:border-none" onClick={() => handleInfo(product.id)}>
          <Link to={`/product/product-detail/${product.id}`} className="text-sm cursor-pointer">
            <span className="flex items-center">
              <img className="w-10 rounded-full" src={product.thumbnail} alt={product.product_name} />
              <p className="ml-2">
                {product.product_name} - {product.price.toLocaleString()} VND
              </p>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default SearchResults;

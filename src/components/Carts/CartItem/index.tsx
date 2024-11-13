import { Button } from "@headlessui/react";
import { MinusIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import formatVND from "utils/formatVND";
import { texts } from "contains/texts";
type Props = {
  priceAfterDiscount: number;
  idItemCart: number;
  thumbnail: string;
  slug?: string;
  product_name: string;
  quantity: number;
  productId: number;
  updateQuantity: (id: number, quantity: number) => void;
  deleteItemCart: (id: number) => void;
};
function CartItem(props: Props) {
  const { idItemCart, product_name, priceAfterDiscount, quantity, thumbnail, slug, updateQuantity, deleteItemCart, productId } = props;
  return (
    <div className="relative grid grid-cols-1 sm:grid-cols-8 bg-white shadow-sm mt-3 p-5 rounded-md gap-x-3">
      <div className="col-span-2">
        <img src={thumbnail} className="border rounded-md" />
      </div>
      <div className="col-span-4">
        <Link to={`/product/${slug}?product_id=${productId}`} className="text-xs sm:text-sm hover:underline">
          {product_name}
        </Link>
      </div>
      <div className="col-span-1 mx-auto flex items-center">
        <Button
          type="button"
          className="h-4 w-4 md:h-5 md:w-5 rounded-md border bg-gray-100 hover:bg-gray-200"
          onClick={() => updateQuantity(idItemCart, quantity > 0 ? quantity - 1 : quantity)}
        >
          <MinusIcon className="w-3 h-3 md:w-5 md:h-3" />
        </Button>
        <input type="text" disabled value={quantity} className="w-10 text-center bg-transparent text-xs md:text-sm font-medium text-gray-900 outline-none" />
        <Button
          type="button"
          className="h-4 w-4 md:h-5 md:w-5 rounded-md border bg-gray-100 hover:bg-gray-200"
          onClick={() => updateQuantity(idItemCart, quantity + 1)}
        >
          <PlusIcon className="w-3 h-3 md:w-5 md:h-3" />
        </Button>
      </div>
      <div className="col-span-1 mx-auto flex flex-col ">
        <span className="text-[11px] sm:text-xs md:text-sm w-[115px] md:w-[150px] sm:absolute sm:top-2 sm:right-1">
          Giá: {formatVND(priceAfterDiscount, 0)}
        </span>
        <span className="block w-9 cursor-pointer" onClick={() => deleteItemCart(idItemCart)}>
          <XMarkIcon className="w-6 text-colorPrimary absolute top-2 right-2 text-center" />
        </span>
        <span className="text-[11px] sm:text-xs md:text-sm w-[115px] md:w-[150px] sm:absolute sm:bottom-2 sm:right-1">
          {texts.common.DISCOUNT}: {formatVND(priceAfterDiscount * quantity, 0)}
        </span>
      </div>
    </div>
  );
}

export default CartItem;

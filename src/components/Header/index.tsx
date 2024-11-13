import { memo, useEffect, useRef, useState } from "react";
import { Button } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  UserCircleIcon,
  ArrowRightStartOnRectangleIcon,
  ShoppingCartIcon,
  UserIcon,
  ArrowsRightLeftIcon,
  ShieldExclamationIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";
import { Link, NavLink, useNavigate } from "react-router-dom";

import { logout } from "redux/auth/authSlice";
import logo from "assets/logo.png";
import { useAppDispatch, useAppSelector } from "hooks/useAppDispatch";
import { toastifyWarning } from "utils/toastify";

import Search from "../Search";
import { getProductByAccount } from "redux/cart/cartThunk";
import { clearCart } from "redux/cart/cartSlice";
import { navLink } from "routes/app";
import { texts } from "contains/texts";

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openAccount, setOpenAccount] = useState(false);
  const accountMenuRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { currentUser } = useAppSelector((state) => state.auth);
  const { cartLength } = useAppSelector((state) => state.cart);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
    setMobileMenuOpen(false);
    navigate("/login");
  };
  useEffect(() => {
    if (currentUser) {
      dispatch(getProductByAccount());
    }
  }, [dispatch, currentUser]);
  const handleCart = () => {
    setMobileMenuOpen(false);
    if (!currentUser) {
      toastifyWarning("Vui lòng đăng nhập!!!");
    }
  };
  useEffect(() => {
    if (window.location.pathname !== "/order") {
      sessionStorage.removeItem("orderItems");
    }
  }, []);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (accountMenuRef.current && !accountMenuRef.current.contains(event.target as Node)) {
        setOpenAccount(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white fixed z-50 w-full h-header">
      <nav className="mx-auto flex max-w-full items-center justify-between h-full px-2 md:px-0 lg:px-8">
        <Link to="/">
          <img className="w-28" src={logo} alt="Logo" />
        </Link>

        <div className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <Button className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
            <Bars3Icon aria-hidden="true" className="h-7 w-7" />
          </Button>
        </div>

        <div className="hidden md:flex md:gap-x-4 lg:gap-x-12 items-center">
          {navLink.map((nav) => (
            <NavLink key={nav.title} to={nav.path} className="nav-link text-sm font-medium leading-6 text-gray-900 uppercase">
              {nav.title}
            </NavLink>
          ))}

          <div className="flex items-center gap-4 text-sm font-medium leading-6 text-gray-900">
            <Search handleCloseNav={() => setMobileMenuOpen(false)} />
            <Link to="/cart" className="relative">
              <ShoppingCartIcon onClick={handleCart} aria-hidden="true" className="h-6 w-6 cursor-pointer" />
              <span className="absolute -top-[6px] -right-[6px] bg-orange-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                {cartLength > 0 ? cartLength : 0}
              </span>
            </Link>
          </div>

          <div className="relative" ref={accountMenuRef}>
            <div className="rounded-full bg-orange-100/80 p-2 hover:bg-orange-300 transition-all duration-500">
              <UserCircleIcon onClick={() => setOpenAccount(!openAccount)} aria-hidden="true" className="h-6 w-6 cursor-pointer" />
            </div>
            {openAccount && (
              <div className="absolute w-40 right-0 left-[-120px] bg-white rounded-md shadow-md top-[57px] cursor-pointer transition-all duration-700">
                {currentUser ? (
                  <div className="flex flex-col">
                    <Link to="/profile" className="flex p-3 items-center gap-x-2 hover:bg-[#f5f5f5]">
                      <UserIcon className="w-5 h-5" />
                      <p>{texts.header.ACCOUNT}</p>
                    </Link>
                    <Link to="/admin" className="flex p-3 items-center gap-x-2 hover:bg-[#f5f5f5]">
                      <GlobeAltIcon className="w-5 h-6" />
                      <p>Quản trị</p>
                    </Link>
                    <span onClick={handleLogout} className="flex justify-start gap-x-2 p-3 hover:bg-[#f5f5f5]">
                      <ArrowRightStartOnRectangleIcon className="h-5 w-5" />
                      <p>{texts.header.LOGOUT}</p>
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-col">
                    <NavLink to="/login" className="p-3 gap-2 flex hover:bg-[#f5f5f5]" onClick={() => setMobileMenuOpen(false)}>
                      <ArrowsRightLeftIcon className="w-5 h-6" />
                      {texts.header.LOGIN}
                    </NavLink>
                    <NavLink to="/register" className="p-3 gap-2 flex hover:bg-[#f5f5f5]" onClick={() => setMobileMenuOpen(false)}>
                      <ShieldExclamationIcon className="w-5 h-6" />
                      {texts.header.LOGOUT}
                    </NavLink>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-20 bg-black bg-opacity-25 md:hidden">
          <div className="absolute inset-y-0 right-0 w-full bg-white px-8 py-6 max-w-sm">
            <button onClick={() => setMobileMenuOpen(false)} className="-m-2.5 p-2.5 text-gray-700 absolute top-4 right-4">
              <XMarkIcon className="h-6 w-6" />
            </button>

            <Link to="/" onClick={() => setMobileMenuOpen(false)}>
              <img className="w-28 mb-6" src={logo} alt="Logo" />
            </Link>

            <div className="space-y-2">
              {navLink.map((nav) => (
                <NavLink
                  key={nav.title}
                  to={nav.path}
                  className="block text-xs font-semibold text-gray-900 p-3 hover:bg-gray-100"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {nav.title}
                </NavLink>
              ))}
            </div>

            <div className="mt-6 flex items-center gap-4">
              <Search handleCloseNav={setMobileMenuOpen} />
              <Link to="/cart" onClick={handleCart}>
                <div className="relative">
                  <ShoppingCartIcon className="h-6 w-6 cursor-pointer" />
                  {cartLength > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                      {cartLength}
                    </span>
                  )}
                </div>
              </Link>
            </div>

            <div className="mt-6">
              {currentUser ? (
                <div className="flex flex-col gap-3">
                  <span className="flex items-center gap-2 cursor-pointer p-3 hover:bg-gray-100" onClick={() => setMobileMenuOpen(false)}>
                    <UserIcon className="w-5 h-5" />
                    <p>{texts.header.ACCOUNT}</p>
                  </span>
                  <span className="flex items-center gap-2 cursor-pointer p-3 hover:bg-gray-100" onClick={handleLogout}>
                    <ArrowRightStartOnRectangleIcon className="w-5 h-5" />
                    <p>{texts.header.LOGOUT}</p>
                  </span>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <NavLink to="/login" className="block text-xs font-semibold text-gray-900 p-3 hover:bg-gray-100" onClick={() => setMobileMenuOpen(false)}>
                    {texts.header.LOGIN}
                  </NavLink>
                  <NavLink to="/register" className="block text-xs font-semibold text-gray-900 p-3 hover:bg-gray-100" onClick={() => setMobileMenuOpen(false)}>
                    {texts.header.LOGOUT}
                  </NavLink>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default memo(Header);

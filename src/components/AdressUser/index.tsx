import { Button } from "@headlessui/react";
import { useAppDispatch } from "hooks/useAppDispatch";
import { useState, useEffect } from "react";
import { authCreateAddressThunk, authGetAddressAcc } from "redux/auth/authThunk";

import dayjs from "dayjs";
import { texts } from "contains/texts";
import { AddressStateType } from "redux/auth/type";

type AddressComponent = {
  code: number | string;
  name: string;
};

type Props = {
  handleClose: (isOpen: boolean) => void;
};

function AddressUser(props: Props) {
  const { handleClose } = props;

  const [address, setAddress] = useState<AddressStateType>({
    createAt: dayjs().format("YYYY-MM-DD"),
    detail_address: "",
    district: { code: "", name: "" },
    full_name: "",
    phone: "",
    province: { code: "", name: "" },
    wards: { code: "", name: "" },
  });

  const [errors, setErrors] = useState({
    full_name: "",
    phone: "",
    detail_address: "",
    province: "",
    district: "",
    wards: "",
  });

  const [cities, setCities] = useState<AddressComponent[]>([]);
  const [districts, setDistricts] = useState<AddressComponent[]>([]);
  const [wards, setWards] = useState<AddressComponent[]>([]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    fetch("https://provinces.open-api.vn/api/")
      .then((res) => res.json())
      .then((data) => setCities(data));
  }, []);

  useEffect(() => {
    if (address.province.code) {
      fetch(`https://provinces.open-api.vn/api/p/${address.province.code}?depth=2`)
        .then((res) => res.json())
        .then((data) => setDistricts(data.districts));
    }
  }, [address.province]);

  useEffect(() => {
    if (address.district.code) {
      fetch(`https://provinces.open-api.vn/api/d/${address.district.code}?depth=2`)
        .then((res) => res.json())
        .then((data) => setWards(data.wards));
    }
  }, [address.district]);

  async function handleSave() {
    const newErrors = {
      full_name: address.full_name ? "" : "Vui lòng nhập họ và tên.",
      phone: address.phone ? "" : "Vui lòng nhập số điện thoại.",
      detail_address: address.detail_address ? "" : "Vui lòng nhập địa chỉ.",
      province: address.province.name ? "" : "Vui lòng chọn tỉnh/thành phố.",
      district: address.district.name ? "" : "Vui lòng chọn quận/huyện.",
      wards: address.wards.name ? "" : "Vui lòng chọn xã/phường.",
    };
    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error !== "")) return;

    const addressToSave = {
      ...address,
      province: address.province.name,
      district: address.district.name,
      wards: address.wards.name,
    };
    try {
      await dispatch(authCreateAddressThunk(addressToSave));
    } catch (error) {
    } finally {
      handleClose(false);
    }
    setAddress({
      createAt: dayjs().format("YYYY-MM-DD"),
      detail_address: "",
      district: { code: "", name: "" },
      full_name: "",
      phone: "",
      province: { code: "", name: "" },
      wards: { code: "", name: "" },
    });
    dispatch(authGetAddressAcc());
  }

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-full bg-[rgba(0,0,0,0.5)] justify-center items-center z-50">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="bg-white w-[500px] relative shadow-md rounded-sm">
          <div className="border-b py-4 text-center">
            <h1 className="uppercase">{texts.order.ADD_ADRESS}</h1>
          </div>
          <form onSubmit={handleSave}>
            <div className="py-3 px-5 grid grid-cols-[100px_auto] gap-x-5 gap-y-1">
              <label htmlFor="name">{texts.account.FULL_NAME}:</label>
              <input
                className="border px-2 py-1 rounded-sm"
                type="text"
                placeholder="Họ và tên"
                value={address.full_name}
                onChange={(e) => setAddress({ ...address, full_name: e.target.value })}
              />
              {errors.full_name && <p className="text-red-500 col-start-2">{errors.full_name}</p>}
            </div>
            <div className="py-3 px-5 grid grid-cols-[100px_auto] gap-x-5 gap-y-1">
              <label htmlFor="phone">{texts.account.PHONE_NUMBER}:</label>
              <input
                className="border px-2 py-1 rounded-sm"
                type="text"
                placeholder="SĐT"
                value={address.phone}
                onChange={(e) => setAddress({ ...address, phone: e.target.value })}
              />
              {errors.phone && <p className="text-red-500 col-start-2">{errors.phone}</p>}
            </div>
            <div className="py-3 px-5 grid grid-cols-[100px_auto] gap-x-5 gap-y-1">
              <label htmlFor="address">{texts.account.ADDRESS}:</label>
              <textarea
                className="border px-2 py-1 rounded-sm outline-none"
                placeholder="Địa chỉ"
                value={address.detail_address}
                onChange={(e) => setAddress({ ...address, detail_address: e.target.value })}
              />
              {errors.detail_address && <p className="text-red-500 col-start-2">{errors.detail_address}</p>}
            </div>
            {/* Tỉnh/Thành phố */}
            <div className="py-3 px-5 grid grid-cols-[100px_auto] gap-x-5 gap-y-1">
              <label>Tỉnh/Thành phố:</label>
              <select
                className="border px-2 py-1 rounded-sm"
                value={address.province.code}
                onChange={(e) => {
                  const selectedProvince = cities.find((city) => city.code === Number(e.target.value)) || { code: "", name: "" };
                  setAddress({
                    ...address,
                    province: selectedProvince,
                    district: { code: "", name: "" },
                    wards: { code: "", name: "" },
                  });
                  setDistricts([]);
                  setWards([]);
                }}
              >
                <option value="">Chọn tỉnh/thành phố</option>
                {cities.map((city) => (
                  <option key={city.code} value={city.code}>
                    {city.name}
                  </option>
                ))}
              </select>
              {errors.province && <p className="text-red-500 col-start-2">{errors.province}</p>}
            </div>
            {/* Quận/Huyện */}
            <div className="py-3 px-5 grid grid-cols-[100px_auto] gap-x-5 gap-y-1">
              <label>Quận/Huyện:</label>
              <select
                className="border px-2 py-1 rounded-sm"
                value={address.district.code}
                onChange={(e) => {
                  const selectedDistrict = districts.find((district) => district.code === Number(e.target.value)) || { code: "", name: "" };
                  setAddress({
                    ...address,
                    district: selectedDistrict,
                    wards: { code: "", name: "" },
                  });
                }}
                disabled={!address.province.code}
              >
                <option value="">Chọn quận/huyện</option>
                {districts.map((district) => (
                  <option key={district.code} value={district.code}>
                    {district.name}
                  </option>
                ))}
              </select>
              {errors.district && <p className="text-red-500 col-start-2">{errors.district}</p>}
            </div>
            {/* Xã/Phường */}
            <div className="py-3 px-5 grid grid-cols-[100px_auto] gap-x-5 gap-y-1">
              <label>Xã/Phường:</label>
              <select
                className="border px-2 py-1 rounded-sm"
                value={address.wards.code}
                onChange={(e) => {
                  const selectedWard = wards.find((ward) => ward.code === Number(e.target.value)) || { code: "", name: "" };
                  setAddress({ ...address, wards: selectedWard });
                }}
                disabled={!address.district.code}
              >
                <option value="">Chọn xã/phường</option>
                {wards.map((ward) => (
                  <option key={ward.code} value={ward.code}>
                    {ward.name}
                  </option>
                ))}
              </select>
              {errors.wards && <p className="text-red-500 col-start-2">{errors.wards}</p>}
            </div>
          </form>
          <div className="flex gap-5 justify-end px-5 pb-4 mt-10">
            <Button onClick={handleSave} className="px-3 py-[2px] bg-colorPrimary rounded-md hover:opacity-80">
              {texts.common.SAVE}
            </Button>
            <Button onClick={() => handleClose(false)} className="px-3 py-[2px] bg-corlorButton rounded-md hover:opacity-80">
              {texts.common.EXIT}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddressUser;

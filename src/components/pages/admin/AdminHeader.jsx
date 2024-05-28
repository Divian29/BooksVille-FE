import { AdminProfilePopUp } from "../../../utils/AdminProfilePopUp.jsx";
import { useEffect, useState } from "react";
import {useData} from "../../../hooks/useData.js";

export const AdminHeader = ({ userData, setGeneralSearch, setQuery }) => {
  const [profileClick, setProfileCLick] = useState(false);

  const [search, setSearch] = useState("");

  const {profilePicture} = useData();

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    setQuery(search);

    setTimeout(() => {
      if (search.length < 1) {
        setGeneralSearch(false);
      } else if (search.length > 0) {
        setGeneralSearch(true);
      }
    }, 500);
  }, [search]);

  return (
    <>
      <div className="bg-white absolute top-[0rem] left-[calc(50%_-_459px)]  shadow-[0px_4px_8px_rgba(0,_0,_0,_0.04)] w-[73.69rem] flex  justify-between py-[1rem] pr-[4.38rem] pl-[2.94rem]  text-center text-[0.88rem] text-gray-3 font-tt-norms-pro">
        <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
          <div className="flex-1 rounded-lg bg-base-white shadow-[0px_2px_2px_-1px_rgba(74,_74,_104,_0.1)_inset] box-border h-[2.5rem] flex flex-row items-center justify-start py-[1rem] px-[0.75rem] gap-[0.63rem] border-[1px] border-solid border-gray-3">
            <img
              className="relative w-[1rem] h-[1rem] object-cover"
              alt=""
              src="/src/assets/images/adminImages/vuesaxlinearsearchnormal@2x.png"
            />
            <div className="flex flex-row items-start justify-start py-[0.25rem] px-[0.13rem]">
              <img
                className="relative w-[0rem] h-[1.31rem] object-contain"
                alt=""
                src="/src/assets/images/adminImages/line-13@2x.png"
              />
              <input
                type="search"
                name="search"
                value={search}
                onChange={handleChange}
                className="text-black text-left text-sm focus:outline-none tracking-normal self-stretch grow whitespace-nowrap w-[20rem]"
                placeholder="Search by Author or Title or Series"
              />
            </div>
          </div>
        </div>
        <div className="justify-start gap-[1.5rem] text-[0.69rem] text-base-white font-bold-11">
          <div className=" flex flex-row items-center justify-start gap-[1.5rem]">
            <div className="relative w-[1.56rem] h-[1.56rem]">
              <img
                className="absolute top-[0rem] left-[0rem] w-[1.56rem] h-[1.56rem] overflow-hidden object-cover"
                alt=""
                src="/src/assets/images/adminImages/iconoutlinebell@2x.png"
              />
            </div>
            <img
              className="relative rounded-[50%] w-[2.25rem] h-[2.25rem] object-cover cursor-pointer"
              alt="profile picture"
              srcSet={profilePicture}
              onClick={() => setProfileCLick(!profileClick)}
            />
          </div>
        </div>
      </div>

      {profileClick && (
        <div className="absolute right-[2rem] top-[3.5rem] shadow-2xl">
          <AdminProfilePopUp
            handleProfilePop={() => setProfileCLick(!profileClick)}
          />
        </div>
      )}
    </>
  );
};

import logo from "../../../assets/images/landingPageImages/image-1@2x.png";
import { Link, useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export const AdminSideBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove user from local storage
    localStorage.removeItem("token");
    localStorage.removeItem("firstname");
    localStorage.removeItem("lastname");
    localStorage.removeItem("email");

    // Redirect to the home page
    navigate("/");
  };

  return (
    <>
      <div className="bg-white shadow-[0px_6px_16px_rgba(0,0,0,0.1599999964237213)] fixed max-h-[100vh] max-w-[260px] ">
        <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
          <div className="flex-col fill-white overflow-hidden relative flex aspect-[0.25390625] grow items-stretch pl-4 pr-16 py-[3.5rem] max-md:pr-5">
            <div className="logo-container flex justify-between gap-0.5 px-5">
              <img
                loading="lazy"
                src={logo}
                className="aspect-square object-contain object-center w-[41px] mr-4 overflow-hidden shrink-0 max-w-full"
                alt="Logo"
              />
              <div className="text-green-500 text-xl font-semibold leading-7 self-center grow whitespace-nowrap m1-auto">
                <span className="text-black">Books</span>
                <span className="text-green-500">Ville</span>
              </div>
            </div>
            <div className="mt-5 flex justify-between gap-3 px-5 items-stretch cursor-pointer">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/76583589b5bc81575ed692d66fb4d297ca504948ae38b8622ab17869025867fb?"
                className="aspect-square object-contain object-center w-6 overflow-hidden shrink-0 max-w-full"
              />
              <Link
                to={"/admin-dashboard"}
                className="text-zinc-700 text-base focus:text-green-500 font-medium leading-5 self-center grow whitespace-nowrap my-24px"
              >
                Book Management
              </Link>
            </div>
            <div className="flex justify-between gap-3 px-5 mt-6 items-stretch cursor-pointer">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/45768402c325b0f1b75531f5c956eb5a7881ebd63c816897726a949b2e7cc170?"
                className="aspect-square object-contain object-center w-6 overflow-hidden shrink-0 max-w-full"
              />
              <Link
                to={"/admin-dashboard/view-books"}
                className="text-zinc-700 text-base focus:text-green-500 font-medium leading-5 self-center grow whitespace-nowrap my-24px"
              >
                Order Processing
              </Link>
            </div>
            <div
              onClick={handleLogout}
              className="flex justify-between gap-3 px-5 mt-6 items-stretch cursor-pointer"
            >
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/0b0f64bb3768851a0f3eb62907d28a48ad69b7e99ad44239cda8932bc0fdef2c?"
                className="aspect-square object-contain object-center w-6 overflow-hidden shrink-0 max-w-full"
              />
              <div className="text-red-500 text-base font-medium leading-5 self-center grow whitespace-nowrap my-24px">
                Logout
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

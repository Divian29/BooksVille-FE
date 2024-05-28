import { Link, useNavigate } from "react-router-dom";

export const AdminProfilePopUp = ({ handleProfilePop }) => {
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
    <div className="justify-center items-stretch shadow-md bg-white flex w-[13rem] flex-col p-4">
      <Link
        to={"/admin-dashboard/profile"}
        onClick={handleProfilePop}
        className="cursor-pointer items-center flex justify-between gap-3 ease-in-out duration-200 hover:gap-1"
      >
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/9438b608d98cb7a01b9f8cd8ad145b7a20744f94f28b8f75e0df37c2737e72a3?"
          className="aspect-[1.06] object-contain object-center w-[17px] overflow-hidden shrink-0 max-w-full my-auto"
        />
        <div className="text-zinc-700 text-[0.9rem] font-medium leading-5 self-stretch grow whitespace-nowrap">
          Account Setting
        </div>
      </Link>

      <div
        onClick={handleLogout}
        className="cursor-pointer items-center flex justify-between gap-3 mt-2 ease-in-out duration-200 hover:gap-1"
      >
        <img
          loading="lazy"
          src="/src/assets/images/adminImages/iconoutlinelogout.png"
          className="aspect-[1.06] object-contain object-center w-[17px] overflow-hidden shrink-0 max-w-full my-auto"
        />
        <div className="text-red-500 text-[0.9rem] font-medium leading-5 self-stretch grow whitespace-nowrap">
          Logout
        </div>
      </div>
    </div>
  );
};

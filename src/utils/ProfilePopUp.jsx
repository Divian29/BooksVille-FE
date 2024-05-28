import { Link, useNavigate } from "react-router-dom";

export const ProfilePopUp = ({ handleProfilePop }) => {
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
        to={"/user-dashboard/profile"}
        onClick={handleProfilePop}
        className="hover:bg-green-500 p-2 rounded cursor-pointer items-center flex justify-between gap-3 ease-in-out duration-200 hover:gap-1"
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
      <Link
        to={"/user-dashboard/subscription"}
        onClick={handleProfilePop}
        className="hover:bg-green-500 p-2 cursor-pointer items-center flex justify-between gap-3 rounded ease-in-out duration-200 hover:gap-1"
      >
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/a5e15da7184842f876612ef5685a90f7dc2086541ca5142a4cfe00d29b1d6467?"
          className="aspect-[1.06] object-contain object-center w-[17px] overflow-hidden shrink-0 max-w-full my-auto"
        />

        <div className="text-zinc-700 text-[0.9rem] font-medium leading-5 self-stretch grow whitespace-nowrap">
          Subscriptions
        </div>
      </Link>
      <Link
        to={"/user-dashboard/saved-books"}
        onClick={handleProfilePop}
        className="hover:bg-green-500 p-2 cursor-pointer items-center flex justify-between gap-3 rounded ease-in-out duration-200 hover:gap-1"
      >
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/ed369c9f34401fe4777810feadc14dcf36e449a5d211a0335285aaf134f3a865?"
          className="aspect-[1.06] object-contain object-center w-[17px] overflow-hidden shrink-0 max-w-full my-auto"
        />
        <div className="text-zinc-700 text-[0.9rem] font-medium leading-5 self-stretch grow whitespace-nowrap">
          My Saved books
        </div>
      </Link>
      <Link
        to={"/user-dashboard/purchased-books"}
        onClick={handleProfilePop}
        className="hover:bg-green-500 p-2 rounded cursor-pointer items-center flex justify-between gap-3 ease-in-out duration-200 hover:gap-1"
      >
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/637c6eb5c0b2c131cc7caa0c975075fa70a7394ca3e4ec5790031d4281aba4ef?"
          className="aspect-[1.06] object-contain object-center w-[17px] overflow-hidden shrink-0 max-w-full my-auto"
        />
        <div className="text-zinc-700 text-[0.9rem] font-medium leading-5 self-stretch grow whitespace-nowrap">
          My Purchased books
        </div>
      </Link>

      <div
        onClick={handleLogout}
        className="hover:bg-green-500 p-2 rounded cursor-pointer items-center flex justify-between gap-3 ease-in-out duration-200 hover:gap-1"
      >
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/812c440b-9896-4823-86a9-8fca8dff9d7e?apiKey=ecb6ce71cdf4467d9335c2f7dc302a16&"
          className="aspect-[1.06] object-contain object-center w-[17px] overflow-hidden shrink-0 max-w-full my-auto"
        />
        <div className="text-red-500 text-[0.9rem] font-medium leading-5 self-stretch grow whitespace-nowrap">
          Logout
        </div>
      </div>
    </div>
  );
};

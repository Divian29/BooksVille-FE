import { useState } from "react";
import axios from "../../api/axios.jsx";
import logo from "../../assets/images/landingPageImages/booksvillelogo.png";
import authImage from "../../assets/images/authImage.svg";
import { ClipLoader } from "react-spinners";
import { Link } from "react-router-dom";

export const ForgotPassword = ({
  handleStatus,
  setStatusTitle,
  setStatusMessage,
  setStatusColor,
}) => {
  const enableStatus = (title, message, color) => {
    handleStatus();
    setStatusTitle(title);
    setStatusMessage(message);
    setStatusColor(color);
  };

  const [clip, setClip] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setClip(true);

      // Make API call to your Java backend to handle user registration
      await axios
        .post("/auth/user-forgot-password", formData)
        .then((result) => {
          setClip(false);

          enableStatus(
            "Congratulations, Reset Instructions has been sent to your Email Successfully",
          );

          // Handle success (redirect, show message, etc.)
          console.log(result.data);
        });
    } catch (error) {
      setClip(false);

      enableStatus(
        "Oops!",
        "Something went wrong, please try again",
        "bg-red-600",
      );

      // Handle error (display error message, log, etc.)
      console.error("Registration failed:", error.message);
    }
  };

  return (
    <div className="flex">
      <div>
        <img loading="lazy" srcSet={authImage} className="" alt="" />
      </div>
      <div className="justify-center items-center bg-emerald-200 flex flex-col px-16 py-12 max-md:px-5">
        <div>
          <form
            onSubmit={handleSubmit}
            className="shadow-lg bg-white flex w-[35.25rem] max-w-full flex-col mt-[15vh] mb-11 px-11 pb-[6rem] pt-[4rem] rounded-xl max-md:my-10 max-md:px-5"
          >
            <div className="items-stretch self-center flex gap-1.5">
              <img
                loading="lazy"
                srcSet={logo}
                className="aspect-square object-contain object-center w-[41px] overflow-hidden shrink-0 max-w-full"
                alt=""
              />
              <div className="text-green-500 text-xl font-semibold leading-7 self-center grow whitespace-nowrap my-auto">
                <span className="text-black">Books</span>
                <span className="text-green-500">Ville</span>
              </div>
            </div>
            <div className="text-gray-900 text-2xl font-bold leading-8 self-center whitespace-nowrap mt-2.5">
              Reset your password
            </div>

            <div className="text-[#98A2B3] text-sm leading-5 text-center mx-auto mb-4 mt-10 max-w-[24.7rem]">
              Enter your email below and we’ll send you instructions on how to
              reset your password.
            </div>

            <div className="text-neutral-800 text-sm flex flex-col font-medium leading-5 self-stretch mt-2 max-md:max-w-full">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                id="email"
                autoComplete="given-email"
                className="text-neutral-500 text-base leading-6 whitespace-nowrap self-stretch rounded border border-[color:var(--Gray-3,#828282)] bg-white justify-center mt-1 pl-3 pr-16 py-3 border-solid items-start max-md:max-w-full max-md:pr-5"
              />
            </div>

            <button
              type="submit"
              className="cursor-pointer h-[2.5rem] hover:bg-black text-gray-50 text-base font-semibold leading-4 whitespace-nowrap flex justify-center items-center bg-green-500 self-stretch mt-1.5 px-16 py-3 rounded-xl max-md:max-w-full max-md:px-5"
            >
              {!clip ? (
                "Send reset instructions"
              ) : (
                <ClipLoader color="#FFFFFF" loading={true} size={20} />
              )}
            </button>

            <div className="text-green-500 text-sm leading-5 self-center whitespace-nowrap mt-2">
              <span className=" text-gray-400">Go back to </span>
              <span className="cursor-pointer font-semibold text-green-500 underline">
                <Link to={"/login"}>Sign In</Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

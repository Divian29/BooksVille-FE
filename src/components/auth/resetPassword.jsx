import { useState } from "react";
import axios from "../../api/axios.jsx";
import logo from "../../assets/images/landingPageImages/booksvillelogo.png";
import authImage from "../../assets/images/authImage.svg";
import { ClipLoader } from "react-spinners";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { PasswordResetSuccessCard } from "../../utils/PasswordResetSuccessCard.jsx";
import { Link } from "react-router-dom";

export const ResetPassword = ({
  handleStatus,
  setStatusTitle,
  setStatusMessage,
  setStatusColor,
}) => {
  const [successCard, setSuccessCard] = useState(false);

  const queryParams = new URLSearchParams(location.search);

  const token = queryParams.get("token");
  const email = queryParams.get("email");

  const enableStatus = (title, message, color) => {
    handleStatus();
    setStatusTitle(title);
    setStatusMessage(message);
    setStatusColor(color);
  };

  const [clip, setClip] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const [formData, setFormData] = useState({
    token: `${token}`,
    newPassword: "",
    confirmNewPassword: "",
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
        .post("/auth/user-reset-forgot-password", formData)
        .then((result) => {
          setClip(false);

          enableStatus(
            "Congratulations",
            "Password has been reset successfully",
            "bg-green-600",
          );

          setSuccessCard(true);

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
        <img
          loading="lazy"
          srcSet={authImage}
          className="flex-shrink-0 object-cover flex-1"
          alt=""
        />
      </div>
      <div className="justify-center items-center bg-emerald-200 flex flex-col px-16 py-12 max-md:px-5">
        {successCard && <PasswordResetSuccessCard email={email} />}
        {successCard && (
          <div className="absolute bg-black inset-[0] opacity-[0.8]"></div>
        )}

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

            <div className="text-neutral-800 text-sm flex flex-col font-medium leading-5 self-stretch mt-7 max-md:max-w-full">
              <label htmlFor="password">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                name="newPassword"
                id="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                required
                autoComplete="password"
                className="text-neutral-500 text-base leading-6 whitespace-nowrap self-stretch rounded border border-[color:var(--Gray-3,#828282)] bg-white justify-center mt-1 pl-3 pr-16 py-3 border-solid items-start max-md:max-w-full max-md:pr-5"
              />
              <span
                className="password-toggle relative bottom-[2rem] left-[28rem] text-green-700"
                onClick={handleTogglePassword}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <div className="text-neutral-800 text-sm flex flex-col font-medium leading-5 self-stretch max-md:max-w-full">
              <label htmlFor="confirmNewPassword">Confirm Password</label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmNewPassword"
                id="confirmNewPassword"
                value={formData.confirmNewPassword}
                onChange={handleChange}
                required
                autoComplete="confirm-password"
                className="text-neutral-500 text-base leading-6 whitespace-nowrap self-stretch rounded border border-[color:var(--Gray-3,#828282)] bg-white justify-center mt-1 pl-3 pr-16 py-3 border-solid items-start max-md:max-w-full max-md:pr-5"
              />
              <span
                className="confirmPassword-toggle relative bottom-[2rem] left-[28rem] text-green-700"
                onClick={handleToggleConfirmPassword}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <button
              type="submit"
              className="cursor-pointer h-[2.5rem] hover:bg-black text-gray-50 text-base font-semibold leading-4 whitespace-nowrap flex justify-center items-center bg-green-500 self-stretch mt-1.5 px-16 py-3 rounded-xl max-md:max-w-full max-md:px-5"
            >
              {!clip ? (
                "Reset my Password"
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

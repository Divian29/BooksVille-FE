import { useState } from "react";
import axios from "../../api/axios.jsx";
import { ClipLoader } from "react-spinners";
import logo from "../../assets/images/landingPageImages/booksvillelogo.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import authImage from "../../assets/images/authImage.svg";
import CryptoJS from 'crypto-js';
import {useEncryption} from "../../hooks/useEncryption.js";

export const Login = ({
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

  const [verified, setVerified] = useState(true);

  const [resendSuccess, setResendSuccess] = useState(false);

  const [clip, setClip] = useState(false);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log(tokenResponse);

      enableStatus(
        "Login Successful",
        "You have logged in successfully",
        "bg-green-600",
      );

      setTimeout(() => {
        navigate("/user-dashboard");
      }, 2500);
    },

    onError: (tokenResponse) => {
      enableStatus(
        "Oops!",
        "Something went wrong, Please check your inputs and try again",
        "bg-red-600",
      );
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!verified && !resendSuccess) {
      return;
    }
    try {
      setClip(true);

      const data = {
        email: `${formData.email}`,
        password: `${useEncryption(formData.password)}`
      }

      console.log(data)

      // Make API call to your Java backend to handle user registration
      await axios.post("/auth/login", data).then((result) => {
        setClip(false);

        if (result.data.responseMessage === "notVerified") {
          setVerified(false);

          setTimeout(() => {
            setVerified(true);
          }, 6000);

          return;
        }

        enableStatus(
          "Login Successful",
          "You have logged in successfully",
          "bg-green-600",
        );

        setTimeout(() => {
          if (result.data.responseData.role === "ADMIN") {
            navigate("/admin-dashboard");
          } else if (result.data.responseData.role === "USER") {
            navigate("/user-dashboard");
          }
        }, 2500);

        localStorage.setItem(
          "userData",
          JSON.stringify(result.data.responseData),
        );

        localStorage.setItem(
          "subscription",
          JSON.stringify(result.data.responseData.subscription),
        );

        localStorage.setItem(
          "profilePicture",
          JSON.stringify(result.data.responseData.profilePicture),
        );

        console.log("User login successful");
      });
    } catch (error) {
      setClip(false);

      enableStatus(
        "Oops!",
        "Something went wrong, Please check your inputs and try again",
        "bg-red-600",
      );

      // Handle error (display error message, log, etc.)
      console.error("login failed:", error.message);
    }
  };
  const handleResendVerification = async () => {
    try {
      await axios.post("", { email: formData.email });
      setResendSuccess(true);
      setVerified(true);

      setTimeout(() => {
        setResendSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Error resending verification email:", error.message);
    }
  };

  return (
    <div className="flex">
      <div>
        <img loading="lazy" src={authImage} alt="authentication image" />
      </div>

      <div className="bg-emerald-200 flex flex-col justify-center items-center px-16 py-12 max-md:px-5">
        <div>
          <form
            onSubmit={handleSubmit}
            className="shadow-lg bg-white flex w-[564px] max-w-full flex-col mt-[10%] px-11 py-9 rounded-xl max-md:my-10 max-md:px-5"
          >
            <div className="items-stretch self-center flex gap-1.5">
              <img
                srcSet={logo}
                className="aspect-square object-contain object-center w-[41px] overflow-hidden shrink-0 max-w-full"
              />
              <div className="text-green-500 text-xl font-semibold leading-7 self-center grow whitespace-nowrap my-auto">
                <span className="text-black">Books</span>
                <span className="text-green-500">Ville</span>
              </div>
            </div>
            <div className="text-gray-900 text-2xl font-bold leading-9 self-center whitespace-nowrap mt-2.5">
              Welcome back to BooksVille
            </div>
            {!verified && !resendSuccess && (
              <div className="w-full bg-red-300 p-4 rounded text-white mt-2">
                <p className="text-center">
                  Your Account has not been verified, please visit your email to
                  proceed.
                </p>
                <div className="flex justify-between items-center mt-2">
                  <p>Did not Get the Mail? </p>
                  <button
                    onClick={handleResendVerification}
                    className="rounded p-2 bg-red-800"
                  >
                    Resend Verification Mail
                  </button>
                </div>
              </div>
            )}
            {resendSuccess && (
              <div className="w-full bg-green-500 p-4 rounded text-white mt-2">
                <p className="text-center">
                  Verification mail successfully resent
                </p>
              </div>
            )}

            <div className="text-neutral-800 text-sm font-medium flex flex-col leading-5 self-stretch mt-2 max-md:max-w-full">
              <label htmlFor="email">Email Address</label>

              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                className="text-neutral-500 text-base leading-6 whitespace-nowrap self-stretch rounded border border-[color:var(--Grey-600,#475467)] bg-white justify-center mt-1 pl-3 pr-16 py-3 border-solid items-start max-md:max-w-full max-md:pr-5"
                required
              />
            </div>

            <div className="text-neutral-800 text-sm font-medium flex flex-col leading-5 self-stretch mt-2 max-md:max-w-full">
              <label htmlFor="password">Password</label>

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                required
                autoComplete="given-name"
                className="text-neutral-500 text-base leading-6 whitespace-nowrap self-stretch rounded border border-[color:var(--Grey-600,#475467)] bg-white justify-center mt-1 pl-3 pr-16 py-3 border-solid items-start max-md:max-w-full max-md:pr-5"
              />

              <span
                className="password-toggle text-green-700 relative top-[-2rem] left-[28rem]"
                onClick={handleTogglePassword}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <Link
              to={"/forgot-password"}
              className="cursor-pointer w-fit text-green-500 text-base leading-6 tracking-normal underline self-stretch max-md:max-w-full"
            >
              Forgot Password
            </Link>

            <div className="self-stretch flex items-stretch justify-between gap-3.5 max-md:max-w-full max-md:flex-wrap max-md:justify-center">
              <div className="bg-gray-200 self-center w-[221px] shrink-0 h-px my-auto" />
              <div className="text-gray-400 text-sm leading-5">OR</div>
              <div className="bg-gray-200 self-center w-[203px] shrink-0 h-0.5 my-auto" />
            </div>
            <div
              onClick={login}
              className="hover:bg-gray-300 transition cursor-pointer justify-center items-center self-stretch border border-[color:var(--Grey-300,#D0D5DD)] bg-white flex flex-col mt-3 px-16 py-3 rounded-lg border-solid max-md:max-w-full max-md:px-5"
            >
              <div className="flex items-stretch gap-2">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/e983b13740a4f6b8c54887c249a551ecbdf922916371d1498c09f3fa03f1f9b1?"
                  className="aspect-square object-contain object-center w-6 overflow-hidden shrink-0 max-w-full"
                />
                <div className="text-gray-400 text-sm leading-5 self-center grow whitespace-nowrap my-auto">
                  Sign in with Google
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="cursor-pointer h-[2.5rem] hover:bg-black text-gray-50 text-base font-semibold leading-4 whitespace-nowrap flex justify-center items-center bg-green-500 self-stretch mt-1.5 px-16 py-3 rounded-xl max-md:max-w-full max-md:px-5"
            >
              {!clip ? (
                "LOGIN"
              ) : (
                <ClipLoader color="#FFFFFF" loading={true} size={20} />
              )}
            </button>

            <div className="text-green-500 text-sm leading-5 self-center whitespace-nowrap mt-6">
              <span className=" text-gray-400">Don’t have an account ? </span>
              <span className="font-semibold underline text-green-500">
                <Link to={"/signup"}>Sign Up here</Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

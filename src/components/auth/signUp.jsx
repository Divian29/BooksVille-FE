import { useEffect, useState } from "react";
import axios from "../../api/axios.jsx";
import logo from "../../assets/images/landingPageImages/booksvillelogo.png";
import authImage from "../../assets/images/authImage.svg";
import { ClipLoader } from "react-spinners";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

export const SignUp = ({
  handleStatus,
  setStatusTitle,
  setStatusMessage,
  setStatusColor,
}) => {
  const regExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+=])[A-Za-z\d!@#$%^&*()-_+=]{8,}$/

  const enableStatus = (title, message, color) => {
    handleStatus();
    setStatusTitle(title);
    setStatusMessage(message);
    setStatusColor(color);
  };

  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        const sortedCountries = data.sort((a, b) =>
          a.name.common.localeCompare(b.name.common),
        );
        setCountries(sortedCountries);
        setSelectedCountry(sortedCountries[0]); // Set the default selected country
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  const handleCountryChange = (selectedValue) => {
    const selected = countries.find(
      (country) => country.cca2 === selectedValue,
    );
    setSelectedCountry(selected);
  };

  const [clip, setClip] = useState(false);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!regExp.test(formData.password) || formData.password !== formData.confirmPassword) {
      enableStatus(
          "Password Mismatch",
          "Your Password inputs does not match, please check and try again",
          "bg-red-600",
      );

      return;
    }

    try {
      setClip(true);

      // Make API call to your Java backend to handle user registration
      await axios.post("/auth/register-user", formData).then((result) => {
        setClip(false);

        enableStatus(
          "Registration Successful",
          "Your Registration is Successful, Please proceed to confirm your Email",
          "bg-green-600",
        );

        setTimeout(() => {
          navigate("/login");
        }, 2500);

        // Handle success (redirect, show message, etc.)
        console.log(result.data);
      });
    } catch (error) {
      setClip(false);

      enableStatus(
        "Oops!",
        "Something went wrong, Please check your inputs and try again",
        "bg-red-600",
      );

      // Handle error (display error message, log, etc.)
      console.error("Registration failed:", error.message);
    }
  };

  return (
    <div className="flex">
      <div>
        <img loading="lazy" src={authImage} alt="authentication image" />
      </div>

      <div className="justify-center items-center bg-emerald-200 flex flex-col px-16 py-12 max-md:px-5">
        <div>
          <form
            onSubmit={handleSubmit}
            className="shadow-lg bg-white flex w-[564px] max-w-full flex-col mt-[10%] mb-10 px-11 py-12 rounded-xl max-md:my-10 max-md:px-5"
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
              Create an Account
            </div>
            <div className="text-neutral-800 text-sm flex flex-col font-medium leading-5 self-stretch mt-10 max-md:max-w-full">
              <label htmlFor="first-name">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                id="first-name"
                autoComplete="given-name"
                placeholder="John"
                className="text-black text-base leading-6 whitespace-nowrap self-stretch rounded border border-[color:var(--Gray-3,#828282)] bg-white justify-center mt-1 pl-3 pr-16 py-3 border-solid items-start max-md:max-w-full max-md:pr-5"
              />
            </div>
            <div className="text-neutral-800 text-sm flex flex-col font-medium leading-5 self-stretch mt-2 max-md:max-w-full">
              <label htmlFor="last-name">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                id="last-name"
                autoComplete="given-name"
                placeholder="Doe"
                className="text-black text-base leading-6 whitespace-nowrap self-stretch rounded border border-[color:var(--Gray-3,#828282)] bg-white justify-center mt-1 pl-3 pr-16 py-3 border-solid items-start max-md:max-w-full max-md:pr-5"
              />
            </div>

            <div className="text-neutral-800 text-sm font-medium leading-5 self-stretch mt-2 max-md:max-w-full">
              <label htmlFor="phone-number">Phone Number</label>
              <div className="items-stretch rounded border border-[color:var(--Gray-3,#828282)] self-stretch flex justify-between gap-2.5 pl-4 pr-20 py-2.5 border-solid max-md:max-w-full max-md:flex-wrap max-md:pr-5">
                <div className="flex">
                  {selectedCountry && (
                    <img
                      loading="lazy"
                      src={selectedCountry.flags.svg}
                      alt={selectedCountry.name.common}
                      className="aspect-[1.67] object-contain object-center w-10 items-center overflow-hidden shrink-0 max-w-full"
                    />
                  )}
                  <select
                    value={selectedCountry ? selectedCountry.cca2 : ""}
                    onChange={(e) => handleCountryChange(e.target.value)}
                    className="text-neutral-500 w-4 h-4 mt-1 mx-2 text-base leading-6 tracking-normal grow whitespace-nowrap self-start"
                  >
                    {countries.map((country) => (
                      <option key={country.cca2} value={country.cca2}>
                        {country.name.common}
                      </option>
                    ))}
                  </select>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    id="tel"
                    autoComplete="tel"
                    placeholder="080xxxxxxxx"
                    className="text-black text-base leading-6 tracking-normal focus:outline-none grow whitespace-nowrap self-start"
                    style={{ border: "1px solid transparent" }}
                  />
                </div>
              </div>
            </div>
            <div className="text-neutral-800 text-sm flex flex-col font-medium leading-5 self-stretch mt-2 max-md:max-w-full">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                id="email"
                autoComplete="email"
                placeholder="JohnD007@gmal.com"
                className="text-black text-base leading-6 whitespace-nowrap self-stretch rounded border border-[color:var(--Gray-3,#828282)] bg-white justify-center mt-1 pl-3 pr-16 py-3 border-solid items-start max-md:max-w-full max-md:pr-5"
              />
            </div>
            <div className="text-neutral-800 text-sm flex flex-col font-medium leading-5 self-stretch mt-2 max-md:max-w-full">
              <label htmlFor="password">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                required
                autoComplete="password"
                placeholder="******"
                className="text-black text-base leading-6 whitespace-nowrap self-stretch rounded border border-[color:var(--Gray-3,#828282)] bg-white justify-center mt-1 pl-3 pr-16 py-3 border-solid items-start max-md:max-w-full max-md:pr-5"
              />
              <span
                className="password-toggle relative bottom-[2rem] left-[28rem] text-green-700"
                onClick={handleTogglePassword}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>

              { !regExp.test(formData.password) && formData.password.length > 0 &&
                  <div className="text-red-500">
                    Password must contain at least: one lowercase, uppercase, number special character [!@#$%^&*()_+=] and must not be less than 8.
                  </div>
              }
            </div>

            <div className="text-neutral-800 text-sm flex flex-col font-medium leading-5 self-stretch mt-2 max-md:max-w-full">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                autoComplete="confirm-password"
                placeholder="******"
                className="text-black text-base leading-6 whitespace-nowrap self-stretch rounded border border-[color:var(--Gray-3,#828282)] bg-white justify-center mt-1 pl-3 pr-16 py-3 border-solid items-start max-md:max-w-full max-md:pr-5"
              />
              <span
                className="confirmPassword-toggle relative bottom-[2rem] left-[28rem] text-green-700"
                onClick={handleToggleConfirmPassword}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>

              { formData.password !== formData.confirmPassword && formData.confirmPassword.length > 0 &&
                  <div className="text-red-500">
                    Passwords does not match
                  </div>
              }
            </div>
            <div className="self-stretch flex items-stretch justify-between gap-3.5 mt-6 max-md:max-w-full max-md:flex-wrap max-md:justify-center">
              <div className="bg-gray-200 self-center w-[222px] shrink-0 h-px my-auto" />
              <div className="text-gray-400 text-sm leading-5">OR</div>
              <div className="bg-gray-200 self-center w-[203px] shrink-0 h-0.5 my-auto" />
            </div>
            <div className="justify-center items-center self-stretch border border-[color:var(--Grey-300,#D0D5DD)] bg-white flex flex-col mt-3 px-16 py-3 rounded-lg border-solid max-md:max-w-full max-md:px-5">
              <div className="flex items-stretch gap-2">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/f8f32a5d5ac7ff28f7684ff19596e3ee16bb64fea14f5dcf406b3b01c9f04758?"
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
                "SIGNUP"
              ) : (
                <ClipLoader color="#FFFFFF" loading={true} size={20} />
              )}
            </button>
            <div className="text-green-500 text-sm leading-5 self-center whitespace-nowrap mt-6">
              <span className=" text-gray-400">Already have an account ? </span>
              <span className="font-semibold text-green-500 underline">
                <Link to={"/login"}>Log In here</Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

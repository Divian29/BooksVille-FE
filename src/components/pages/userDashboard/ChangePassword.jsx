import { ClipLoader } from "react-spinners";
import { useState } from "react";
import axios from "../../../api/axios.jsx";

export const ChangePassword = ({
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

  const [formData, setFormDate] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [clip, setClip] = useState(false);

  const handleChange = (e) => {
    setFormDate({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setClip(true);

    try {
      await axios
        .patch("http://localhost:8080/api/v1/user/change-password", formData, {
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("userData")).accessToken}`,
          },
        })
        .then((response) => {
          setClip(false);

          enableStatus(
            "Password Update Successful",
            "Your Password has has been updated successfully",
            "bg-green-600",
          );

          console.log(response.data.responseMessage);
        });
    } catch (error) {
      setClip(false);

      enableStatus(
        "Oops!",
        "Something went wrong please try again",
        "bg-red-600",
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-[436px] mx-auto max-w-full"
    >
      <div className="text-gray-900 text-2xl font-bold leading-8 mt-10 md:mt-10">
        Password
      </div>
      <div className="text-gray-500 text-sm leading-5">
        Change your password
      </div>

      <div className="mt-5">
        <label
          htmlFor="old-password"
          className="text-gray-900 text-base font-semibold leading-6 tracking-normal mt-4"
        >
          Old Password
        </label>

        <input
          type="text"
          name="oldPassword"
          value={formData.oldPassword}
          onChange={handleChange}
          id="old-password"
          placeholder="******"
          className="border border-[color:var(--Grey-300,#D0D5DD)] w-full px-4 py-3 rounded-lg mt-2"
        />
      </div>

      <div className="mt-5">
        <label
          htmlFor="new-password"
          className="text-gray-900 text-base font-semibold leading-6 tracking-normal mt-4"
        >
          New Password
        </label>

        <input
          type="text"
          name="newPassword"
          value={formData.newPassword}
          onChange={handleChange}
          id="new-password"
          placeholder="******"
          className="border border-[color:var(--Grey-300,#D0D5DD)] w-full px-4 py-3 rounded-lg mt-2"
        />
      </div>

      <div className="mt-5">
        <label
          htmlFor="confirm-new-password"
          className="text-gray-900 text-base font-semibold leading-6 tracking-normal mt-4"
        >
          Confirm New Password
        </label>

        <input
          type="text"
          name="confirmNewPassword"
          value={formData.confirmNewPassword}
          onChange={handleChange}
          id="confirm-new-password"
          placeholder="******"
          className="border border-[color:var(--Grey-300,#D0D5DD)] w-full px-4 py-3 rounded-lg mt-2"
        />
      </div>

      <button
        style={!clip ? {} : { backgroundColor: "" }}
        type="submit"
        name="submit"
        value="Save Changes"
        className="cursor-pointer transition hover:bg-green-600 text-white text-center text-base font-semibold leading-6 whitespace-nowrap justify-center bg-green-500 w-full px-16 py-3 rounded-lg mt-6"
      >
        {!clip ? (
          "Save"
        ) : (
          <ClipLoader color="#FFFFFF" loading={true} size={20} />
        )}
      </button>
    </form>
  );
};

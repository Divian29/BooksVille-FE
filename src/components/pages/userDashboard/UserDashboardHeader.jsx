import { ProfilePopUp } from "../../../utils/ProfilePopUp.jsx";
import {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import axios from "../../../api/axios.jsx";
import {useConfig} from "../../../hooks/useConfig.js";
import dot from "../../../assets/images/greendot.png";
import Modal from "react-modal";
import {NotificationCard} from "../../../utils/NotificationCard.jsx";

export const UserDashboardHeader = ({ handleStatus, setStatusTitle, setStatusMessage, setStatusColor, userData, setGeneralSearch, setQuery }) => {
  const [profileClick, setProfileCLick] = useState(false);
  const [search, setSearch] = useState("");
  const [notification, setNotification] = useState()
  const [lastNotificationTime, setLastNotificationTime] = useState(notification?.dateCreated)
  const [notDep, setNotDep] = useState(false)
  const [newNotification, setNewNotification] = useState(false)

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleNotificationClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewNotification(false)
  };

  const enableStatus = (title, message, color) => {
    handleStatus();
    setStatusTitle(title);
    setStatusMessage(message);
    setStatusColor(color);
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  }

  const handleNotDep = () => {
    setNotDep(!notDep)
  }

  useEffect(() => {
    setQuery(search)

    setTimeout(() => {
      if (search.length < 1) {
        setGeneralSearch(false)
      } else if (search.length > 0) {
        setGeneralSearch(true)
      }
    }, 500)
  }, [search]);

  useEffect(() => {
    const fetchNotification = async () => {
      const response = await axios.get("/notifications", useConfig())
      console.log(response)

      setNotification(response.data)
      setLastNotificationTime(response.data.dateCreated)

      if (response.data.dateCreated !== lastNotificationTime && lastNotificationTime !== undefined) {
        enableStatus(
            "New Notification",
            "You have a new Notification",
            "bg-green-600",
        );
        setNewNotification(true)
      }
    }

    setTimeout(() => {
      fetchNotification()
      handleNotDep()
    }, 5000)
  }, [notDep]);

  return (
    <div className="max-w-[1297px] mx-auto justify-between items-stretch bg-white flex gap-5 py-4 max-md:flex-wrap max-md:px-5">
      <div className="justify-between items-stretch flex gap-5 max-md:max-w-full max-md:flex-wrap">
        <div className="items-stretch flex justify-between gap-1.5">
          <img
            loading="lazy"
            src="/src/assets/images/landingPageImages/image-1@2x.png"
            className="aspect-square object-contain object-center w-[41px] overflow-hidden shrink-0 max-w-full"
            alt="logo"
          />
          <div className="text-green-500 text-xl font-semibold leading-7 self-center grow whitespace-nowrap my-auto">
            <span className="text-black">Books</span>
            <span className="text-green-500">Ville</span>
          </div>
        </div>
        <div className="border border-[color:var(--Gray-3,#828282)] shadow-sm bg-white flex justify-between gap-5 p-3 rounded-lg border-solid self-start items-start max-md:pr-5">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/91e96adef65dce60e36521d4289d5e7de1ab53737882b92f22f1bc074be117bf?"
            className="aspect-square object-contain object-center w-4 justify-center items-center overflow-hidden shrink-0 max-w-full"
            alt="magnifying Glass"
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
      <div className="items-center self-center flex justify-between gap-5 my-auto max-md:max-w-full max-md:flex-wrap">
        <div className="items-stretch flex justify-between gap-5 my-auto">
          <Link
            to={"/user-dashboard"}
            className="text-black text-xl font-medium leading-7 grow whitespace-nowrap cursor-pointer hover:text-green-500 focus:text-green-500"
          >
            Home
          </Link>
          <Link
            to={"/user-dashboard/categories"}
            className="text-black text-xl font-medium leading-7 cursor-pointer hover:text-green-500 focus:text-green-500"
          >
            Categories
          </Link>
          <Link
            to={"/user-dashboard/cart"}
            className="text-black text-xl font-medium leading-7 cursor-pointer hover:text-green-500 focus:text-green-500"
          >
            Cart
          </Link>
        </div>
        <div className="items-center self-stretch flex justify-between gap-5">
          <div onClick={handleNotificationClick} className="relative cursor-pointer hover:scale-125 transition">
            { newNotification &&
                <div>
                  <img
                      loading="lazy"
                      src={dot}
                      className="absolute ml-3 aspect-square object-contain object-center w-[15px] overflow-hidden shrink-0 max-w-full my-auto"
                      alt="notification_dot"
                  />
                </div>
            }
            <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/45865262ec10830d6ae94f082eeaa00c750af8e190a99765bfbb482648db65df?"
                className="aspect-square object-contain object-center w-[25px] overflow-hidden shrink-0 max-w-full my-auto"
                alt="notification"
            />
          </div>
          <div
            onClick={() => setProfileCLick(!profileClick)}
            className="relative cursor-pointer"
          >
            <img
              loading="lazy"
              srcSet={userData?.profilePicture}
              className="aspect-square object-contain object-center w-9 overflow-hidden self-stretch shrink-0 max-w-full rounded-[50%]"
              alt="profile picture"
            />
          </div>
        </div>
      </div>


      <Modal
          isOpen={isModalOpen}
          onRequestClose={handleCloseModal}
          style={{
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 1000,
            },
            content: {
              maxWidth: "fit-content",
              maxHeight: "fit-content",
              background: "none",
              border: "none",
              borderRadius: "8px",
            },
          }}
      >
        <NotificationCard
            statusColor={"bg-green-500"}
            statusTitle={"New Notification"}
            message={notification?.message}
        />
      </Modal>



      {profileClick && (
        <div className="absolute right-[2rem] top-[4rem] shadow-2xl">
          <ProfilePopUp
            handleProfilePop={() => setProfileCLick(!profileClick)}
          />
        </div>
      )}
    </div>
  );
};

import Modal from "react-modal";
import { DownloadBookModal } from "../components/pages/userDashboard/DownloadBookModal.jsx";
import { useState } from "react";
import axios from "../api/axios.jsx";
import { useData } from "../hooks/useData.js";
import { useConfig } from "../hooks/useConfig.js";
import { PaymentOptions } from "../components/payment/PaymentOptions.jsx";
import { UpgradeOrBuy } from "./UpgradeOrBuy.jsx";

export const DownloadAndReadOnline = ({
  book,
  handleStatus,
  setStatusTitle,
  setStatusMessage,
  setStatusColor,
  subscription,
  isPurchased,
  dep,
}) => {
  const { userData } = useData();

  const enableStatus = (title, message, color) => {
    handleStatus();
    setStatusTitle(title);
    setStatusMessage(message);
    setStatusColor(color);
  };

  const [isOptionOpen, setIsOptionOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleBuyCloseModal = () => {
    setIsBuyModalOpen(false);
  };

  const handleOptionCloseModal = () => {
    setIsOptionOpen(false);
  };

  const handleBuyClick = () => {
    setIsBuyModalOpen(true);
    handleOptionCloseModal();
  };

  const handleOptionClick = () => {
    setIsOptionOpen(true);
  };

  const handleDownloadClick = () => {
    setIsModalOpen(true);
  };

  const handleDownloadBook = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(`/book/download?book_id=${book.id}`, {
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${userData.accessToken}`,
        },
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");

      link.href = url;
      link.setAttribute("download", `${book.bookTitle}.pdf`);
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);

      enableStatus(
        "Download Successful",
        "Book has been downloaded successfully",
        "bg-green-600",
      );
    } catch (error) {
      enableStatus(
        "Oops!",
        "Something went wrong, please try again",
        "bg-red-600",
      );
    }
  };

  const handleReadOnlineClick = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/book/download?book_id=${book.id}`,
        useConfig(),
      );

      // Check if the response is successful
      if (response.ok) {
        // Get the blob content from the response
        const blob = await response.blob();

        // Create a blob URL for the PDF content
        const pdfUrl = URL.createObjectURL(blob);

        // Open a new tab with the PDF viewer
        window.open(pdfUrl, "_blank");

        enableStatus(
          "Book Opened for Reading",
          "Book is now open for reading online",
          "bg-green-600",
        );
      } else {
        // Handle error response
        enableStatus(
          "Oops!",
          "Something went wrong, please try again",
          "bg-red-600",
        );
      }
    } catch (error) {
      console.error("Error fetching book content:", error);
      // Handle fetch error
      enableStatus(
        "Oops!",
        "Something went wrong, please try again",
        "bg-red-600",
      );
    }
  };

  const handleSaveBook = async (e) => {
    e.preventDefault();

    try {
      await axios.get(`/book/save/${book.id}`, useConfig()).then((response) => {
        console.log(response.data.responseData);

        if (response.data.responseMessage === "alreadySaved") {
          enableStatus(
            "Already saved",
            "Book has already been saved",
            "bg-red-300",
          );
        } else {
          enableStatus(
            "Save Successful",
            "Book has been saved successfully",
            "bg-green-600",
          );
        }
      });
    } catch (error) {
      enableStatus(
        "Oops!",
        "Something went wrong please try again",
        "bg-red-600",
      );
    }
  };

  return (
    <div className="flex gap-2.5 mt-6 self-start items-start max-md:max-w-full max-md:flex-wrap">
      <Modal
        isOpen={isBuyModalOpen}
        onRequestClose={handleBuyCloseModal}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1000,
          },
          content: {
            maxWidth: "592px",
            maxHeight: "500px",
            margin: "auto",
            background: "white",
            borderRadius: "8px",
            padding: "0px",
          },
        }}
      >
        <PaymentOptions
          book={book}
          handleStatus={handleStatus}
          setStatusTitle={setStatusTitle}
          setStatusMessage={setStatusMessage}
          setStatusColor={setStatusColor}
          handleBuy={handleBuyCloseModal}
          dep={dep}
        />
      </Modal>

      <Modal
        isOpen={isOptionOpen}
        onRequestClose={handleOptionCloseModal}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1000,
          },
          content: {
            maxWidth: "592px",
            maxHeight: "fit-content",
            margin: "auto",
            background: "white",
            borderRadius: "8px",
            padding: "0px",
          },
        }}
      >
        <UpgradeOrBuy
          handleCloseModal={handleOptionCloseModal}
          handlePurchaseBook={handleBuyClick}
        />
      </Modal>

      {subscription === "VORACIOUS" || isPurchased || book?.price === 0 ? (
        <span
          className="hover:bg-green-600 hover:text-white text-center cursor-pointer text-green-600 text-base font-medium leading-5 uppercase justify-center items-stretch bg-white grow px-8 py-5 rounded-md border-[1.145px] border-solid border-green-600 max-md:px-5"
          onClick={() => handleDownloadClick()}
        >
          DOWNLOAD now
        </span>
      ) : (
        <span
          onClick={handleOptionClick}
          className="bg-blue-200 hover:bg-blue-500 hover:text-white cursor-pointer text-green-800 text-base font-medium leading-5 uppercase justify-center items-stretch bg-white grow px-8 py-5 rounded-md border-[1.145px] border-solid border-green-600 max-md:px-5"
        >
          Upgrade or Purchase to download
        </span>
      )}

      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1000,
          },
          content: {
            maxWidth: "400px",
            maxHeight: "500px",
            margin: "auto",
            background: "white",
            borderRadius: "8px",
            padding: "20px",
          },
        }}
      >
        <DownloadBookModal
          onCancel={handleCloseModal}
          onContinue={handleDownloadBook}
        />
      </Modal>
      <a
        href="#"
        onClick={() => handleReadOnlineClick()}
        className="hover:bg-green-600 hover:text-white text-center cursor-pointer text-green-600 text-base font-medium leading-5 uppercase justify-center items-stretch self-stretch grow px-12 py-5 rounded-md border-[1.174px] border-solid border-green-600 max-md:px-5"
      >
        READ ONLINE
      </a>

      <div
        onClick={handleSaveBook}
        className="px-12 transition hover:border-solid hover:border-green-600 cursor-pointer h-[3.8rem] text-center py-[1.2rem] text-rose-500 text-base font-medium leading-5 uppercase justify-center items-stretch self-stretch grow rounded-md max-md:px-5 border-[1.174px] border-white"
      >
        ADD TO SAVED
      </div>
    </div>
  );
};

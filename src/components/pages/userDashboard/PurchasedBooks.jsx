import { useNavigate } from "react-router-dom";
import { DownloadBookModal } from "./DownloadBookModal.jsx";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import axios from "../../../api/axios.jsx";

export const PurchasedBooks = ({
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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [selectedBookTitle, setSelectedBookTitle] = useState(null); // Add selectedBookTitle state

  const handleDownloadClick = (id, bookTitle) => {
    setSelectedBookId(id);
    setSelectedBookTitle(bookTitle); // Set selected book title
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const navigate = useNavigate();

  const [isLast, setIsLast] = useState(false);

  const [page, setPage] = useState(0);

  const [purchasedBooks, setPurchasedBooks] = useState([]);

  const handleDownloadBook = async () => {
    if (!selectedBookId || !selectedBookTitle) {
      return;
    }
    try {
      const response = await axios.get(
        `/book/download?book_id=${selectedBookId}`,
        {
          responseType: "blob",
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("userData")).accessToken}`,
          },
        },
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${selectedBookTitle}.pdf`);
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

  const handleReadOnlineClick = async (bookId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/book/download?book_id=${bookId}`,
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("userData")).accessToken}`,
          },
        },
      );

      // Check if the response is successful
      if (response.ok) {
        // Get the blob content from the response
        const blob = await response.blob();

        // Create a blob URL for the PDF content
        const pdfUrl = URL.createObjectURL(blob);

        // Open a new tab with the PDF viewer
        const newWindow = window.open(pdfUrl, "_blank");

        // Handle success message or other logic if needed
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

  const nextPage = () => {
    if (!isLast) {
      setPage(page + 1);
    }
  };

  const prevPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    try {
      const getPurchasedBooks = async () => {
        const response = await axios.get(
          `/book/purchased?sortDir=desc&pageNo=${page}`,
          {
            headers: {
              Authorization: `Bearer ${JSON.parse(localStorage.getItem("userData")).accessToken}`,
            },
          },
        );

        setIsLast(response.data.responseData.last);
        setPurchasedBooks(response.data.responseData.content);
      };

      getPurchasedBooks();
    } catch (error) {
      console.error("Error fetching purchased books:", error);
    }
  }, [page]);

  return (
    <div className="bg-white flex flex-col items-stretch mt-10 pr-2 pb-12 max-md:mt-40">
      <span className="self-start flex w-full max-w-[1010px] flex-col mt-5 ml-20 mb-40 max-md:max-w-full max-md:mb-10">
        <span
          onClick={goBack}
          className="hover:scale-105 transition cursor-pointer items-stretch flex gap-2 self-start"
        >
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/1d7dd83f57cf0f0d55ac4589528b86a4f6e45a046fbd6c7d18b6110dd0c11edb?"
            className="aspect-square object-contain object-center w-6 overflow-hidden shrink-0 max-w-full"
          />

          <div className="text-gray-900 text-base font-semibold leading-6 tracking-normal grow whitespace-nowrap self-start">
            Go back
          </div>
        </span>
        <div className="text-black text-2xl font-semibold leading-8 self-stretch mt-10 max-md:max-w-full">
          MY PURCHASED BOOKS
        </div>

        {purchasedBooks.map((book) => (
          <div className="self-stretch mt-6 max-md:max-w-full" key={book.id}>
            <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
              <div className="flex flex-col items-stretch w-1/5 max-md:w-full max-md:ml-0">
                <img
                  loading="lazy"
                  src={book?.bookCover}
                  className="aspect-[0.73] object-contain object-center w-[202px] shadow-lg overflow-hidden shrink-0 max-w-full grow max-md:mt-3"
                  alt={`Cover of ${book?.bookTitle}`}
                />
              </div>
              <div className="flex flex-col items-stretch w-4/5 max-md:w-full max-md:ml-0">
                <span className="flex grow flex-col max-md:max-w-full max-md:mt-3">
                  <div className="text-neutral-800 text-2xl font-semibold leading-8 self-stretch max-md:max-w-full">
                    {book?.bookTitle}
                  </div>
                  <div className="text-neutral-500 text-sm leading-5 self-stretch mt-2 max-md:max-w-full">
                    by {book?.author}
                  </div>
                  <div className="text-black text-sm leading-5 self-stretch mt-2 max-md:max-w-full">
                    {book?.description}
                  </div>
                  <span className="items-stretch flex gap-3 mt-2 pr-9 self-start max-md:pr-5">
                    <div className="text-neutral-500 text-sm leading-5 grow whitespace-nowrap">
                      {book?.genre}
                    </div>
                  </span>
                  <div className="text-neutral-800 text-base font-bold leading-6 self-stretch mt-2 max-md:max-w-full">
                    N {book?.price}
                  </div>
                  <div className="flex gap-2.5 mt-6 self-start items-start max-md:max-w-full max-md:flex-wrap">
                    <span
                      className="hover:bg-green-600 hover:text-white cursor-pointer text-green-600 text-base font-medium leading-5 uppercase justify-center items-stretch bg-white grow px-8 py-5 rounded-md border-[1.145px] border-solid border-green-600 max-md:px-5"
                      onClick={() =>
                        handleDownloadClick(book.id, book.bookTitle)
                      }
                    >
                      DOWNLOAD now
                    </span>
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
                      onClick={() => handleReadOnlineClick(book.id)}
                      className="hover:bg-green-600 hover:text-white cursor-pointer text-green-600 text-base font-medium leading-5 uppercase justify-center items-stretch self-stretch grow px-12 py-5 rounded-md border-[1.174px] border-solid border-green-600 max-md:px-5"
                    >
                      READ ONLINE
                    </a>
                  </div>
                </span>
              </div>
            </div>
          </div>
        ))}
      </span>

      <div className="self-stretch max-md:max-w-full">
        {purchasedBooks.length > 0 && (
          <div className="flex gap-4 justify-end">
            <button
              onClick={prevPage}
              className="flex hover:bg-red-500 py-1 w-[8rem] transition items-center gap-2 border border-black rounded-lg px-4 justify-center"
            >
              <div>
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/1d7dd83f57cf0f0d55ac4589528b86a4f6e45a046fbd6c7d18b6110dd0c11edb?"
                  className="aspect-square object-contain object-center w-6 overflow-hidden shrink-0 max-w-full"
                />
              </div>
              <p>Back</p>
            </button>

            <button
              onClick={nextPage}
              className="flex items-center hover:bg-green-500 py-1 w-[8rem] transition gap-2 border border-black rounded-lg px-4 justify-center"
            >
              <p>Next</p>
              <div>
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/1d7dd83f57cf0f0d55ac4589528b86a4f6e45a046fbd6c7d18b6110dd0c11edb?"
                  className="aspect-square object-contain rotate-180 object-center w-6 overflow-hidden shrink-0 max-w-full"
                />
              </div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

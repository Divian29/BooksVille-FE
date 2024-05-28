import { useEffect, useState } from "react";
import axios from "../../../api/axios.jsx";
import Modal from "react-modal";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../../hooks/formatDate.js";
import { EditBookModal } from "./EditBookModal.jsx";
import {useConfig} from "../../../hooks/useConfig.js";
import {Rate} from "../../../utils/Rate.jsx";
import {Rating} from "../../../utils/Rating.jsx";

export const ViewBooks = ({
  handleStatus,
  setStatusTitle,
  setStatusMessage,
  setStatusColor,
}) => {
  const userData = JSON.parse(localStorage.getItem("userData"));

  const enableStatus = (title, message, color) => {
    handleStatus();
    setStatusTitle(title);
    setStatusMessage(message);
    setStatusColor(color);
  };

  const [clip, setClip] = useState(false);

  const [isLast, setIsLast] = useState(false);
  const [page, setPage] = useState(0);
  const [uploadedBooks, setUploadedBooks] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modal1IsOpen, setModal1IsOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showBookPage, setShowBookPage] = useState(false);
  const [isBookHidden, setIsBookHidden] = useState();

  const navigate = useNavigate();

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const openModal1 = () => {
    setModal1IsOpen(true);
  };

  const closeModal1 = () => {
    setModal1IsOpen(false);
  };

  useEffect(() => {
    const getAllUploadedBooks = async () => {
      await axios
        .get(`/book/books?pageNo=${page}&sortDir=desc`, {
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("userData")).accessToken}`,
          },
        })
        .then((response) => {
          setIsLast(response.data.responseData.last);
          setUploadedBooks(response.data.responseData.content);
          console.log(response.data.responseData.content);
        });
    };

    getAllUploadedBooks();
  }, [page]);

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

  const handleViewBookClick = async (bookId) => {
    // Fetch the details of the selected book using its ID
    await axios
      .get(`/book/get-book/${bookId}`, useConfig())
      .then((response) => {
        setSelectedBook(response.data.responseData); // Set the selected book details in the state
        setShowBookPage(true); // Show the book page
      })
      .catch((error) => {
        console.error("Error fetching book details:", error);
      });
  };

  const handleDeleteBook = async () => {
    setClip(true);
    // Delete the book using the selected book's ID
    await axios
      .delete(`/book/delete/${selectedBook.id}`)
      .then((response) => {
        setClip(false);
        console.log("Book deleted successfully.");

        enableStatus("Success", "Book deleted successfully", "bg-green-600");
        setTimeout(() => {
          closeModal();
          navigate("/admin-dashboard");
        }, 2500);
      })
      .catch((error) => {
        console.error("Error deleting book:", error);
        setClip(false);

        enableStatus(
          "Oops!",
          "Something went wrong, please try again",
          "bg-red-600",
        );
      });
  };

  const handleHideBook = async (bookId) => {
    await axios
      .patch(`/book/hide/${bookId}`)
      .then((response) => {
        console.log("Book hidden/unhidden successfully.");
        setIsBookHidden(response.data.responseData); // Toggle the isBookHidden state
        enableStatus(
          "Success",
          `Book ${response.data.responseData ? "Hidden" : "Unhidden"} successfully`,
          "bg-green-600",
        );
        // Optionally, you can update the state or fetch the updated book list
      })
      .catch((error) => {
        console.error("Error hiding/unhiding book:", error);
        enableStatus(
          "Oops!",
          "Something went wrong, please try again",
          "bg-red-600",
        );
      });
  };

  return (
    <>
      {!showBookPage && (
        <div className="bg-white flex pb-5">
          <div className="mt-24">
            <div className=" items-center flex gap-2 ">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/5a48afe66de2c87c0cfa6c9ea7b196061ca6484055bd38c52c40141936e312f0?"
                className="aspect-square object-contain object-center w-6 overflow-hidden shrink-0 max-w-full my-auto"
              />
              <div className="text-zinc-900 text-2xl font-bold leading-8 whitespace-nowrap">
                All Uploaded Books
              </div>
            </div>

            {uploadedBooks?.map((book) => (
              <div
                key={book.id}
                className="shadow-lg bg-white w-[75vw] pl-5 pr-7 py-5 mt-5 max-md:pr-5"
              >
                <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
                  <div className="flex flex-col items-stretch w-[79%] max-md:w-full max-md:ml-0">
                    <div className="flex grow items-stretch justify-between gap-2.5 max-md:mt-10">
                      <img
                        loading="lazy"
                        src={book?.bookCover}
                        className="aspect-[0.78] object-contain object-center w-[78px] justify-center items-center overflow-hidden shrink-0 max-w-full"
                      />
                      <div className="items-stretch flex grow basis-[0%] flex-col self-start">
                        <div className="text-slate-900 text-base font-semibold leading-6 whitespace-nowrap">
                          {book?.bookTitle}
                        </div>
                        <div className="text-slate-600 text-sm leading-5 whitespace-nowrap mt-1">
                          by {book?.author}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div
                      className="hover:bg-green-600 transition text-white text-sm leading-5 whitespace-nowrap items-stretch bg-green-500 justify-center w-full my-auto px-7 py-3 rounded-md max-md:mt-10 max-md:px-5 cursor-pointer"
                      onClick={() => handleViewBookClick(book.id)}
                    >
                      VIEW BOOK
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {uploadedBooks.length > 0 && (
              <div className="flex gap-4 justify-end mt-10">
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
      )}

      {/* Render the book page when selectedBook is not null */}
      {showBookPage && (
        <div className="flex flex-col max-md:w-full max-md:ml-0">
          <div
            onClick={() => setShowBookPage(false)}
            className="mt-[12vh] cursor-pointer transition hover:scale-105 items-stretch flex gap-2 self-start"
          >
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/05c93399f1248fc1de27bab921526a1825a15da2fa4d259f0e0f0ad954105612?"
              className="aspect-square object-contain object-center w-6 overflow-hidden shrink-0 max-w-full"
            />
            <div className="text-gray-900 text-base font-semibold leading-6 tracking-normal grow whitespace-nowrap self-start">
              Go back
            </div>
          </div>

          <div
            key={selectedBook?.id}
            className="flex flex-col items-stretch max-md:max-w-full"
          >
            <span className="items-center flex gap-2 mt-7 self-start max-md:ml-2.5">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/cf4be3deae8d0d24f2a0336bc8a7a937de5df9ac4ac1e615aaa9d766e8d85e23?"
                className="aspect-square object-contain object-center w-6 overflow-hidden shrink-0 max-w-full my-auto"
              />
              <div className="text-zinc-900 text-2xl font-bold leading-8 self-stretch grow whitespace-nowrap">
                {selectedBook?.bookTitle}
              </div>
            </span>
            <div className="shadow-lg bg-white flex w-[755px] max-w-full flex-col mt-8 pl-5 pr-20 pt-4 pb-7 self-start items-start max-md:pr-5">
              <div className="w-[609px] max-w-full">
                <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
                  <div className="flex flex-col items-stretch w-[21%] max-md:w-full max-md:ml-0">
                    <img
                      loading="lazy"
                      srcSet={selectedBook?.bookCover}
                      className="aspect-[0.78] object-contain object-center w-[129px] overflow-hidden shrink-0 max-w-full grow max-md:mt-2"
                    />
                  </div>
                  <div className="flex flex-col items-stretch w-[79%] ml-5 max-md:w-full max-md:ml-0">
                    <span className="flex grow flex-col max-md:max-w-full max-md:mt-2">
                      <div className="self-stretch text-slate-900 text-base font-semibold leading-6 max-md:max-w-full">
                        {selectedBook?.bookTitle}
                      </div>
                      <div className="self-stretch text-slate-600 text-sm leading-5 mt-1 max-md:max-w-full">
                        by {selectedBook?.author}
                      </div>
                      <div className="text-slate-600 text-sm leading-5 self-stretch mt-2 max-md:max-w-full">
                        {selectedBook?.description}
                      </div>

                      {selectedBook?.rating ? (
                          <Rating rate={selectedBook?.rating} />
                      ) : (
                          <div className="text-blue-600 w-[8.5rem] mt-5">
                            No rating for book
                          </div>
                      )}
                    </span>
                  </div>
                </div>
              </div>
              <span className="items-stretch flex gap-2 mt-3 ml-[10rem] max-md:max-w-full max-md:flex-wrap">
                <div className="text-black text-sm leading-5 grow whitespace-nowrap">
                  {userData?.firstName} {userData?.lastName}
                </div>
                <div
                  className={`${selectedBook?.price === 0 ? "text-green-600 font-bold" : ""} text-black text-sm leading-5`}
                >
                  {selectedBook?.price === 0
                    ? "FREE"
                    : `₦${selectedBook?.price}`}
                </div>
                <div className="text-black text-sm leading-5">
                  {userData?.email}
                </div>
                <div className="text-black text-sm leading-5 grow whitespace-nowrap">
                  {formatDate(selectedBook?.dateCreated)}
                </div>
              </span>
              <div className="self-center flex items-stretch gap-4 ml-20">
                <span
                  className="transition hover:bg-red-600 cursor-pointer text-center text-white text-sm font-medium leading-5 uppercase whitespace-nowrap border bg-red-500 mt-4 px-5 py-4 rounded-md border-solid border-red-600 self-start max-md:px-5"
                  onClick={openModal}
                >
                  Delete Book
                </span>
                <Modal
                  isOpen={modalIsOpen}
                  ariaHideApp={false}
                  className="absolute w-[30%] bg-transparent border-none top-[20%] left-[35%] justify-center items-center"
                  onRequestClose={closeModal}
                  style={{
                    overlay: {
                      backgroundColor: "rgba(0, 0, 0, 0.5)",
                      zIndex: 1000,
                    },
                    content: {
                      maxWidth: "fit-content",
                      maxHeight: "fit-content",
                      margin: "auto",
                      background: "white",
                      borderRadius: "8px",
                      padding: "0",
                    },
                  }}
                >
                  <div className="justify-center shadow-lg bg-white flex max-w-[400px] flex-col py-5 rounded-xl items-end">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/81c2f27bcf96cd259caef0bbf69acd93889cc777b3fad5af7839f56613191486?"
                      className="cursor-pointer hover:scale-110 transition aspect-square object-contain object-center w-6 overflow-hidden max-w-full mr-6"
                      onClick={closeModal}
                    />
                    <span className="self-stretch flex w-full flex-col items-stretch mt-5 px-6">
                      <div className="text-gray-900 text-lg font-medium leading-7 whitespace-nowrap">
                        Do you want to delete Book?
                      </div>
                      <div className="text-gray-500 text-sm leading-5 mt-4">
                        Are you sure you want to delete this book? This action
                        cannot be undone.
                      </div>
                      <div className="items-stretch flex justify-between gap-3 mt-5">
                        <span
                          className="cursor-pointer hover:bg-gray-200 transition text-slate-700 text-base font-medium leading-6 whitespace-nowrap justify-center items-center border border-[color:var(--Gray-300,#D0D5DD)] shadow-sm bg-white grow px-16 py-2.5 rounded-lg border-solid"
                          onClick={closeModal}
                        >
                          No
                        </span>

                        <span
                          onClick={handleDeleteBook}
                          className="cursor-pointer hover:bg-red-700 transition text-white text-base font-medium leading-6 whitespace-nowrap justify-center items-stretch border shadow-sm bg-red-600 grow px-16 py-2.5 rounded-lg border-solid border-red-600"
                        >
                          {!clip ? (
                            "Delete"
                          ) : (
                            <ClipLoader
                              color="#FFFFFF"
                              loading={true}
                              size={20}
                            />
                          )}
                        </span>
                      </div>
                    </span>
                  </div>
                </Modal>

                <span
                  className={`transition ${isBookHidden || selectedBook?.hidden ? "hover:bg-green-600" : "hover:bg-yellow-600"} cursor-pointer text-center text-white text-sm font-medium leading-5 uppercase whitespace-nowrap border ${isBookHidden || selectedBook?.hidden ? "bg-green-500" : "bg-yellow-500"} mt-4 px-5 py-4 rounded-md border-solid ${isBookHidden || selectedBook?.hidden ? "border-green-600" : "border-yellow-600"} self-start max-md:px-5`}
                  onClick={() => handleHideBook(selectedBook?.id)}
                >
                  {isBookHidden || selectedBook?.hidden ? "Unhide Book" : "Hide Book"}
                </span>
                <span
                  className="transition hover:bg-green-600 cursor-pointer text-center text-white text-sm font-medium leading-5 uppercase whitespace-nowrap border bg-green-500 mt-4 px-5 py-4 rounded-md border-solid border-green-600 self-start max-md:px-5"
                  onClick={openModal1}
                >
                  Edit Book
                </span>
                <Modal
                  isOpen={modal1IsOpen}
                  ariaHideApp={false}
                  onRequestClose={closeModal1}
                  style={{
                    overlay: {
                      backgroundColor: "rgba(0, 0, 0, 0.5)",
                      zIndex: 1000,
                    },
                    content: {
                      maxWidth: "fit-content",
                      maxHeight: "90vh",
                      margin: "auto",
                      background: "white",
                      borderRadius: "8px",
                      padding: "0",
                    },
                  }}
                >
                  <EditBookModal
                    handleStatus={handleStatus}
                    setStatusTitle={setStatusTitle}
                    setStatusMessage={setStatusMessage}
                    setStatusColor={setStatusColor}
                    id={selectedBook?.id}
                    selectedBook={selectedBook} // Pass selectedBook as a prop
                    closeModal={closeModal1} // Pass the closeModal function
                  />
                </Modal>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

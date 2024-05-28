import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../../../api/axios.jsx";

export const SavedBooks = ({
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

  const navigate = useNavigate();

  const [isLast, setIsLast] = useState(false);

  const [page, setPage] = useState(0);

  const [savedBooks, setSavedBooks] = useState([]);

  const handleRemoveFromWishList = async (id) => {
    try {
      await axios
        .delete(`/book/save/remove/${id}`, {
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("userData")).accessToken}`,
          },
        })
        .then((response) => {
          console.log(response.data.responseMessage);

          enableStatus(
            "book remove Successful",
            "Book has been removed from saved successfully",
            "bg-green-600",
          );
        });
    } catch (error) {
      enableStatus(
        "Oops!",
        "Something went wrong please try again",
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
    const getSavedBooks = async () => {
      const response = await axios.get(
        `/book/saved-books?sortDir=desc&pageNo=${page}`,
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("userData")).accessToken}`,
          },
        },
      );

      setIsLast(response.data.responseData.last);
      setSavedBooks(response.data.responseData.content);
    };

    getSavedBooks();
  }, [handleRemoveFromWishList, page]);

  return (
    <>
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
            MY SAVED BOOKS
          </div>

          {savedBooks.map((book) => (
            <div className="self-stretch mt-6 max-md:max-w-full">
              <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
                <div className="flex flex-col items-stretch w-1/5 max-md:w-full max-md:ml-0">
                  <img
                    loading="lazy"
                    src={book?.bookCover}
                    className="aspect-[0.73] object-contain object-center w-[202px] shadow-lg overflow-hidden shrink-0 max-w-full grow max-md:mt-3"
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
                    <span className="items-stretch flex justify-between gap-5 mt-6 self-start max-md:max-w-full max-md:flex-wrap">
                      <Link
                        to={`/user-dashboard/book-details/${book?.id}`}
                        className="hover:bg-green-600 hover:text-white cursor-pointer text-green-500 text-base font-medium leading-5 uppercase justify-center items-stretch grow px-11 py-5 rounded-md border-[1.145px] border-solid border-green-600 max-md:px-5"
                      >
                        View Book
                      </Link>

                      <div
                        onClick={() => handleRemoveFromWishList(book?.id)}
                        className="hover:bg-red-600 hover:text-white cursor-pointer text-red-500 text-sm font-semibold leading-5 my-auto px-11 py-5 rounded-md border-[1.145px] border-solid border-red-600 max-md:px-5"
                      >
                        Remove From Wishlist
                      </div>
                    </span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </span>

        {savedBooks.length > 0 && (
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
    </>
  );
};

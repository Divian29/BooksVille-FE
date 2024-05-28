import { useState } from "react";
import axios from "../../../api/axios.jsx";
import { ClipLoader } from "react-spinners";

export const EditBookModal = ({
  handleStatus,
  setStatusTitle,
  setStatusMessage,
  setStatusColor,
  id,
  selectedBook, // Receive selectedBook as a prop
  closeModal, // Receive the closeModal function as a prop
}) => {
  const userData = JSON.parse(localStorage.getItem("userData"));

  const [clip, setClip] = useState(false);

  const enableStatus = (title, message, color) => {
    handleStatus();
    setStatusTitle(title);
    setStatusMessage(message);
    setStatusColor(color);
  };

  const [formData, setFormData] = useState({
    author: selectedBook?.author || "",
    bookTitle: selectedBook?.bookTitle || "",
    genre: selectedBook?.genre || "",
    description: selectedBook?.description || "",
    price: selectedBook?.price || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setClip(true);

      await axios.put(`/book/edit/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${userData.accessToken}`,
        },
      });

      setClip(false);

      enableStatus(
        "Book Update",
        "Your book has been successfully updated",
        "bg-green-600",
      );

      setTimeout(() => {
        closeModal(); // Close the modal
      }, 2500);
    } catch (error) {
      setClip(false);

      enableStatus(
        "Oops!",
        "Something went wrong, Book Update failed",
        "bg-red-600",
      );
    }
  };

  return (
    <>
      <div className="max-w-[50vw] px-5 mb-20 flex flex-col items-stretch max-md:w-full max-md:ml-0">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col px-5 w-full max-md:max-w-full"
        >
          <div className="flex w-[939px] max-w-full justify-between gap-5 mt-24 self-start items-start max-md:flex-wrap max-md:mt-10">
            <div className="items-center flex gap-3.5">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/131f617ee75381711670702d2a71c474f260aa77af8fbd89ccc65b8026bd3890?"
                className="aspect-[0.98] object-contain object-center w-[42px] overflow-hidden shrink-0 max-w-full my-auto"
              />
              <div className="text-zinc-900 text-4xl font-bold leading-[57.4px] self-stretch grow whitespace-nowrap">
                Edit Book
              </div>
            </div>
            <>
              <button
                style={!clip ? {} : { backgroundColor: "" }}
                type="submit"
                className={`hover:bg-green-600 hover:text-white cursor-pointer ${
                  !clip ? "" : "bg-green-500"
                } ${
                  !clip ? "text-green-500" : "text-white"
                } text-sm font-medium leading-5 tracking-[2px] uppercase whitespace-nowrap justify-center items-stretch border self-stretch px-4 py-3 rounded-md border-solid border-green-600`}
              >
                {!clip ? (
                  "Update Book"
                ) : (
                  <ClipLoader color="#FFFFFF" loading={true} size={20} />
                )}
              </button>
            </>
          </div>
          <label className="text-black text-2xl font-medium leading-8 mt-6 self-start max-md:max-w-full">
            Book Title
          </label>
          <input
            type="text"
            name="bookTitle"
            value={formData.bookTitle}
            onChange={handleChange}
            placeholder="To Kill a Mocking bird"
            className="text-black text-xs font-medium leading-4 tracking-wide whitespace-nowrap border-[color:var(--Gray-600,#757575)] w-[933px] max-w-full justify-center mt-2 pl-5 pr-16 py-5 rounded-md border-[1.694px] border-solid self-start items-start max-md:pr-5"
          />

          <label className="text-black text-2xl font-medium leading-8 mt-6 self-start max-md:max-w-full">
            Book Author
          </label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="Harper Lee"
            className="text-black text-xs font-medium leading-4 tracking-wide whitespace-nowrap border-[color:var(--Gray-600,#757575)] w-[933px] max-w-full justify-center mt-2 pl-5 pr-16 py-5 rounded-md border-[1.694px] border-solid self-start items-start max-md:pr-5"
          />

          <div className="w-full flex gap-5 mt-6">
            <div className="w-[50%]">
              <div>
                <label className="text-black text-2xl font-medium leading-8 mt-6 self-start max-md:max-w-full">
                  Book Price
                </label>
              </div>

              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="1000"
                className="text-black text-xs font-medium leading-4 tracking-wide whitespace-nowrap border-[color:var(--Gray-600,#757575)] w-full justify-center mt-2 pl-5 pr-16 py-5 rounded-md border-[1.694px] border-solid self-start items-start max-md:pr-5"
              />
            </div>

            <div className="w-[50%]">
              <div>
                <label className="text-black text-2xl font-medium leading-8 mt-6 self-start max-md:max-w-full">
                  Book Genre
                </label>
              </div>

              <select
                id="genre"
                name="genre"
                value={formData.genre}
                onChange={handleChange}
                className="text-black text-xs font-medium leading-4 tracking-wide whitespace-nowrap border-[color:var(--Gray-600,#757575)] w-full justify-center mt-2 pl-5 pr-16 py-5 rounded-md border-[1.694px] border-solid self-start items-start max-md:pr-5"
              >
                <option value="" disabled>
                  Select a Genre
                </option>
                <option value="ADVENTURE">Adventure</option>
                <option value="FANTASY">Fantasy</option>
                <option value="HORROR">Horror</option>
                <option value="MUSICAL">Musical</option>
                <option value="NON_FICTION">Non Fiction</option>
                <option value="ROMANCE">Romance</option>
                <option value="SPIRITUAL">Spiritual</option>
              </select>
            </div>
          </div>

          <label className="text-black text-2xl font-medium leading-8 mt-6 self-start max-md:max-w-full">
            Book Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Book's description..."
            className="text-black text-xs font-medium leading-7 tracking-wide items-stretch border-[color:var(--Gray-600,#757575)] w-[933px] max-w-full mt-2 pl-5 pr-2 pt-1.5 pb-11 rounded-md border-[1.694px] border-solid self-start max-md:max-w-full"
          />
        </form>
      </div>
    </>
  );
};

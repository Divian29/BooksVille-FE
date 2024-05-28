import { MyBookCard } from "./MyBookCard.jsx";
import { BookCard } from "../landing/BookCard.jsx";
import { useEffect, useState } from "react";
import axios from "../../../api/axios.jsx";
import { Link } from "react-router-dom";

export const MyBooks = ({recommended}) => {
  const [savedBooks, setSavedBooks] = useState([]);
  const [purchasedBooks, sePurchasedBooks] = useState([]);

  useEffect(() => {
    const getSavedBooks = async () => {
      const response = await axios.get("/book/saved-books?sortDir=desc", {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("userData")).accessToken}`,
        },
      });

      setSavedBooks(response.data.responseData.content);
    };

    const getPurchasedBooks = async () => {
      const response = await axios.get("/book/purchased?sortDir=desc", {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("userData")).accessToken}`,
        },
      });

      sePurchasedBooks(response.data.responseData.content);
    };

    getSavedBooks();
    getPurchasedBooks();
  }, []);

  return (
    <div className="flex flex-col max-w-[1297px] mb-5 mx-auto items-stretch max-md:mt-40">
      <div className="text-black text-6xl mt-9 md:mt-[4.5rem] mb-8 md:mb-[2rem] w-fit font-bold leading-[81.2px] tracking-tight max-md:text-4xl">
        Welcome {JSON.parse(localStorage.getItem("userData")).firstName},
      </div>
      <div className="items-stretch flex w-full justify-between mt-10 gap-5 max-md:max-w-full max-md:flex-wrap">
        <div className="text-black text-4xl font-medium leading-7 tracking-wider grow shrink basis-auto max-md:max-w-full">
          Your Purchased Books
        </div>
        <Link
          to={"/user-dashboard/purchased-books"}
          className="hover:text-blue-500 transition cursor-pointer text-black text-base font-bold leading-7"
        >
          View all
        </Link>
      </div>
      <div className="w-full max-md:max-w-full max-md:mt-10">
        <div className="gap-5 flex flex-col md:flex-row max-md:flex-col max-md:items-stretch max-md:gap-0">
          {purchasedBooks.slice(0, 4).map((book, index) => (
            <MyBookCard
              key={index}
              image={book.bookCover}
              name={book.bookTitle}
              author={book.author}
              price={book.price}
            />
          ))}
        </div>
      </div>
      <div className="items-stretch flex w-full justify-between gap-5 mt-10 md:mt-20 max-md:max-w-full max-md:flex-wrap max-md:mt-10">
        <div className="text-black text-4xl font-semibold leading-7 tracking-widest grow shrink basis-auto">
          Your Saved Books
        </div>
        <Link
          to={"/user-dashboard/saved-books"}
          className="hover:text-blue-500 transition text-black text-base font-semibold leading-7"
        >
          View All{" "}
        </Link>
      </div>
      <div className="w-full max-md:max-w-full max-md:mt-10">
        <div className="gap-5 flex flex-col md:flex-row max-md:flex-col max-md:items-stretch max-md:gap-0">
          {savedBooks.slice(0, 4).map((book, index) => (
            <BookCard
              key={index}
              bookId={book.id}
              image={book.bookCover}
              name={book.bookTitle}
              author={book.author}
              price={book.price}
            />
          ))}
        </div>
      </div>
      <div className="items-stretch flex w-full justify-between gap-5 mt-10 md:mt-20 max-md:max-w-full max-md:flex-wrap max-md:mt-10">
        <div className="text-black text-4xl font-semibold leading-7 tracking-widest grow shrink basis-auto">
          Recommended Books
        </div>
        <div className="text-black text-base font-semibold leading-7">
          Read More{" "}
        </div>
      </div>
      <div className="w-full mt-4 md:mt-7 max-md:max-w-full max-md:mt-10">
        <div className="gap-5 flex flex-col md:flex-row max-md:flex-col max-md:items-stretch max-md:gap-0">

          {recommended?.map(
              (book, index) => (
                  <BookCard
                      key={index}
                      bookId={book.id}
                      image={book.bookCover}
                      name={book.bookTitle}
                      author={book.author}
                      price={book.price}
                  />
              )
          )}

        </div>
      </div>
    </div>
  );
};

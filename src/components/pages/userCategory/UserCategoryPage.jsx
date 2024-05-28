import { Filters } from "./Filters.jsx";
import { useEffect, useState } from "react";
import axios from "../../../api/axios.jsx";
import { BookDisplayCard } from "./comps/BookDisplayCard.jsx";

export const UserCategoryPage = () => {
  const [dep, setDep] = useState(false);

  const [isLast, setIsLast] = useState(false);

  const [page, setPage] = useState(0);

  const [books, setBooks] = useState([]);

  const [filterData, setFilterData] = useState({
    FANTASY: "",
    ROMANCE: "",
    NON_FICTION: "",
    ADVENTURE: "",
    HORROR: "",
    MUSICAL: "",
    SPIRITUAL: "",
    rating: "",
    budget: "",
  });

  useEffect(() => {
    const url1 = `/book/books?pageNo=${page}`;
    const url2 = `/book/filter?genre=${filterData?.FANTASY}&genre2=${filterData?.ROMANCE}&genre3=${filterData?.NON_FICTION}&genre4=${filterData?.ADVENTURE}&genre5=${filterData?.HORROR}&genre6=${filterData?.MUSICAL}&genre7=${filterData?.SPIRITUAL}`;
    const rateUrl = `/filter/books/rating?rating=${filterData?.rating}`;

    if (
      filterData?.FANTASY.length === 0 &&
      filterData?.ROMANCE.length === 0 &&
      filterData?.NON_FICTION.length === 0 &&
      filterData?.ADVENTURE.length === 0 &&
      filterData?.HORROR.length === 0 &&
      filterData?.MUSICAL.length === 0 &&
      filterData?.SPIRITUAL.length === 0 &&
      filterData?.rating.length === 0 &&
      filterData?.budget.length === 0
    ) {
      const loadBooks = async () => {
        const response = await axios.get(`${url1}`);

        setBooks(response.data.responseData.content);
        setIsLast(response.data.responseData.last);
      };

      loadBooks();
    } else if (
      filterData?.FANTASY.length === 0 &&
      filterData?.ROMANCE.length === 0 &&
      filterData?.NON_FICTION.length === 0 &&
      filterData?.ADVENTURE.length === 0 &&
      filterData?.HORROR.length === 0 &&
      filterData?.MUSICAL.length === 0 &&
      filterData?.SPIRITUAL.length === 0 &&
      filterData?.budget.length === 0 &&
      filterData?.rating.length !== 0
    ) {
      const loadRateFilteredBooks = async () => {
        const response = await axios.get(`${rateUrl}`);

        setBooks(response.data.responseData.content);
        setIsLast(response.data.responseData.last);
      };

      loadRateFilteredBooks();
    } else if (
      filterData?.FANTASY.length === 0 &&
      filterData?.ROMANCE.length === 0 &&
      filterData?.NON_FICTION.length === 0 &&
      filterData?.ADVENTURE.length === 0 &&
      filterData?.HORROR.length === 0 &&
      filterData?.MUSICAL.length === 0 &&
      filterData?.SPIRITUAL.length === 0 &&
      filterData?.rating.length === 0 &&
      filterData?.budget.length !== 0
    ) {
      const loadRateFilteredBooks = async () => {
        const response = await axios.get("/book");

        if (filterData?.budget === "1") {
          setBooks(
            response.data.responseData.filter((book) => book.price < 10000),
          );
        } else if (filterData?.budget === "2") {
          setBooks(
            response.data.responseData.filter(
              (book) => book.price >= 10000 && book.price < 20000,
            ),
          );
        } else if (filterData?.budget === "3") {
          setBooks(
            response.data.responseData.filter(
              (book) => book.price >= 20000 && book.price < 25000,
            ),
          );
        } else {
          setBooks(
            response.data.responseData.filter((book) => book.price >= 25000),
          );
        }
      };

      loadRateFilteredBooks();
    } else if (
      filterData?.FANTASY.length === 0 &&
      filterData?.ROMANCE.length === 0 &&
      filterData?.NON_FICTION.length === 0 &&
      filterData?.ADVENTURE.length === 0 &&
      filterData?.HORROR.length === 0 &&
      filterData?.MUSICAL.length === 0 &&
      filterData?.SPIRITUAL.length === 0 &&
      filterData?.rating.length !== 0 &&
      filterData?.budget.length !== 0
    ) {
      const loadRateFilteredBooks = async () => {
        const response = await axios.get("/book");

        if (filterData?.budget === "1") {
          setBooks(
            response.data.responseData.filter(
              (book) => book.price < 10000 && book.rating == filterData?.rating,
            ),
          );
        } else if (filterData?.budget === "2") {
          setBooks(
            response.data.responseData.filter(
              (book) =>
                book.price >= 10000 &&
                book.price < 20000 &&
                book.rating == filterData?.rating,
            ),
          );
        } else if (filterData?.budget === "3") {
          setBooks(
            response.data.responseData.filter(
              (book) =>
                book.price >= 20000 &&
                book.price < 25000 &&
                book.rating == filterData?.rating,
            ),
          );
        } else {
          setBooks(
            response.data.responseData.filter(
              (book) =>
                book.price >= 25000 && book.rating == filterData?.rating,
            ),
          );
        }
      };

      loadRateFilteredBooks();
    } else {
      if (filterData?.rating.length !== 0 && filterData?.budget.length !== 0) {
        const loadBooksFilteredWithRating = async () => {
          const response = await axios.get(`${url2}`);

          if (filterData?.budget === "1") {
            setBooks(
              response.data.responseData.filter(
                (book) =>
                  book.price < 10000 && book.rating == filterData?.rating,
              ),
            );
          } else if (filterData?.budget === "2") {
            setBooks(
              response.data.responseData.filter(
                (book) =>
                  book.price >= 10000 &&
                  book.price < 20000 &&
                  book.rating == filterData?.rating,
              ),
            );
          } else if (filterData?.budget === "3") {
            setBooks(
              response.data.responseData.filter(
                (book) =>
                  book.price >= 20000 &&
                  book.price < 25000 &&
                  book.rating == filterData?.rating,
              ),
            );
          } else {
            setBooks(
              response.data.responseData.filter(
                (book) =>
                  book.price >= 25000 && book.rating == filterData?.rating,
              ),
            );
          }
        };

        loadBooksFilteredWithRating();
      } else if (filterData?.rating.length !== 0) {
        const loadBooksFilteredWithRating = async () => {
          const response = await axios.get(`${url2}`);

          setBooks(
            response.data.responseData.filter(
              (book) => book.rating == filterData?.rating,
            ),
          );
        };

        loadBooksFilteredWithRating();
      } else if (filterData?.budget.length !== 0) {
        const loadBooksFilteredWithRating = async () => {
          const response = await axios.get(`${url2}`);

          if (filterData?.budget === "1") {
            setBooks(
              response.data.responseData.filter((book) => book.price < 10000),
            );
          } else if (filterData?.budget === "2") {
            setBooks(
              response.data.responseData.filter(
                (book) => book.price >= 10000 && book.price < 20000,
              ),
            );
          } else if (filterData?.budget === "3") {
            setBooks(
              response.data.responseData.filter(
                (book) => book.price >= 20000 && book.price < 25000,
              ),
            );
          } else {
            setBooks(
              response.data.responseData.filter((book) => book.price >= 25000),
            );
          }
        };

        loadBooksFilteredWithRating();
      } else {
        const loadBooksFiltered = async () => {
          const response = await axios.get(`${url2}`);

          setBooks(response.data.responseData);
        };

        loadBooksFiltered();
      }
    }
  }, [page, dep]);

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

  return (
    <div className="bg-white mt-[3.6rem] flex flex-col items-stretch h-fit overflow-hidden max-md:mt-40">
      <div className="flex w-full flex-col items-stretch px-16 max-md:max-w-full max-md:mt-10 max-md:px-5">
        <div className="text-black text-6xl mb-[1rem] w-fit font-bold leading-[81.2px] tracking-tight max-md:text-4xl">
          Explore all Deals
        </div>
        <div className="max-md:max-w-full">
          <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
            <div className="max-h-[38rem] overflow-auto h-fit flex flex-col items-stretch w-[22%] max-md:w-full max-md:ml-0">
              <Filters
                setFilterData={setFilterData}
                setDep={() => setDep(!dep)}
              />
            </div>

            <div className="flex flex-col h-[75vh] overflow-auto items-stretch w-[78%] ml-5 max-md:w-full max-md:ml-0">
              <div className="flex grow flex-col max-md:max-w-full max-md:mt-5">
                <div className="items-stretch flex w-[66px] max-w-full gap-2 mr-28 self-end max-md:mr-2.5">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/a201f9390a9c08c0bc5f61c075ba5ff03858958083aa5dd21ae172881481277c?"
                    className="aspect-square object-contain object-center w-full overflow-hidden shrink-0 flex-1"
                  />
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/ccdaccc5c0abec7567e5d2b41ef8ad8064ea019014d0bb446df45ca0ec70abc1?"
                    className="aspect-square object-contain object-center w-full overflow-hidden shrink-0 flex-1"
                  />
                </div>

                <>
                  {books.map((book) => (
                    <BookDisplayCard key={book.id} book={book} />
                  ))}
                </>

                {books.length > 0 && books.length === 5 && (
                  <div className="flex gap-4 justify-end mb-5">
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
          </div>
        </div>
      </div>
    </div>
  );
};

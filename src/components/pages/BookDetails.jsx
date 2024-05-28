import { useEffect, useState } from "react";
import { PaymentOptions } from "../payment/PaymentOptions.jsx";
import Modal from "react-modal";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../api/axios.jsx";
import { Rating } from "../../utils/Rating.jsx";
import { Rate } from "../../utils/Rate.jsx";
import { RateCard } from "../../utils/RateCard.jsx";
import { useData } from "../../hooks/useData.js";
import { useConfig } from "../../hooks/useConfig.js";
import { DownloadAndReadOnline } from "../../utils/DownloadAndReadOnline.jsx";

export const BookDetails = ({
  handleStatus,
  setStatusTitle,
  setStatusMessage,
  setStatusColor,
}) => {
  const { userData, subscription } = useData();

  const [rate, setRate] = useState(false);

  const [dep, setDep] = useState(false);

  const [rateDep, setRateDep] = useState(false);

  const [rates, setRates] = useState([]);

  let chooseRate = 1;

  const handleDep = () => {
    setDep(!dep);
  };

  const handleShowRate = () => {
    setRate(!rate);
  };

  const [formData, setFormData] = useState({
    rating: "",
    review: "",
  });

  const handleChooseRate = (rate) => {
    chooseRate = rate;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [viewedBook, setViewedBook] = useState();

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    if (!userData) {
      navigate("/login");
    }
    const fetchBook = () => {
      axios
        .get(`/book/get-book/${id}`, useConfig())
        .then((response) => {
          console.log(subscription);
          setViewedBook(response.data.responseData);
        })
        .catch((error) => {
          console.log(error.message);
          navigate("/login");
        });
    };

    fetchBook();
  }, [dep]);

  useEffect(() => {
    const fetchRatingsAndComments = () => {
      axios
        .get(`ratings/${id}`, {
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("userData")).accessToken}`,
          },
        })
        .then((response) => setRates(response.data.responseData.content))
        .catch((error) => console.log(error.message));
    };

    fetchRatingsAndComments();
  }, [rateDep]);

  const enableStatus = (title, message, color) => {
    handleStatus();
    setStatusTitle(title);
    setStatusMessage(message);
    setStatusColor(color);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDownloadClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleSaveBook = async (e) => {
    e.preventDefault();

    try {
      await axios.get(`/book/save/${id}`, useConfig()).then((response) => {
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

  const handleAddToCart = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("id", id);

    try {
      await axios
        .post("/cart/addToCart", formData, {
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("userData")).accessToken}`,
          },
        })
        .then((response) => {
          console.log(response.data.responseData);

          if (response.data.responseMessage === "alreadyAdded") {
            enableStatus(
              "Already added",
              "Book has already been added to Cart",
              "bg-red-300",
            );
          } else {
            enableStatus(
              "Add to Cart Successful",
              "Book has been added to cart successfully",
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

  const handleRate = async (e) => {
    e.preventDefault();

    const review = formData.review;

    const data = {
      rating: `${chooseRate}`,
      review: `${review}`,
    };

    try {
      await axios
        .post(`/ratings/rate/${id}`, data, {
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("userData")).accessToken}`,
          },
        })
        .then((response) => {
          console.log(response.data.responseMessage);

          enableStatus(
            "Rating successful",
            `${response.data.responseMessage}`,
            "bg-green-500",
          );

          setRateDep(!rateDep);
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
    <div className="max-md:mt-40">
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
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
          book={viewedBook}
          handleStatus={handleStatus}
          setStatusTitle={setStatusTitle}
          setStatusMessage={setStatusMessage}
          setStatusColor={setStatusColor}
          handleBuy={handleCloseModal}
          dep={handleDep}
        />
      </Modal>

      <div className="bg-white flex flex-col items-stretch pb-12 mt-8">
        <span
          onClick={handleGoBack}
          className="cursor-pointer mt-10 px-16 transition hover:scale-105 items-stretch flex gap-2 self-start"
        >
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/05c93399f1248fc1de27bab921526a1825a15da2fa4d259f0e0f0ad954105612?"
            className="aspect-square object-contain object-center w-6 overflow-hidden shrink-0 max-w-full"
          />
          <div className="text-gray-900 text-base font-semibold leading-6 tracking-normal grow whitespace-nowrap self-start">
            Go back
          </div>
        </span>

        <span className="flex w-full flex-col mt-8 px-16 max-md:max-w-full max-md:mt-10 max-md:px-5">
          <span className="items-stretch flex gap-1 self-start">
            <span className="text-black text-xl font-medium leading-7 whitespace-nowrap items-stretch aspect-[2.0357142857142856] justify-center">
              Home
            </span>
            <div className="text-black text-xl font-medium leading-7">/</div>
            <span className="text-black text-xl font-medium leading-7 whitespace-nowrap items-stretch aspect-[2.3214285714285716] justify-center">
              {viewedBook?.genre}
            </span>
            <div className="text-black text-xl font-medium leading-7">/</div>
            <span className="text-stone-300 text-xl font-medium leading-7 whitespace-nowrap items-stretch grow justify-center">
              {viewedBook?.bookTitle}
            </span>
          </span>

          <div className="self-stretch mt-5 max-md:max-w-full">
            <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
              <div className="flex flex-col items-stretch max-md:w-full max-md:ml-0">
                <div className="justify-center shadow-sm bg-slate-50 flex grow flex-col w-fit items-start max-md:max-w-full max-md:mt-5 max-md:pr-5">
                  <img
                    loading="lazy"
                    srcSet={viewedBook?.bookCover}
                    className="aspect-[0.75] object-contain object-center w-[302px] overflow-hidden max-w-full"
                  />
                </div>
              </div>
              <div className="flex flex-col items-stretch w-[67%] max-md:w-full max-md:ml-0">
                <span className="justify-center items-stretch flex grow flex-col mt-1.5 max-md:max-w-full max-md:mt-7">
                  <div className="text-neutral-800 text-3xl font-bold leading-10 max-md:max-w-full">
                    {viewedBook?.bookTitle}
                  </div>
                  <div className="text-black text-2xl leading-9 mt-6 max-md:max-w-full">
                    by <span className="text-black">{viewedBook?.author}</span>
                  </div>
                  <div className="text-black text-base font-light leading-7 mt-6 max-md:max-w-full">
                    {viewedBook?.description}
                  </div>
                  <div className="text-red-700 text-sm leading-7 max-md:max-w-full">
                    Read more
                  </div>
                  <div className="text-neutral-500 text-xl leading-7 mt-4">
                    {viewedBook?.genre}
                  </div>
                  <div className="text-black text-2xl font-bold leading-8 mt-4 max-md:max-w-full">
                    {viewedBook?.price === 0 ? "FREE" : viewedBook?.price}
                  </div>

                  {subscription.length > 0 ||
                  viewedBook?.isPurchased ||
                  viewedBook?.price === 0 ? (
                    <DownloadAndReadOnline
                      book={viewedBook}
                      handleStatus={handleStatus}
                      setStatusColor={setStatusColor}
                      setStatusMessage={setStatusMessage}
                      setStatusTitle={setStatusTitle}
                      subscription={subscription}
                      isPurchased={viewedBook?.isPurchased}
                      dep={handleDep}
                    />
                  ) : (
                    <span className="flex gap-2 mt-4 items-start max-md:max-w-full max-md:flex-wrap max-md:mr-2.5 max-md:pr-5">
                      <span
                        onClick={handleDownloadClick}
                        className="transition hover:bg-green-700 cursor-pointer max-w-[12.7rem] h-[3.8rem] text-center py-[1.2rem] text-white text-base font-medium leading-5 uppercase justify-center items-stretch bg-green-600 grow rounded-md border-[1.145px] border-solid border-green-600 max-md:px-5"
                      >
                        BUY NOW
                      </span>
                      <span
                        onClick={handleAddToCart}
                        className="hover:bg-gray-200 transition cursor-pointer  max-w-[12.7rem] h-[3.8rem] text-center py-[1.2rem] text-green-600 text-base font-medium leading-5 uppercase justify-center items-stretch self-stretch grow rounded-md border-[1.174px] border-solid border-green-600 max-md:px-5"
                      >
                        ADD TO CART
                      </span>
                      <div
                        onClick={handleSaveBook}
                        className="transition hover:border-solid hover:border-green-600 cursor-pointer max-w-[12.7rem] h-[3.8rem] text-center py-[1.2rem] text-rose-500 text-base font-medium leading-5 uppercase justify-center items-stretch self-stretch grow rounded-md max-md:px-5 border-[1.174px] border-white"
                      >
                        ADD TO SAVED
                      </div>
                    </span>
                  )}
                </span>
              </div>
            </div>
          </div>

          <div className="text-neutral-800 text-3xl font-bold leading-10 self-stretch mt-20 max-md:max-w-full max-md:mt-10">
            Reviews and Ratings
          </div>
          <div className="bg-gray-200 self-stretch w-full shrink-0 h-[3px] mt-3" />
          <div className="flex justify-between gap-3.5 ml-4 mt-5 self-start items-start max-md:max-w-full max-md:flex-wrap">
            <span className="items-stretch self-center flex basis-[0%] flex-col my-auto">
              <div className="text-neutral-800 text-base leading-6 whitespace-nowrap">
                Overall Rating
              </div>

              {viewedBook?.rating ? (
                <div className="text-neutral-800 text-base leading-6 mt-6">
                  {viewedBook?.rating} out of 5
                </div>
              ) : (
                ""
              )}

              {viewedBook?.rating ? (
                <Rating rate={viewedBook?.rating} />
              ) : (
                <div className="text-blue-600 w-[8.5rem] mt-5">
                  No rating for book
                </div>
              )}
            </span>

            {rate && (
              <div className="ml-5 bg-gray-200 w-px shrink-0 h-[157px]" />
            )}

            <form onSubmit={handleRate} className="flex gap-5">
              {rate && (
                <div className="self-center flex grow basis-[0%] flex-col items-stretch my-auto">
                  <span className="items-stretch w-[30vw] self-center flex grow basis-[0%] flex-col my-auto">
                    <div className="flex gap-5 font-bold items-center">
                      <p>Your Rating: </p>
                      <Rate handleChooseRate={handleChooseRate} />
                    </div>

                    <textarea
                      name="review"
                      value={formData.review}
                      onChange={handleChange}
                      placeholder="Write your review... "
                      className="transition bg-white text-black text-base font-medium leading-5 whitespace-nowrap justify-center items-stretch mt-2.5 px-4 py-5 rounded-md border-[1.11px] border-solid border-green-600"
                    />
                  </span>
                </div>
              )}

              <div className="bg-gray-200 w-0.5 shrink-0 h-[157px]" />

              {!rate && (
                <div className="self-center flex grow basis-[0%] flex-col items-stretch my-auto">
                  <span className="items-stretch self-center flex grow basis-[0%] flex-col my-auto">
                    <div className="text-neutral-800 text-base leading-6 whitespace-nowrap">
                      Share your thoughts here
                    </div>
                    <span
                      onClick={handleShowRate}
                      className="transition hover:bg-green-700 cursor-pointer text-white text-base font-medium leading-5 uppercase whitespace-nowrap justify-center items-stretch bg-green-600 mt-2.5 px-4 py-5 rounded-md border-[1.11px] border-solid border-green-600"
                    >
                      Rate and Review
                    </span>
                  </span>
                </div>
              )}

              {rate && (
                <div className="self-center flex grow basis-[0%] flex-col items-stretch my-auto">
                  <span className="items-stretch self-center flex grow basis-[0%] flex-col my-auto">
                    <div className="text-neutral-800 text-base leading-6 whitespace-nowrap">
                      Click to rate
                    </div>
                    <button
                      type="submit"
                      className="text-center transition hover:bg-green-700 cursor-pointer text-white text-base font-medium leading-5 uppercase whitespace-nowrap justify-center items-stretch bg-green-600 mt-2.5 px-4 py-5 rounded-md border-[1.11px] border-solid border-green-600"
                    >
                      Rate
                    </button>
                  </span>
                </div>
              )}
            </form>
          </div>
          <div className="text-neutral-800 text-sm font-medium leading-5 self-stretch mt-12 max-md:max-w-full max-md:mt-10">
            All Book Reviews
          </div>
          <div className="bg-gray-200 self-stretch w-full shrink-0 h-1 mt-3.5" />

          {rates.map((rating) => (
            <RateCard key={rating.id} rate={rating.rating} rating={rating} />
          ))}
        </span>
      </div>
    </div>
  );
};

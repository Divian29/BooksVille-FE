import { useEffect, useState } from "react";
import Modal from "react-modal";
import image1 from "../../../assets/images/landingPageImages/img_1.png";
import image2 from "../../../assets/images/landingPageImages/img_2.png";
import image3 from "../../../assets/images/landingPageImages/img_3.png";
import image4 from "../../../assets/images/landingPageImages/img_4.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../../api/axios";
import { CheckoutPayment } from "../../payment/CheckoutPayment.jsx";
import {useConfig} from "../../../hooks/useConfig.js";
import {AlreadyPurchasedBooks} from "../../../utils/AlreadyPurchasedBooks.jsx";
import {BookCard} from "../landing/BookCard.jsx";

export const Checkout = ({
  recommended,
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

  const [totalPrice, setTotalPrice] = useState();

  const [dep, setDep] = useState(false);

  const [cart, setCart] = useState([]);

  const [alreadyPurchased, setAlreadyPurchased] = useState([])

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [purchasedModal, setPurchasedModal] = useState(false)

  const navigate = useNavigate();

  const handleDep = () => {
    setDep(!dep);
  };

  const handleDownloadClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAlreadyPurchasedClose = () => {
    setPurchasedModal(false)
  }

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleRemoveFromCart = async (id) => {
    try {
      await axios
        .delete(`/cart/removeFromCart/${id}`, {
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("userData")).accessToken}`,
          },
        })
        .then((response) => {
          console.log(response.data.responseMessage);
          setDep(!dep);
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const getCartContent = async () => {
      const response = await axios.get("/cart", {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("userData")).accessToken}`,
        },
      });

      setCart(response.data.responseData);

      let price = 0;

      response.data.responseData.map((data) => {
        price += data.price;
      });

      setTotalPrice(price);

      console.log(response.data.responseData);
    };

    getCartContent();
  }, [dep]);

  useEffect(() => {
    const getAlreadyPurchasedBooks = async () => {
      const response =  await axios.get("/cart/already-purchased", useConfig())

      setAlreadyPurchased(response.data.responseData)
      setPurchasedModal(response.data.responseData.length > 0)
    }

    getAlreadyPurchasedBooks()
  }, [dep]);


  const handleAddToCart = async (id) => {

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

            handleDep()
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
    <>
      <div className="bg-white flex flex-col items-stretch pb-3 max-md:mt-40">
        <span className="flex w-full flex-col mt-4 md:mt-[4rem] px-16 max-md:px-5">
          <span
            onClick={handleGoBack}
            className="cursor-pointer hover:scale-105 transition items-stretch flex gap-2 self-start"
          >
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/c8ab344b5648a3c5f083d2c3c5742c3e42e45fbb8e112879cda83205c8b5f6d1?"
              className="aspect-square object-contain object-center w-6 overflow-hidden shrink-0 max-w-full"
            />
            <div className="text-gray-900 text-base font-semibold leading-6 tracking-normal grow whitespace-nowrap self-start">
              Go back
            </div>
          </span>
          <div className="self-stretch mt-8 max-md:max-w-full">
            <div className="text-black text-2xl font-semibold leading-8 max-w-[177px]">
              YOUR CART ({cart?.length})
            </div>
            <div className="gap-5 flex flex-col md:flex-row max-md:flex-col max-md:items-stretch max-md:gap-0">
              <div className="flex flex-col items-stretch w-full md:w-[65%] md:ml-0">
                <span className="flex flex-col items-stretch mt-16 md:mt-10 max-md:max-w-full">
                  {cart.map((book) => (
                    <div className="pr-3 items-center flex gap-2 mt-3 max-md:max-w-full max-md:flex-wrap">
                      <img
                        loading="lazy"
                        src={book?.bookCover}
                        className="aspect-[0.78] object-contain object-center w-[5rem] overflow-hidden shrink-0 max-w-full"
                      />
                      <span className="items-center self-center flex w-full justify-between gap-5 my-auto max-md:max-w-full max-md:flex-wrap">
                        <span className="items-stretch flex grow basis-[0%] flex-col">
                          <div className="text-neutral-800 text-base font-bold leading-6">
                            {book?.bookTitle}
                          </div>
                          <div className="text-neutral-500 text-sm leading-5 mt-2">
                            by {book?.author}
                          </div>
                          <div
                            onClick={() => handleRemoveFromCart(book?.id)}
                            className="cursor-pointer hover:text-red-700 w-fit transition text-red-500 text-l font-medium leading-10"
                          >
                            Remove
                          </div>
                        </span>
                        <div className="text-black text-center text-base font-medium leading-6 tracking-normal self-center whitespace-nowrap my-auto">
                          N{book?.price}
                        </div>
                      </span>
                    </div>
                  ))}
                  <div className="bg-zinc-100 flex shrink-0 h-px flex-col mt-2 max-md:max-w-full" />
                  <Link to={"/user-dashboard/categories"} className="w-fit hover:text-green-700 text-green-500 text-sm leading-5 tracking-tighter mt-3.5 max-md:max-w-full">
                    CONTINUE SHOPPING
                  </Link>
                </span>
              </div>

              <div className="flex flex-col items-stretch w-full md:w-[35%] ml-5 md:ml-0">
                <span className="items-stretch border border-[color:var(--Green-2,#27AE60)] bg-white flex w-full grow flex-col mx-auto pt-7 pb-12 px-8 border-solid md:mt-10 max-md:px-5">
                  <div className="text-black text-3xl font-bold leading-10 tracking-wide">
                    Order Summary
                  </div>
                  {cart.map((book) => (
                    <span className="items-stretch flex justify-between gap-5 mt-6">
                      <div className="text-black text-base font-medium leading-6 tracking-normal">
                        {book?.bookTitle}
                      </div>
                      <div className="text-black text-base font-medium leading-6 tracking-normal">
                        {book?.price}
                      </div>
                    </span>
                  ))}
                  <div className="bg-gray-200 shrink-0 h-[3px] mt-6" />
                  <span className="items-stretch flex justify-between gap-5 mt-6">
                    <div className="text-black text-base font-medium leading-6 tracking-normal">
                      Promo Code
                    </div>
                    <div className="text-black text-base font-medium leading-6 tracking-normal">
                      10%OFF
                    </div>
                  </span>
                  <div className="bg-gray-200 shrink-0 h-[3px] mt-6" />
                  <span className="items-stretch flex justify-between gap-5 mt-6">
                    <div className="text-green-500 text-base font-medium leading-6 tracking-normal">
                      Total
                    </div>
                    <div className="text-black text-base font-medium leading-6 tracking-normal">
                      {totalPrice}
                    </div>
                  </span>
                  {totalPrice < 1 ? (
                    <Link
                      to="/user-dashboard/categories"
                      className="cursor-pointer hover:bg-blue-600 transition text-white text-sm text-center font-semibold leading-5 whitespace-nowrap justify-center items-center bg-blue-500 mt-12 mb-11 px-16 py-3 rounded-xl max-md:my-10 max-md:px-5"
                    >
                      GO SHOPPING
                    </Link>
                  ) : (
                    <span
                      className="cursor-pointer hover:bg-green-600 transition text-white text-sm text-center font-semibold leading-5 whitespace-nowrap justify-center items-center bg-green-500 mt-12 mb-11 px-16 py-3 rounded-xl max-md:my-10 max-md:px-5"
                      onClick={handleDownloadClick}
                    >
                      CHECKOUT
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
                        maxWidth: "592px",
                        maxHeight: "500px",
                        margin: "auto",
                        background: "white",
                        borderRadius: "8px",
                        padding: "0px",
                      },
                    }}
                  >
                    <CheckoutPayment
                      handleBuy={handleCloseModal}
                      handleStatus={handleStatus}
                      setStatusTitle={setStatusTitle}
                      setStatusMessage={setStatusMessage}
                      setStatusColor={setStatusColor}
                      books={cart}
                      totalPrice={totalPrice}
                      dep={handleDep}
                    />
                  </Modal>



                  <Modal
                      isOpen={purchasedModal}
                      onRequestClose={handleAlreadyPurchasedClose}
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
                    <AlreadyPurchasedBooks
                      alreadyPurchasedBooks={alreadyPurchased}
                      dep={handleDep}
                    />
                  </Modal>
                </span>
              </div>
            </div>
          </div>
          <div className="text-black text-center text-2xl font-semibold leading-8 self-center mt-5">
            YOU MIGHT ALSO LIKE
          </div>
          <div className="self-center w-full max-w-[1120px] mt-8 px-2 py-2.5 max-md:pr-5">
            <div className="gap-5 flex flex-col md:flex-row max-md:flex-col max-md:items-stretch max-md:gap-0">

              {recommended?.map(
                  (book, index) => (
                      <div key={index} className="flex flex-col items-stretch max-w-[15rem] md:w-[25%] md:ml-0 mb-5 md:mb-0">
                        <span className="justify-center items-stretch shadow-sm flex grow flex-col md:mt-9 max-md:px-5">
                          <img
                              loading="lazy"
                              src={book.bookCover}
                              className="aspect-[0.65] object-contain object-center overflow-hidden"
                          />
                          <div className="text-black text-xl font-semibold leading-6 mt-2.5">
                            {book.bookTitle}
                          </div>
                          <div className="text-neutral-600 text-xl leading-6 mt-2.5">
                            {book.author}
                          </div>
                          <div className="text-black text-xl font-medium leading-6 mt-2">
                            N {book.price}
                          </div>
                          <span onClick={() => (handleAddToCart(book.id))} className="hover:bg-green-700 transition cursor-pointer text-white text-xs font-medium leading-4 uppercase whitespace-nowrap justify-center items-center bg-green-600 mt-2.5 px-16 py-5 rounded border-[0.771px] border-solid border-green-600 max-md:mr-2.5 max-md:px-5">
                            Add to cART
                          </span>
                        </span>
                      </div>
                  )
              )}

            </div>
          </div>
        </span>
      </div>
    </>
  );
};

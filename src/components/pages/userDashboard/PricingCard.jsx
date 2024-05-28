import Modal from "react-modal";
import {useState} from "react";
import {SubscriptionPayment} from "../../payment/SubscriptionPayment.jsx";

export const PricingCard = ({ title,
                              price,
                              description,
                              headerColor,
                              headerText,
                              plan,
                              handleStatus,
                              setStatusTitle,
                              setStatusMessage,
                              setStatusColor,
                              subscription
}) => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const cardHeaderColor = headerColor || 'bg-black';
  const borderColorClass = `border-6 border-${cardHeaderColor}`; // Adjusted this line

  return (
    <div className={`${borderColorClass} shadow-lg bg-white flex w-full grow flex-col items-stretch max-w-[350px] rounded-md border-solid max-md:px-6 hover:scale-105 duration-200`}>
      <span className={`text-white text-base font-semibold leading-6 tracking-normal whitespace-nowrap ${cardHeaderColor} flex justify-center items-center px-24 py-2 rounded-t-md max-md:px-5 border-b border-[color:var(--Gray-6,#F2F2F2)]`}>
        {headerText && (
          <div className="font-inter text-base font-semibold leading-6 tracking-wide text-left">
            {headerText}
          </div>
        )}
      </span>

      <span className={`flex flex-col mt-6 px-8 py-7 max-md:mt-10 max-md:px-5`}>
        <div>
          <h3 className="text-black text-2xl font-semibold leading-8 mt-6 max-md:mt-4">
            {title}
          </h3>
          <span className="items-stretch flex gap-px mt-2 pr-20 max-md:pr-5">
            <div className="text-black text-sm font-semibold leading-5 self-center whitespace-nowrap my-auto">
              N
            </div>
            <div className="text-black text-3xl font-bold leading-10 tracking-wide">
              {price}
            </div>
            <span className="items-stretch self-center flex gap-0.5 my-auto">
              <div className="text-black text-base font-semibold leading-6 tracking-normal whitespace-nowrap">
                /
              </div>
              <div className="text-black text-sm font-semibold leading-5 grow whitespace-nowrap self-start">
                Month
              </div>
            </span>
          </span>
          <div className="h-[5rem] text-black text-xs leading-4 tracking-wide mt-4">
            {description}
          </div>
        </div>
        <div>

          {!subscription &&
              <div onClick={handleOpenModal} className={`text-white font-semibold text-center leading-4 whitespace-nowrap justify-center items-center border mt-5 px-16 py-4 rounded-md border-solid max-md:mt-10 max-md:px-5 cursor-pointer ${cardHeaderColor} hover:bg-white hover:text-black transition duration-200 text-${cardHeaderColor}`}>
                Subscribe
              </div>
          }

          { subscription &&
              <div className={`text-red-800 font-semibold leading-4 whitespace-nowrap text-center items-center mt-5 py-4 rounded-md border-solid max-md:mt-10 max-md:px-5 cursor-pointer transition duration-200 text-${cardHeaderColor}`}>
                You are currently subscribed
              </div>
          }

          <div className="text-green-500 text-base font-semibold leading-6 tracking-normal whitespace-nowrap mt-11 self-start max-md:mt-10">
            Core Features
          </div>

          <span className="items-stretch flex justify-between gap-1.5 mt-3">
            <div className="flex items-center">
              <input
                  type="checkbox"
                  id="unlimitedAccess"
                  className="mr-2"
                  checked={plan === "best"}
              />
              <label
                  htmlFor="unlimitedAccess"
                  className="text-black text-xs font-semibold leading-5 self-center grow shrink basis-auto my-auto"
              >
                Unlimited Access
              </label>
            </div>
          </span>

          <span className="items-stretch flex justify-between gap-1.5 mt-3">
            <div className="flex items-center">
              <input
                  type="checkbox"
                  id="offlineReading"
                  className="mr-2"
                  checked={plan === "best"}
              />
              <label
                  htmlFor="offlineReading"
                  className="text-black text-xs font-semibold leading-5 self-center grow shrink basis-auto my-auto"
              >
                Offline Reading
              </label>
            </div>
          </span>

          <span className="items-stretch flex justify-between gap-1.5 mt-3">
            <div className="flex items-center">
              <input
                  type="checkbox"
                  id="dealsAndDiscounts"
                  className="mr-2"
                  checked={plan === "popular" || plan === "best"}
              />
              <label
                  htmlFor="dealsAndDiscounts"
                  className="text-black text-xs font-semibold leading-5 self-center grow shrink basis-auto my-auto"
              >
                Exclusive Deals and Discounts
              </label>
            </div>
          </span>

          <span className="items-stretch flex justify-between gap-1.5 mt-3">
            <div className="flex items-center">
              <input
                  type="checkbox"
                  id="specialSupport"
                  className="mr-2"
                  checked={plan === "popular" || plan === "best"}
              />
              <label
                  htmlFor="specialSupport"
                  className="text-black text-xs font-semibold leading-5 self-center grow shrink basis-auto my-auto"
              >
                Special Support
              </label>
            </div>
          </span>

          <span className="items-stretch flex justify-between gap-1.5 mt-3">
            <div className="flex items-center">
              <input
                  type="checkbox"
                  id="onlineReading"
                  className="mr-2"
                  checked
              />
              <label
                  htmlFor="onlineReading"
                  className="text-black text-xs font-semibold leading-5 self-center grow shrink basis-auto my-auto"
              >
                Online Reading
              </label>
            </div>
          </span>

          <span className="items-stretch flex justify-between gap-1.5 mt-3">
            <div className="flex items-center">
              <input
                  type="checkbox"
                  id="reviews"
                  className="mr-2"
                  checked
              />
              <label
                  htmlFor="reviews"
                  className="text-black text-xs font-semibold leading-5 self-center grow shrink basis-auto my-auto"
              >
                Reviews and Ratings
              </label>
            </div>
          </span>
        </div>
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
              maxWidth: "592px",
              maxHeight: "500px",
              margin: "auto",
              background: "white",
              borderRadius: "8px",
              padding: "0px",
            },
          }}
      >
        <SubscriptionPayment
            price={plan === "best" ? 50000 : plan === "popular" ? 35000 : 15000 }
            subscription={plan === "best" ? "VORACIOUS" : plan === "popular" ? "CASUAL" : "LIGHT" }
            handleStatus={handleStatus}
            setStatusTitle={setStatusTitle}
            setStatusMessage={setStatusMessage}
            setStatusColor={setStatusColor}
            handleBuy={handleCloseModal}
        />
      </Modal>


    </div>
  );
};

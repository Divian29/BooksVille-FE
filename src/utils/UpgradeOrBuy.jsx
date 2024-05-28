import {Link} from "react-router-dom";
import axios from "../api/axios.jsx";
import {useConfig} from "../hooks/useConfig.js";

export const UpgradeOrBuy = ({ handleCloseModal, handlePurchaseBook }) => {

    return (
        <>
            <div className="bg-white shadow-lg mx-auto flex max-w-[592px] flex-col px-10 py-11 rounded-xl max-md:px-5">
                <div className="text-center mb-5 text-black text-2xl font-semibold leading-8 self-stretch max-md:max-w-full">
                    PURCHASE OR UPGRADE
                </div>

                <div>
                    <button
                        onClick={handlePurchaseBook}
                        className="cursor-pointer hover:bg-green-600 transition text-center text-white text-sm font-semibold leading-5 whitespace-nowrap justify-center items-center bg-green-500 w-full max-w-full mt-2 px-16 py-[1rem] rounded-xl self-start max-md:ml-2.5 max-md:mt-10 max-md:px-5"
                    >
                        <div className="text-center w-full">
                            Purchase Book
                        </div>
                    </button>
                </div>

                <Link to={"/user-dashboard/subscription"}>
                    <div
                        className="cursor-pointer hover:bg-green-600 transition text-center text-white text-sm font-semibold leading-5 whitespace-nowrap justify-center items-center bg-green-500 w-full max-w-full mt-2 px-16 py-[1rem] rounded-xl self-start max-md:ml-2.5 max-md:mt-10 max-md:px-5"
                    >
                        <div className="text-center w-full">
                            Upgrade Subscription
                        </div>
                    </div>
                </Link>

                <div
                    onClick={handleCloseModal}
                    className="text-green-500 text-sm leading-5 self-center whitespace-nowrap mt-4"
                >
                  <span className="cursor-pointer font-semibold text-green-500 underline">
                    Go back to
                  </span>
                </div>
            </div>
        </>
    );
};

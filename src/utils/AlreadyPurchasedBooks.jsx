import axios from "../api/axios.jsx";
import {useConfig} from "../hooks/useConfig.js";
import {useState} from "react";
import {ClipLoader} from "react-spinners";

export const AlreadyPurchasedBooks = ({alreadyPurchasedBooks, dep}) => {
    const [clip, setClip] = useState(false);

    const handleRemoveAlreadyPurchased = async () => {
        const idList = []

        alreadyPurchasedBooks.forEach(
            book => {
                idList.push(book.id)
            }
        )

        setClip(true)

        await axios.delete(`/cart/already-purchased?ids=${idList}`, useConfig())
            .then(response => {
                setClip(false)
                console.log(response.data.responseMessage)
                dep()
            }).catch(error => {
                setClip(false)
                console.log(error.response.message
            )})
    }

    return (
        <>
            <div className="bg-white shadow-lg mx-auto flex max-w-[592px] flex-col px-10 py-11 rounded-xl max-md:px-5">
                <div className="text-center mb-5 text-black text-2xl font-semibold leading-8 self-stretch max-md:max-w-full">
                    ALREADY PURCHASED BOOKS
                </div>

                <div>
                    <p className="text-center">These books have already been purchased by you.</p>
                    <p className="text-center">please remove them to continue.</p>
                    <p className="flex my-4">
                        {alreadyPurchasedBooks.map(
                            book => (
                                <div key={book.id}>
                                    <img
                                        className="w-[10rem] mx-2"
                                        src={book.bookCover}
                                    />
                                    <p className="px-4 text-center">
                                        {book.bookTitle}
                                    </p>
                                </div>
                            )
                        )}
                    </p>
                </div>

                <div>
                    <div
                        onClick={handleRemoveAlreadyPurchased}
                        className="cursor-pointer hover:bg-green-600 transition text-center text-white text-sm font-semibold leading-5 whitespace-nowrap justify-center items-center bg-green-500 w-full max-w-full mt-2 px-16 py-[1rem] rounded-xl self-start max-md:ml-2.5 max-md:mt-10 max-md:px-5"
                    >
                        <div className="text-center w-full">
                            {!clip ? (
                                "Remove All to Proceed"
                            ) : (
                                <ClipLoader color="#FFFFFF" loading={true} size={18} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
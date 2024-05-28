import {Rating} from "./Rating.jsx";
import {formatDate} from "../hooks/formatDate.js";

export const RateCard = ({rate, rating}) => {
    return(
        <>
            <span className="items-start flex w-[858px] max-w-full flex-col mt-5 pr-4 py-4 rounded-2xl self-start">
                <Rating rate={rate} />

                <div className="self-stretch text-zinc-800 text-xs leading-4 tracking-wide mt-1 max-md:max-w-full">
                  {rating.review}
                </div>
                <div className="text-zinc-800 text-xs font-medium leading-4 tracking-tight whitespace-nowrap mt-1 self-start">
                  {rating.firstName} {rating.lastName}
                </div>
                <div className="text-zinc-400 text-xs leading-4 tracking-tight mt-1 self-start">
                  {formatDate(rating.dateCreated)}
                </div>
            </span>
            <div className="bg-gray-200 self-stretch w-full shrink-0 h-[5px] mt-5" />
        </>
    )
}
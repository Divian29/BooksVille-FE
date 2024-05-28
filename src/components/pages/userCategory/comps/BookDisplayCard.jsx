import {Link} from "react-router-dom";

export const BookDisplayCard = ({book}) => {
    return(
        <>
            <div className="justify-between content-start flex-wrap w-[867px] max-w-full self-start">
                <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
                    <div className="flex flex-col items-stretch w-[24%] max-md:w-full max-md:ml-0">
                        <div className="justify-center items-center flex grow flex-col w-full border-[0.652px] border-solid border-white max-md:mt-4">
                            <div className="flex-col overflow-hidden relative flex aspect-[0.7345454545454545] w-[202px] justify-center items-stretch">
                                <div className="relative justify-center items-center shadow-lg flex flex-col">
                                    <img
                                        alt={book?.bookTitle}
                                        src={book?.bookCover}
                                        className="aspect-[0.73] object-cover object-center w-full overflow-hidden"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-stretch w-[76%] ml-5 max-md:w-full max-md:ml-0">
                        <div className="flex grow flex-col max-md:max-w-full max-md:mt-4">
                            <div className="text-neutral-800 text-2xl font-bold leading-8 self-stretch max-md:max-w-full">
                                {book?.bookTitle}
                            </div>
                            <div className="text-neutral-500 text-sm leading-5 self-stretch mt-3 max-md:max-w-full">
                                by {book?.author}
                            </div>
                            <div className="text-black text-sm leading-5 self-stretch mt-3 max-md:max-w-full">
                                {book?.description}
                            </div>
                            <div className="items-stretch flex gap-3 mt-3 self-start">
                                <div className="text-neutral-500 text-sm leading-5 grow whitespace-nowrap">
                                    {book?.genre}
                                </div>
                            </div>
                            <div className="text-neutral-800 text-base font-bold leading-6 self-stretch mt-3 max-md:max-w-full">
                                {book?.price === 0 ? "FREE" : book?.price}
                            </div>
                            <Link
                                to={`/user-dashboard/book-details/${book?.id}`}
                                className="transition hover:bg-green-600 cursor-pointer text-center text-white text-sm font-medium leading-5 uppercase whitespace-nowrap border bg-green-500 mt-4 px-10 py-4 rounded-md border-solid border-green-600 self-start max-md:px-5"
                            >
                                View Book
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-zinc-300 self-stretch flex shrink-0 h-px flex-col my-5 max-md:max-w-full" />
        </>
    )
}
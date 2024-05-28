import {Link} from "react-router-dom";

export const BookCard = ({ bookId, image, name, author, price }) => {
  return (
    <div className="flex flex-col items-stretch w-3/12 max-md:w-full max-md:ml-0">
      <div className="justify-center items-stretch flex grow flex-col max-md:mt-6">
        <img
          loading="lazy"
          src={image}
          className="aspect-[0.66] object-contain object-center w-full overflow-hidden"
        />
        <div className="text-black text-2xl font-semibold leading-7 max-w-[329px] mt-3.5 max-md:mr-0.5">
          {name}
        </div>
        <div className="text-neutral-600 text-2xl leading-7 max-w-[329px] mt-3 max-md:mr-0.5">
          {author}
        </div>
        <div className="text-black text-2xl font-medium leading-7 max-w-[329px] mt-3 max-md:mr-0.5">
          N {price}
        </div>
        <Link to={`/user-dashboard/book-details/${bookId}`} className="transition hover:bg-green-600 cursor-pointer text-center text-white text-sm font-medium leading-5 uppercase whitespace-nowrap justify-center items-center border bg-green-500 mt-3.5 px-16 py-7 rounded-md border-solid border-green-600 max-md:px-5">
          View Book
        </Link>
      </div>
    </div>
  );
};

import {useEffect, useState} from "react";
import {BookDisplayCard} from "../userCategory/comps/BookDisplayCard.jsx";
import axios from "../../../api/axios.jsx";

export const HeaderSearch = ({search}) => {
    const [isLast, setIsLast] = useState(false)

    const [page, setPage] = useState(0);

    const [books, setBooks] = useState([]);

    useEffect(() => {
        const handleSearch = async () => {
            console.log(search)
            const response = await axios.get(`/book/admin-search?search=${search}&pageNo=${page}`)

            setBooks(response.data.responseData.content);
            setIsLast(response.data.responseData.last);
        }

        handleSearch();
    }, [page, search]);

    const nextPage = () => {
        if (!isLast) {
            setPage(page + 1)
        }
    };

    const prevPage = () => {
        if (page > 0) {
            setPage(page - 1);
        }
    };

    return(
        <div className="flex flex-col h-[75vh] overflow-auto items-stretch w-full px-10 max-md:w-full max-md:ml-0">
            <div className="flex grow flex-col max-md:max-w-full max-md:mt-5">
                <>
                    {books.map((book) => (
                        <BookDisplayCard
                            key={book.id}
                            book={book}
                        />
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
    )
}
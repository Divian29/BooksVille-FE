import { useEffect, useState } from "react";

export function useAxios() {
    const [savedBooks, setSavedBooks] = useState([]);
    const [purchasedBooks, sePurchasedBooks] = useState([]);

    useEffect(() => {
        const getSavedBooks = async () => {
            const response = await axios.get("/book/saved-books?sortDir=desc", {
                headers: {
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem("userData")).accessToken}`
                }
            })

            setSavedBooks(response.data.responseData.content);
        }

        const getPurchasedBooks = async () => {
            const response = await axios.get("/book/purchased?sortDir=desc", {
                headers: {
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem("userData")).accessToken}`
                }
            })

            sePurchasedBooks(response.data.responseData.content);
        }

        getSavedBooks();
        getPurchasedBooks();

    }, []);

    return {savedBooks, purchasedBooks}
}
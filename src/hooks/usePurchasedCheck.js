export const usePurchasedCheck = (purchasedBooks, bookId) => {
    let isPurchased = false

    for (let i = 0; i < purchasedBooks.length; i++) {
        if (purchasedBooks[i].id == bookId) {
            isPurchased = true;
        }
    }

    return isPurchased;
}
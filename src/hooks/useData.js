export const useData = () => {
    const subscription = JSON.parse(localStorage.getItem("subscription"));
    const userData = JSON.parse(localStorage.getItem("userData"))
    const profilePicture = JSON.parse(localStorage.getItem("profilePicture"))

    return { subscription, userData, profilePicture }
}
import {useData} from "./useData.js";

export const useConfig = () => {
    const { userData } = useData()

    return (
        {
            headers: {
                'Authorization': `Bearer ${userData.accessToken}`
            }
        }
    )
}
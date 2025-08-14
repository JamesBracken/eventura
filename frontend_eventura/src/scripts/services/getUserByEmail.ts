import type {User} from "../models/user"
import { setUserId } from "../models/userState";

export const fetchData = async (email: string) :Promise<User>=> {
    try {
        const response = await fetch(
            `https://eventura-production.up.railway.app/api/users/byEmail/${email}`
        );
        if (response.status !== 200) {
            throw new Error("Something went wrong!");
        }
        const data: User = await response.json();
        setUserId(data.id);
        console.log("Fetched data",data);
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};

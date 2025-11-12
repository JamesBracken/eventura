import type {User} from "../models/user"
import { setUserId,setAdminUser } from "./../models/userState";

const URL = "http://localhost:8080/api/";

export const fetchData = async (email: string) :Promise<User>=> {

    const BASE_URL = URL + "users/byEmail/";
    try {
        const response = await fetch(
            `${BASE_URL}${email}`
        );
        if (response.status !== 200) {
            throw new Error("Something went wrong!");
        }
        const data: User = await response.json();
        setUserId(data.id);
        setAdminUser(data.adminUser);
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};

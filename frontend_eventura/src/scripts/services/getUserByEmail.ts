import type { User } from "../models/user"
import { setUserId, setAdminUser } from "./../models/userState";
import { API_URL } from "../constants";

export const fetchData = async (email: string): Promise<User> => {

    const BASE_URL = `${API_URL}api/users/byEmail/`;
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

import type { NewUser } from "../models/newUser";
import type { User } from "../models/user";
import {API_URL} from "../constants";

const BASE_URL = `${API_URL}api/`;

export const createNewUser = async (user: NewUser): Promise<User>=> {
    try {
        const response = await fetch(
            `${BASE_URL}users`,
            {
                headers: { "Content-Type": "application/json" },
                method: "post",
                body: JSON.stringify(user),
            }
        );
        if (!response.ok) {
            throw new Error(`Error creating user: ${response.status}`);
        }
        const data: User = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};

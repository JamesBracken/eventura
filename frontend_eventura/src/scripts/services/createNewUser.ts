import type { NewUser } from "../models/newUser";
import type { User } from "../models/user";

export const createNewUser = async (user: NewUser): Promise<User>=> {
    try {
        const response = await fetch(
            `http://localhost:8080/api/users`,{
            headers: {"Content-Type": "application/json"},
            method : "post",
            body: JSON.stringify(user)
            });
        if (!response.ok) {
            throw new Error(`Error creating user: ${response.status}`);
        }
        const data: User = await response.json();
        console.log("User created",data);
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};

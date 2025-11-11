import type { NewAddress } from "../models/newAddress";
import type { Address } from "../models/address";

const URL = "http://localhost:8080/api/";

export const createNewAddress = async (address: NewAddress): Promise<Address>=> {
    try {
        const response = await fetch(
            `${URL}addresses`,
            {
                headers: { "Content-Type": "application/json" },
                method: "post",
                body: JSON.stringify(address),
            }
        );
        if (!response.ok) {
            throw new Error(`Error creating address: ${response.status}`);
        }
        const data: Address = await response.json();
        console.log("Address created",data);
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};
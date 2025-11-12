import type { NewAddress } from "../models/newAddress";
import type { Address } from "../models/address";
import {API_URL} from "../constants";

const BASE_URL = `${API_URL}api/`;

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
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};
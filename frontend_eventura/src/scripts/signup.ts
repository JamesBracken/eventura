import { createNewUser } from "./services/createNewUser"; // adjust path as needed
import type { NewUser } from "./models/newUser";
import type { User } from "./models/user";
import type { NewAddress } from "./models/newAddress";
import type { Address } from "./models/address";
import { createNewAddress } from "./services/createNewAddress";
import { setUserId, getUserId } from "./models/userState";
import "./../styles/main.scss";

// Grab the form & input
const form = document.querySelector("form")!;
const emailInput = document.querySelector<HTMLInputElement>("#useremail")!;
const add1Input = document.querySelector<HTMLInputElement>("#addressline1")!;
const addr2Input = document.querySelector<HTMLInputElement>("#addressline2")!;
const postcodeInput = document.querySelector<HTMLInputElement>("#postcode")!;
const dobInput = document.querySelector<HTMLInputElement>("#dob")!;
const cityInput = document.querySelector<HTMLInputElement>("#city")!;
const phoneInput = document.querySelector<HTMLInputElement>("#phoneNo")!;
const firstNameInput = document.querySelector<HTMLInputElement>("#firstName")!;
const lastNameInput = document.querySelector<HTMLInputElement>("#lastName")!;
const countryInput = document.querySelector<HTMLInputElement>("#country")!;
const errorMessageEl =
    document.querySelector<HTMLDivElement>("#error-message")!;

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    errorMessageEl.textContent="";

    const newAddressData: NewAddress = {
        addressLine1: add1Input.value.trim(),
        addressLine2: addr2Input.value.trim(),
        postcode: postcodeInput.value.trim(),
        city: cityInput.value.trim(),
        country: countryInput.value.trim(),
    };
    try {
        const createdAddress : Address = await createNewAddress(newAddressData);
        console.log("New Address saved:", createdAddress);

        const newUserData: NewUser = {
            firstName: firstNameInput.value.trim(),
            lastName: lastNameInput.value.trim(),
            email: emailInput.value.trim(),
            phone: phoneInput.value.trim(),
            dob: new Date(dobInput.value),
            address: {
                id: createdAddress.id,
            },
            isAdminUser: false, // or true if needed
        };

            const createdUser : User = await createNewUser(newUserData);
            setUserId(createdUser.id);
            console.log("New user saved:", createdUser, getUserId());
            errorMessageEl.textContent = "You have successfully logged in!";
            return createdUser;

    } catch (error) {
        console.error("Error in signup process:", error);
        if (error instanceof Error){
            errorMessageEl.textContent= error.message;
        } else {
            errorMessageEl.textContent="Something went wrong. Please try again";
        }
    }
});

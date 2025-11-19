import { setUserId, setAdminUser } from "./models/userState";
import { fetchData } from "./services/getUserByEmail"; // adjust path as needed
import "./../styles/main.scss";

// Grab the form & input
const form = document.querySelector("form");
const emailInput = document.querySelector<HTMLInputElement>("#useremail");
const errorMessageEl =
    document.querySelector<HTMLDivElement>("#error-message")!;

if (form && emailInput) {
    form.addEventListener("submit", async (e) => {
        e.preventDefault(); // prevent page refresh
        errorMessageEl.textContent = "";

        const email = emailInput.value.trim();
        if (!email) {
            console.error("Email is required");
            return;
        }

        try {
            const user = await fetchData(email);
             setUserId(user.id)
             setAdminUser(user.adminUser);
            errorMessageEl.textContent = "You have successfully logged in!";
            // redirect to bookings
            window.location.href = "./../bookings/index.html";
        } catch (err) {
            console.error("Error in login process:", err);
            if (err instanceof Error) {
                errorMessageEl.textContent = err.message;
            } else {
                errorMessageEl.textContent =
                    "Something went wrong. Please try again";
            }
        }
    });
}

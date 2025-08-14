import Inspect from "vite-plugin-inspect";
import { defineConfig } from "vite";
// import { resolve } from "path";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
    base: "/eventura/",
    plugins: [Inspect()],
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, "index.html"),
                bookings: resolve(__dirname, "src/pages/bookings/index.html"),
                events: resolve(__dirname, "src/pages/events/index.html"),
                login: resolve(__dirname, "src/pages/login/index.html"),
                signup: resolve(__dirname, "src/pages/signup/index.html"),
                profile: resolve(__dirname, "src/pages/profile/index.html")
            }
        }
    }
})

// export default defineConfig({
//     base: "/",

// })
import axios from "axios"
import { interceptors } from "@/providers/apiServiceProvider.js"

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-Type": "application/json"
    }
})

interceptors(api)

export default api
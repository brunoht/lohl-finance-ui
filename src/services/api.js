import axios from "axios"
import { interceptors } from "@/providers/apiServiceProvider.js"

const api = axios.create({
    baseURL: "http://localhost:8082/api/",
    headers: {
        "Content-Type": "application/json"
    }
})

interceptors(api)

export default api
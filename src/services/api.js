import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:8082/api/",
    headers: {
        "Content-Type": "application/json"
    }
})

// redirects to force logout when 401
api.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            window.location.href  = '/sair'
        }
        return Promise.reject(error);
    }
);

export default api
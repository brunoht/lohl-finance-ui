import { addAuthorizationToken } from "@/interceptors/requestInterceptor.js";
import { redirectWhenUnauthorized} from "@/interceptors/responseInterceptor.js";

/**
 * Api Service's Interceptors
 * @param api
 */
export const interceptors = (api) => {
    /**
     * Request Interceptors
     */
    api.interceptors.request.use(addAuthorizationToken, errorInterceptor);

    /**
     * Response Interceptors
     */
    api.interceptors.response.use(response => response, redirectWhenUnauthorized)
}

const errorInterceptor = (error) => {
    return Promise.reject(error);
};
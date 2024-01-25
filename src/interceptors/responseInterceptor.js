import {useAuthStore} from "@/stores/auth.js";

/**
 * Redirects to force logout when 401
 * @param error
 * @returns {Promise<never>}
 */
export const redirectWhenUnauthorized = (error) => {
    const auth = useAuthStore()

    if (error.response && error.response.status === 401) {
        auth.remove()
        window.location.href  = '/entrar'
    }
    return Promise.reject(error);
}
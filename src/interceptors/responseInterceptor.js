/**
 * Redirects to force logout when 401
 * @param error
 * @returns {Promise<never>}
 */
export const redirectWhenUnauthorized = (error) => {
    if (error.response && error.response.status === 401) {
        window.location.href  = '/sair'
    }
    return Promise.reject(error);
}
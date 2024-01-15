/**
 * Automatically adds access_token to the request's header
 * @param config
 * @returns {*}
 */
export const addAuthorizationToken = (config) => {
    const token = window.localStorage.getItem('access_token');

    if (token) {
        const access_token = JSON.parse(token)
        config.headers.Authorization = `Bearer ${access_token}`;
    }

    return config;
}
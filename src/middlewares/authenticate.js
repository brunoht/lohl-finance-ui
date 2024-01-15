import {useAuthStore} from "@/stores/auth.js";

const authenticate = (to, from, next) => {
    const auth = useAuthStore()

    const redirectToLogin = '/entrar'

    try {
        if (to.meta.requiresAuth && !auth.isLoggedIn())
            next(redirectToLogin)
        else
            next()
    } catch (error) {
        auth.remove()
        next(redirectToLogin)
    }
}

export default authenticate;
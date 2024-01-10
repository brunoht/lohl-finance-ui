import { createRouter, createWebHistory } from "vue-router"
import Auth from "../components/pages/Auth.vue"

const routes = [
    {
        path: '/',
        name: 'auth',
        component: Auth
    },
    {
        path: '/perfil/:filter',
        name: 'profile',
        component: () => import("@/components/pages/Profile.vue")
    },
    {
        path: '/contratos',
        name: 'contracts',
        component: () => import("@/components/pages/Contracts.vue")
    },
    {
        path: '/faturas/:contractId/:filter',
        name: 'billings',
        component: () => import("@/components/pages/Billings.vue")
    },
    {
        path: '/fatura/:uuid',
        name: 'billing',
        component: () => import("@/components/pages/Billing.vue")
    },
    {
        path: '/sair',
        name: 'logout',
        component: () => import("@/components/pages/Logout.vue")
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
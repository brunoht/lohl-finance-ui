import { createRouter, createWebHistory } from "vue-router"
import Home from "@/pages/Home.vue";
import { middlewares } from '../providers/routeServiceProvider.js';

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/entrar',
        name: 'auth',
        component: () => import("@/pages/Auth.vue")
    },
    {
        path: '/perfil/:filter',
        name: 'profile',
        component: () => import("@/pages/Profile.vue"),
        meta: { requiresAuth: true },
    },
    {
        path: '/contratos',
        name: 'contracts',
        component: () => import("@/pages/Contracts.vue"),
        meta: { requiresAuth: true },
    },
    {
        path: '/faturas/:contractId/:filter',
        name: 'billings',
        component: () => import("@/pages/Billings.vue"),
        meta: { requiresAuth: true },
    },
    {
        path: '/fatura/:uuid',
        name: 'billing',
        component: () => import("@/pages/Billing.vue"),
    },
    {
        path: '/sair',
        name: 'logout',
        component: () => import("@/pages/Logout.vue"),
        meta: { requiresAuth: true },
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

// loads global middlewares
middlewares.forEach((guard) => {
    router.beforeEach(guard);
});

export default router
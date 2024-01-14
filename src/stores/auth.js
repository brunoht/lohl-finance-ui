import { defineStore } from 'pinia'
import api from "@/services/api.js"

export const useAuthStore = defineStore('AuthStore', {
    state: () => {
        return {
            //
        }
    },
    getters: {
        //
    },
    actions: {
        async login(email, password) {
            const response = await api.post('/auth/login', {
                email, password
            })
            if (response) {
                this.storeToken(response.data)
                return true
            }
            return false
        },

        async user() {
            const token = this.loadToken()
            if (!token) return null
            const response = await api.post('/auth/me', {}, {
                headers: {
                    'Authorization': 'Bearer ' + token.access_token
                }
            })
            return response.data
        },

        isLoggedIn() {
            const token = this.loadToken()
            return !!token;
        },

        storeToken(token) {
            $cookies.set('lohl_token', token)
        },

        loadToken(){
            return $cookies.get('lohl_token')
        },

        removeToken() {
            $cookies.remove('lohl_token')
        },
    }
})
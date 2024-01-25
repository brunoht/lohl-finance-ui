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
                this.store(response.data.access_token)
                return true
            }
            return false
        },

        async logout() {
            const accessToken = this.load()
            this.remove()
            try {
                if (accessToken) {
                    const response = await api.post('/auth/logout', {}, {
                        headers: {
                            'Authorization': 'Bearer ' + accessToken
                        }
                    })
                }
            } catch (error) {
                //
            }
        },

        async user() {
            const accessToken = this.load()
            if (!accessToken) return null
            const response = await api.post('/auth/me', {}, {
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                }
            })
            return response.data
        },

        isLoggedIn() {
            const accessToken = this.load()
            return !!accessToken;
        },

        store(accessToken) {
            window.localStorage.setItem('access_token', JSON.stringify(accessToken))
        },

        load(){
            const access_token = window.localStorage.getItem('access_token')
            return JSON.parse(access_token)
        },

        remove() {
            window.localStorage.removeItem('access_token')
        },
    }
})
<template></template>

<script>

import {useAuthStore} from "@/stores/auth.js";
const auth = useAuthStore()

export default {
  name: "Logout",

  beforeMount() {
    const token = auth.loadToken()
    if (token) {
      auth.removeToken()
    }
    this.$router.push('/')
  },
}
</script>
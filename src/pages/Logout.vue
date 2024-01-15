<template></template>

<script>
import {useAuthStore} from "@/stores/auth.js";
const auth = useAuthStore()

export default {
  name: "Logout",

  beforeMount() {
    auth.logout()
    this.$router.push('/')
  },
}
</script>
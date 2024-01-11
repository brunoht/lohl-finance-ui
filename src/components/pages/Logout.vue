<script>
export default {
  name: "Logout",

  beforeMount() {
    const token = this.loadToken()
    if (token) {
      this.removeToken()
    }
    this.$router.push('/')
  },

  methods: {
    removeToken() {
      this.$cookies.remove('lohl_token')
    },
    loadToken() {
      return this.$cookies.get('lohl_token')
    }
  }
}
</script>
<script>
export default {
  name: "Logout",

  beforeMount() {
    const customerId = this.loadCustomerId()
    if (customerId) {
      this.removeCustomerId()
    }
    this.$router.push('/')
  },

  methods: {
    loadCustomerId() {
      return this.$cookies.get('lohl_customer_id')
    },
    removeCustomerId() {
      this.$cookies.remove('lohl_customer_id')
    }
  }
}
</script>
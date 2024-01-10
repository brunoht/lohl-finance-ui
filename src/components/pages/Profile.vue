<template>
  <Layout>
    <Container>

      <Loader v-if="loading" message="Carregando seus dados. Aguarde..." />

      <div class="space-y-6">

        <Tabs v-if="!loading" :tabs="profileTabs" router-name="profile" />

        <ProfileFormBilling
            v-if="$route.params.filter === 'cobranca' && customer !== null"
            :data="customer"
        />

        <ProfileFormNotification
            v-if="$route.params.filter === 'notificacoes' && customer !== null"
            :data="customer"
        />

      </div>

    </Container>
  </Layout>
</template>

<script>
import Panel from "@/components/layouts/Panel.vue"
import PanelContainer from "@/components/elements/PanelContainer.vue"
import ProfileFormBilling from "@/components/elements/ProfileFormBilling.vue"
import ProfileFormNotification from "@/components/elements/ProfileFormNotification.vue"
import api from "@/services/api.js"
import H2 from "@/components/elements/H2.vue"
import Tabs from "@/components/elements/Tabs.vue"
import Loader from "@/components/elements/Loader.vue";

export default {
  name: "Profile",

  components: {
    H2,
    Layout: Panel,
    Container: PanelContainer,
    ProfileFormBilling,
    ProfileFormNotification,
    Tabs,
    Loader
  },

  beforeMount() {
    // TODO: Implement a Middleware
    this.customerId = this.loadCustomerId()
    if (!this.customerId) this.$router.push('/')
    this.fetchCustomer()
  },

  data() {
    return {
      customerId: null,
      customer: null,
      loading: true,
      profileTabs: [
        { title: 'Cobrança', filter: 'cobranca'},
        { title: 'Notificações', filter: 'notificacoes'},
      ],
    }
  },

  methods: {
    loadCustomerId() {
      return this.$cookies.get('lohl_customer_id')
    },

    fetchCustomer() {
      this.loading = true
      api.get('customers/' + this.customerId)
          .then((response) => {
            this.customer = response.data
          })
          .finally(() => {
            this.loading = false
          })
    },
  },
}
</script>


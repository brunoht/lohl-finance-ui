<template>

  <layout>

    <billing-tab />

    <Container>
      <div v-if="loadingBillings" class="text-sm">
        <billing-item
            v-if="loadingBillings"
            :billing="null"
            :loading="true"
        />
      </div>
      <billing-item
          v-if="!loadingBillings && billings.length > 0"
          v-for="billing in billings"
          :key="'billing-' + billing.id"
          :billing="billing"
      />
      <div v-if="!loadingBillings && billings.length < 1" class="text-sm">
        Nenhuma fatura encontrada.
      </div>

    </Container>

  </layout>

</template>

<script>
import moment from "moment"
import Panel from "@/components/layouts/Panel.vue"
import BillingItem from "@/components/elements/BillingItem.vue"
import PanelNavigation from "@/components/elements/PanelNavigation.vue"
import BillingTab from "@/components/elements/BillingTab.vue"
import PanelContainer from "@/components/elements/PanelContainer.vue"
import api from "@/services/api.js";
export default {

  name: "Billings",

  components: {
    Layout: Panel,
    Container: PanelContainer,
    Navigation: PanelNavigation,
    BillingItem,
    BillingTab
  },

  beforeMount() {
    // TODO: Implement a Middleware
    const token = this.loadToken()
    if (!token) this.$router.push('/')
    this.accessToken = token.access_token
  },

  mounted() {
    this.loadData()
  },

  created() {
    // watch the params of the route to fetch the data again
    this.$watch(
        () => this.$route.params,
        () => {
          this.loadData()
        },
        // fetch the data when the view is created and the data is
        // already being observed
        { immediate: false }
    )
  },

  data() {
    return {
      accessToken: null,
      billings: [],
      loadingBillings: true
    }
  },

  methods: {

    loadToken() {
      return this.$cookies.get('lohl_token')
    },

    loadData() {
      const filter = this.$route.params.filter
      if (filter === 'abertas') this.loadOpenedBills()
      if (filter === 'pendentes') this.loadPendingBills()
      if (filter === 'pagas') this.loadPayedBills()
    },

    loadOpenedBills() {
      this.loadingBillings = true
      api.get('/billings/open', this.config)
      .then((response) => {
        this.billings = response.data.data
      })
      .finally(() => {
        this.loadingBillings = false
      })
    },

    loadPendingBills() {
      this.loadingBillings = true
      api.get('/billings/pending', this.config)
      .then((response) => {
        this.billings = response.data.data
      })
      .finally(() => {
        this.loadingBillings = false
      })
    },

    loadPayedBills() {
      this.loadingBillings = true
      api.get('/billings/payed', this.config)
      .then((response) => {
        this.billings = response.data.data
      })
      .finally(() => {
        this.loadingBillings = false
      })
    },
  },

  computed: {
    config() {
      return {
        headers: {
          'Authorization': 'Bearer ' + this.accessToken
        }
      }
    }
  }
}
</script>
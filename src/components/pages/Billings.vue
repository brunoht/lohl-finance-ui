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
    this.customerId = this.loadCustomerId()
    if (!this.customerId) this.$router.push('/')
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
      customerId: null,
      billings: [],
      loadingBillings: true
    }
  },
  methods: {
    loadCustomerId() {
      return this.$cookies.get('lohl_customer_id')
    },
    loadData() {
      const filter = this.$route.params.filter
      if (filter === 'abertas') this.loadOpenedBills()
      if (filter === 'pendentes') this.loadPendingBills()
      if (filter === 'pagas') this.loadPayedBills()
    },
    loadOpenedBills() {
      console.log('opened bills')
      this.loadingBillings = true
      api.post('/billings/open', {
        customer_id: this.customerId
      })
      .then((response) => {
        this.billings = response.data.data
      })
      .finally(() => {
        this.loadingBillings = false
      })
    },
    loadPendingBills() {
      console.log('pending bills')
      this.loadingBillings = true
      api.post('/billings/pending', {
        customer_id: this.customerId
      })
      .then((response) => {
        this.billings = response.data.data
      })
      .finally(() => {
        this.loadingBillings = false
      })
    },
    loadPayedBills() {
      console.log('payed bills')
      this.loadingBillings = true
      api.post('/billings/payed', {
        customer_id: this.customerId
      })
      .then((response) => {
        this.billings = response.data.data
      })
      .finally(() => {
        this.loadingBillings = false
      })
    },
    dateFormat(date) {
      return moment(date, 'YYYY-MM-DD').format('DD/MM/YYYY')
    },
    isExpired(date) {
      const today = moment()
      const diff = today.diff(moment(date, 'YYYY-MM-DD'), 'days')
      return (diff > 0)
    },
    hasAlert(date) {
      const today = moment()
      const diff = today.diff(moment(date, 'YYYY-MM-DD'), 'days')
      return (diff >= -30)
    },
    t(text) {
      const lang = {
        'pending': 'Pendente',
        'finished': 'Concluído',
        'open': 'Aberto',
      }
      return lang[text] ?? text
    },
    openNewBrowserTab(id) {
      const routeData = this.$router.resolve({name: 'billing', params: {id: id}})
      window.open(routeData.href, '_blank');
    },
  }
}
</script>
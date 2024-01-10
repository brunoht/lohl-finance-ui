<template>

  <layout>

    <Container name="billings">

      <H2>Faturas abertas</H2>

      <billing-item
          v-if="loadingBillings"
          :billing="null"
          :loading="loadingBillings"
      />

      <billing-item
          v-if="!loadingBillings && billings.length > 0"
          v-for="billing in billings"
          :key="'billing-' + billing.id"
          :billing="billing"
      />

      <div v-if="!loadingBillings && billings.length < 1" class="text-sm">
        Nenhuma fatura aberta.
      </div>

    </Container>

    <Container name="contracts">

      <H2>Contratos Ativos</H2>

      <div class="grid sm:grid-cols-3 gap-3">

        <contract-box
            v-if="loadingContracts"
            :contract="null"
            :loading="loadingContracts"
        />

        <contract-box
            v-if="!loadingContracts && contracts.length > 0"
            v-for="contract in contracts"
            :key="'contract-' + contract.id"
            :contract="contract"
        />

        <div v-if="!loadingContracts && contracts.length < 1" class="text-sm">
          Nenhum contrato ativo.
        </div>

      </div>

    </Container>

  </layout>

</template>

<script>
import api from "@/services/api.js"
import Panel from "@/components/layouts/Panel.vue"
import PanelContainer from "@/components/elements/PanelContainer.vue"
import ContractBox from "@/components/elements/ContractBox.vue"
import BillingItem from "@/components/elements/BillingItem.vue"
import H2 from "@/components/elements/H2.vue"

export default {

  name: "Billings",

  components: {
    Layout: Panel,
    Container: PanelContainer,
    ContractBox,
    BillingItem,
    H2
  },

  beforeMount() {
    // TODO: Implement a Middleware
    this.customerId = this.loadCustomerId()
    if (!this.customerId) this.$router.push('/')
  },

  mounted() {
    this.loadData()
  },

  data() {
    return {
      customerId: null,
      loadingContracts: true,
      loadingBillings: true,
      contracts: null,
      billings: null
    }
  },

  methods: {

    loadCustomerId() {
      return this.$cookies.get('lohl_customer_id')
    },

    loadData() {
      this.loadContract()
      this.loadBillings()
    },

    loadContract() {
      this.loadingContracts = true
      api.post('/contracts', {
        customer_id: this.customerId
      })
      .then((response) => {
        this.contracts = response.data.data
      })
      .finally(() => {
        this.loadingContracts = false
      })
    },

    loadBillings() {
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
  },
}
</script>
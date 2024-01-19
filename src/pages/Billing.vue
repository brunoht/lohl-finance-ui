<template>

  <Layout>

    <Container>

      <Loader
          v-if="loadingBilling"
          message="Carregando sua fatura. Aguarde..."
      />

      <billing-box
          v-if="!loadingBilling && billing !== null && billing.status !== 'approved'"
          :billing="billing"
      ></billing-box>

      <billing-approved-box
          v-if="!loadingBilling && billing !== null && billing.status === 'approved'"
          :billing="billing"
      ></billing-approved-box>

      <not-found
          v-if="!loadingBilling && billing === null"
          :title="errorTitle"
          :message="errorMessage"
          :code="errorCode"
      />

    </Container>

  </Layout>

</template>

<script>
import Panel from "@/components/layouts/Panel.vue";
import PanelContainer from "@/components/elements/PanelContainer.vue";
import BillingBox from "@/components/elements/BillingBox.vue";
import BillingApprovedBox from "@/components/elements/BillingApprovedBox.vue";
import api from "@/services/api.js";
import Loader from "@/components/elements/Loader.vue";
import NotFound from "@/components/elements/NotFound.vue";
import echo from "@/services/echo.js"

export default {

  name: "Billing",

  components: {
    Layout: Panel,
    Container: PanelContainer,
    BillingBox,
    BillingApprovedBox,
    Loader,
    NotFound
  },

  mounted() {
    this.loadData()
    this.listener(this.$route.params.uuid)
  },

  data() {
    return {
      billing: null,
      loadingBilling: true,
      errorTitle: '',
      errorMessage: '',
      errorCode: 0
    }
  },

  methods: {

    loadData() {
      this.loadingBilling = true
      api.post('/payment', {
        'billing_uuid': this.$route.params.uuid
      })
      .then((response) => {
        this.billing = response.data.data
      })
      .catch( (error) => {
        if (error.response?.status === 404) {
          this.billing = null
          this.errorTitle = "Fatura não encontrada"
          this.errorMessage = "Não foi possível localizar a sua fatura. " +
              "Verifique se você digitou corretamente o endereço " +
              "em seu navegador ou solicite uma nova fatura."
          this.errorCode = error.response?.status
        } else {
          this.billing = null
          this.errorTitle = "Serviço indisponível"
          this.errorMessage = "Ocorreu um erro em nossos servidores. " +
              "Aguarde alguns minutos e tente acessar sua fatura novamente. Caso o erro persista, entre em contato com " +
              "seu consultor."
          this.errorCode = error.code
        }
      })
      .finally(() => {
        this.loadingBilling = false
      })
    },

    listener(uuid) {
      let channel = echo.channel(`billing.${uuid}`);
      channel.listen('.refresh', (data) => {
        this.loadData()
      });
    },

    // loadData() {
    //   this.billing = {
    //     "id":14,
    //     "billing_id":1,
    //     "customer_id":1,
    //     "billing_expire_at": "2024-01-10",
    //     "amount":375,
    //     "fees":0,
    //     "transaction_amount":375,
    //     "description":"lohl commerce ref 01/2024",
    //     "payment_method_id":"pix",
    //     "date_of_expiration":"2024-01-08T12:01:41.380-03:00",
    //     "payer_email":"teste2@lohl.com.br",
    //     "payer_first_name":"Bruno",
    //     "payer_last_name":"Trindade",
    //     "payer_identification_type":"CPF",
    //     "payer_identification_number":"05753109950",
    //     "status":"approved",
    //     "date_approved":null,
    //     "mercadopago_payment_id":"1320520443",
    //     "mercadopago_qr_code":"00020126580014br.gov.bcb.pix0136b76aa9c2-2ec4-4110-954e-ebfe34f05b615204000053039865406375.005802BR5908BRXqi.HT6005ItyFj62230519mpqrinter13205204436304A17E","mercadopago_qr_code_base64":"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","mercadopago_ticket_url":"https://www.mercadopago.com.br/sandbox/payments/1320520443/ticket?caller_id=1572526612&hash=a64a3c71-c850-4da6-827e-13d949d1e40a","created_at":"2024-01-07T10:13:56.000000Z","updated_at":"2024-01-07T13:54:42.000000Z"
    //   }
    //   this.loadingBilling = false
    // },
  }
}
</script>




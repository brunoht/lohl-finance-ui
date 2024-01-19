<template>

  <div class="grid content-center p-8 rounded border bg-white">

    <h1 class="text-2xl font-bold mb-5">
      Recibo #{{ billing.mercadopago_payment_id }}
    </h1>

    <div class="mt-6 border-t border-gray-100">
      <dl class="divide-y divide-gray-100">
        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium leading-6 text-gray-900">Descrição</dt>
          <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{{ billing.description }}</dd>
        </div>
        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium leading-6 text-gray-900">Data de Vencimento</dt>
          <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{{ formatDate(billing.billing_expire_at) }}</dd>
        </div>
        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium leading-6 text-gray-900">Data do Pagamento</dt>
          <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{{ formatDate(billing.date_approved) }}</dd>
        </div>
        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium leading-6 text-gray-900">Forma de Pagamento</dt>
          <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{{  billing.payment_method_id.charAt(0).toUpperCase() + billing.payment_method_id.substring(1) }}</dd>
        </div>
        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium leading-6 text-gray-900">Valor Pago</dt>
          <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{{  format(billing.transaction_amount) }}</dd>
        </div>
      </dl>
    </div>

    <Toast ref="toast" />

  </div>

</template>

<script>
import moment from "moment";
import { format } from "@/services/money.js";
import { format as formatDate } from "@/services/date.js";
import Toast from "@/components/elements/Toast.vue";
import billing from "../../pages/Billing.vue";

export default {
  name: "BillingApprovedBox",

  props: ['billing'],

  components: {
    Toast
  },

  mounted() {
    this.interval = setInterval(this.countdown, 1000);
  },

  computed: {
    title() {
      return `Pague ${ this.format(this.billing.transaction_amount) } via
      ${ this.billing.payment_method_id.charAt(0).toUpperCase() + this.billing.payment_method_id.substring(1) }`
    }
  },

  data() {
    return {
      timerCount: null,
      timerCountDuration: null,
      interval: undefined,
    }
  },

  methods: {
    format,

    formatDate,

    countdown() {
      const timeout = 1000
      const unit = 'milliseconds'
      const event = moment(this.billing.date_of_expiration)
      const current = moment()
      const diffTime = event.diff(current)
      const duration = moment.duration(moment.duration(diffTime, unit) - timeout, unit)

      if (duration.asMilliseconds() > 0) {
        const minutes = duration.minutes().toString().padStart(2, '0')
        const seconds = duration.seconds().toString().padStart(2, '0')
        this.timerCountDuration = duration.asMilliseconds()
        this.timerCount = `${minutes}:${seconds}`
      } else {
        this.timerCountDuration = 0
        this.timerCount = "00:00"
        clearInterval(this.interval)
      }
    },

    refresh() {
      window.location.reload();
    },

    copyQrCode(event) {
      event.target.select()
      if (this.timerCountDuration > 0) {
        navigator.clipboard.writeText(this.billing.mercadopago_qr_code)
            .then(() => {
              this.$refs.toast.showToast('Código de pagamento copiado com sucesso!');
            })
            .catch((err) => {
              console.error('Erro ao copiar o texto: ', err);
              this.$refs.toast.showToast('Erro ao copiar código de pagamento.', "error");
            });
      } else {
        this.$refs.toast.showToast('Código de pagamento expirado.', "error");
      }
    },
  },

}
</script>

<style scoped>
.circle-count {
  align-items: center;
  border: 2px solid rgb(67, 56, 202);
  border-radius: 50%;
  box-sizing: border-box;
  color: rgb(67, 56, 202);
  display: flex;
  flex-shrink: 0;
  font-size: 15px;
  height: 26px;
  justify-content: center;
  margin-right: 16px;
  width: 26px;
}
</style>
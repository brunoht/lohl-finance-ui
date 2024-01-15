<template>

  <div class="grid content-center p-8 rounded border bg-white">

    <div class="space-y-2 text-sm">

      <h1 class="text-2xl font-bold mb-5">
        {{ title }}
      </h1>

      <div class="flex w-full justify-between pb-5">

        <p>
          Vencimento: {{ formatDate(billing.billing_expire_at) }}
        </p>

        <p v-if="timerCount"
            class="text-right"
            :class="{
              'animate-pulse': timerCountDuration <= 10000
              && timerCountDuration > 0
            }"
        >

          Código de pagamento válido por:

          <span
              class="font-bold"
              :class="{ 'text-red-400': timerCountDuration < 11000 }"
          >
            {{ timerCount }}
          </span>

        </p>

      </div>

      <p class="text-base font-bold mb-5 mt-8">
        Para pagar, escolha uma destas opções:
      </p>

      <p>
        Código QR:
      </p>

      <div class="flex w-full text-center justify-center">

        <img
            v-if="timerCountDuration > 0"
            class="w-64"
            alt="qrcode pix"
            :src="'data:image/png;base64, ' + billing.mercadopago_qr_code_base64"
        >

        <a
            v-else
            href="#"
            @click.prevent="refresh"
        >
          <img
              class="w-64"
              alt="qrcode pix"
              src="/assets/img/qrcode.png"
          >

        </a>

      </div>
      <p>
        Código de pagamento:
      </p>

      <div class="flex flex-col w-full">

        <input
            @click="copyQrCode"
            class="mb-5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-slate-100 text-slate-400"
            type="text"
            :value="billing.mercadopago_qr_code"
        >

      </div>

      <p class="text-base font-bold mb-8 mt-8">
        Como pagar?
      </p>

      <div>

        <ul class="mt-8 mb-8 space-y-8">

          <li class="flex space-x-2">

            <div class="circle-count">

              <span>1</span>

            </div>

            <div>
              Entre no app ou site do seu banco e escolha a opção de pagamento via Pix.
            </div>

          </li>

          <li class="flex space-x-2">

            <div class="circle-count">

              <span>2</span>

            </div>

            <div>
              Escaneie o código QR ou copie e cole o código de pagamento.
            </div>

          </li>

          <li class="flex space-x-2">

            <div class="circle-count">

              <span>3</span>

            </div>

            <div>
              Pronto! O pagamento será creditado na hora e você receberá uma notificação de confirmação.
            </div>

          </li>

        </ul>

      </div>

      <p class="w-full text-xs text-center">
        O Pix tem um limite diário de transferências. Para mais informações, por favor, consulte seu banco.
      </p>

    </div>

    <Toast ref="toast" />

  </div>

</template>

<script>
import moment from "moment";
import { format } from "@/services/money.js";
import { format as formatDate } from "@/services/date.js";
import Toast from "@/components/elements/Toast.vue";

export default {
  name: "BillingBox",

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
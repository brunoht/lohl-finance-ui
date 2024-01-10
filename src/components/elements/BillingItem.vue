<template>
  <div class="grid space-y-1 w-full border p-3 rounded bg-white hover:shadow text-sm mb-3">

    <div class="flex justify-between">

      <div v-if="loading" class="text-xl font-bold text-slate-200 animate-pulse mb-2">

        <div class="h-7 w-28 bg-slate-200 rounded" />

      </div>

      <div v-else class="text-xl font-bold text-slate-500">

        {{ total }}

      </div>

      <div v-if="loading" class="text-lg font-bold text-yellow-200 animate-pulse mb-2">

        <div class="h-7 w-20 bg-slate-200 rounded" />

      </div>

      <div v-else class="text-lg font-bold text-yellow-500">

        <span
            :class="{
              'text-green-500': status === 'Aberta',
              'text-yellow-500': status === 'Vencendo',
              'text-red-500': status === 'Atrasada',
            }"
        >

          {{ status }}

        </span>

      </div>

    </div>

    <div class="flex justify-between">

      <div v-if="loading" class="flex justify-between animate-pulse">

        <div class="h-3 w-64 bg-slate-200 rounded" />

      </div>

      <div v-else class="flex justify-between">

        <div>{{ description }}</div>

      </div>

      <div
          v-if="billing?.installment > 0"
          class="font-bold text-slate-400"
      >

        {{ expire_date }}

      </div>

    </div>

    <div>

      <hr class="mt-2 mb-2">

    </div>

    <div v-if="loading" class="flex flex-col sm:flex-row sm:justify-between animate-pulse">

      <div class="h-9 w-28 bg-slate-200 rounded" />

    </div>

    <div v-else class="flex flex-col sm:flex-row sm:justify-between">

      <router-link
          :to="{ name: 'billing', params: { uuid: billing.uuid }}"
          class="text-center bg-indigo-700 hover:bg-indigo-600 text-white font-medium rounded pt-2 pb-2 pr-5 pl-5"
      >

        Pagar agora

      </router-link>

      <div v-if="status === 'Atrasada'" class="text-center text-red-700 text-xs">

        Fatura em atraso incidirá em juros, multa e bloqueio dos serviços.

      </div>

    </div>

  </div>
</template>

<script>
import moment from "moment"
import { format } from "@/services/money.js";
import { format as dateFormat } from "@/services/date.js"

export default {

  name: "BillingItem",

  props: ['billing', 'loading'],

  computed: {
    total () {
      let value = 0
      if (this.billing !== null) {
        value = this.billing.items.reduce((acc, item) => acc + item.price, 0)
      }
      return format(value)
    },

    status () {
      if (this.billing !== null) {
        let actualDate = new moment()
        let billingDataObj = new moment(this.billing.expire_at)

        // Configurando os horários para o início do dia
        actualDate = actualDate.startOf('day');
        billingDataObj = billingDataObj.startOf('day');

        if (billingDataObj > actualDate) return 'Aberta'
        else if (billingDataObj < actualDate) return 'Atrasada'
        else return 'Vencendo'
      }
      return null
    },

    expire_date() {
      return dateFormat(this.billing.expire_at)
    },

    description() {
      return `${ this.billing.contract.product.title } - ${ this.billing.contract.domain }`
    },
  }
}
</script>
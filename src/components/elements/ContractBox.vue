<template>
  <div class="grid content-center p-3 rounded border bg-white hover:shadow">
    <div class="space-y-2 text-sm">
      <div v-if="loading" class="mb-4 animate-pulse">
        <div class="h-6 w-full bg-slate-200 rounded mb-2"></div>
        <div class="h-3 w-full bg-slate-200 rounded"></div>
      </div>
      <div v-else class="mb-3">
        <h3 class="w-full text-lg text-slate-500 text-center font-medium">{{ localContract.domain }}</h3>
        <div class="w-full text-center text-xs">{{ localContract.product.title }}</div>
      </div>

      <div v-if="loading" class="flex justify-between animate-pulse mb-3">
        <div class="h-4 w-20 bg-slate-200 rounded"></div>
        <div class="h-4 w-20 bg-slate-200 rounded"></div>
      </div>
      <div v-else class="flex justify-between ">
        <div>
          <span v-if="localContract.total_installments > 1">{{ localContract.total_installments }}x</span>
          {{ formattedPrice }}
        </div>
        <div>Todo dia {{ localContract.expire_day }}</div>
      </div>

      <div v-if="loading" class="flex justify-between animate-pulse mb-8">
        <div class="h-4 w-20 bg-slate-200 rounded"></div>
        <div class="h-4 w-20 bg-slate-200 rounded"></div>
      </div>
      <div v-else class="flex justify-between">
        <div>Renovação</div>
        <div v-if="localContract.total_installments === 1">Mensal</div>
        <div v-else>Anual</div>
      </div>

      <div v-if="loading" class="flex justify-between animate-pulse pt-3">
        <div class="h-7 w-full bg-slate-200 rounded"></div>
      </div>
      <div v-else class="flex justify-between">
        <router-link
            :to="{ name: 'billings', params: {contractId: localContract.id, filter: 'abertas'}}"
            class="w-full text-center bg-indigo-700 hover:bg-indigo-600 text-white font-medium rounded sm:p-1 p-2 mt-2"
        >Ver Faturas</router-link>
      </div>

    </div>
  </div>
</template>

<script>
import { format } from "@/services/money.js"

export default {
  name: "ContractBox",
  props: ['contract', 'loading'],
  beforeMount() {
    this.localContract = Object.assign({}, this.contract)
  },
  data() {
    return {
      localContract: null
    }
  },
  computed: {
    formattedPrice() {
      return format(this.localContract.product.price / this.localContract.total_installments)
    }
  }

}
</script>
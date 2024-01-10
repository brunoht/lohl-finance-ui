<template>

  <layout>

    <div class="sm:mx-auto sm:w-full sm:max-w-sm">

      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">

        Acesso ao Painel Financeiro

      </h2>

    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">

      <form @submit.prevent="submit" class="space-y-6">

        <div>

          <div
              v-if="error || success"
              class="flex justify-center p-3 rounded text-center text-sm mb-5"
              :class="{'bg-red-200': error, 'bg-green-200': success}"
          >

            {{ error ?? success }}

          </div>

          <div class="flex items-center justify-between">

            <label for="cpf" class="block text-sm font-medium leading-6 text-gray-900">

              Digite seu CPF <small>apenas números</small>

            </label>

          </div>

          <div class="mt-2">

            <input
                v-model="cpf"
                :disabled="loading"
                id="cpf"
                type="text"
                maxlength="11"
                required
                autofocus
                autocomplete="off"
                placeholder="Ex: 11111111111"
                class="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >

            <div
                v-if="v$.cpf.$error"
                class="text-xs text-red-400 mt-1"
            >

              O CPF digitado é inválido.

            </div>

          </div>

        </div>

        <div>

          <button
              type="submit"
              :disabled="loading"
              :class="{'opacity-50': loading, 'hover:bg-indigo-500' : !loading}"
              class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 "
          >

            {{ !loading ? 'Entrar' : "Aguarde..." }}

          </button>

        </div>

      </form>

    </div>

  </layout>
  
</template>

<script>
import api from "@/services/api.js"
import Auth from '@/components/layouts/Auth.vue'
import { useVuelidate } from '@vuelidate/core'
import {required, minLength, maxLength, numeric} from '@vuelidate/validators'

export default {

  name: "Auth",

  components: {
    Layout: Auth
  },

  setup () {
    return { v$: useVuelidate() }
  },

  beforeMount() {
    const customerId = this.loadCustomerId()
    if (customerId) this.$router.push({name: 'contracts'})
  },

  data() {
    return {
      cpf: "",
      error: null,
      success: null,
      loading: false
    }
  },

  validations () {
    return {
      cpf: {
        required,
        numeric,
        minLength: minLength(11),
        maxLength: maxLength(11),
        $lazy: true
      }
    }
  },

  methods: {

    async submit() {
      const isValid = await this.v$.$validate()

      if (isValid) {
        this.loading = true
        this.error = null
        this.success = null

        api.post('/authenticate', {
          cpf: this.cpf
        })
        .then((response) => {
          const data = response.data.data

          if(data.authorized) {
            this.success = "Cadastro localizado. Redirecionando..."
            this.persistCustomerId(data.customer_id)
            this.$router.push({name: 'contracts'})
          } else {
            this.error = "Cadastro não localizado."
            this.cpf = ""
          }
        })
        .catch((error) => {
          this.error = "Cadastro não localizado."
          this.cpf = ""
          console.error(error);
        })
        .finally(() => {
          this.loading = false
          this.v$.$reset()
        });
      }
    },

    persistCustomerId(customer_id) {
      // TODO: implement a State Management (recommended: Pinia)
      this.$cookies.set('lohl_customer_id', customer_id)
    },

    loadCustomerId() {
      return this.$cookies.get('lohl_customer_id')
    }
  }
}
</script>


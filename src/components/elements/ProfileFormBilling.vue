<template>
  <form @submit.prevent="submitForm">
    <div class="space-y-8">
      <div class="border-b border-gray-900/10 pb-12">

        <H3>Dados de Cobrança</H3>
        <p class="mt-1 text-sm leading-6 text-gray-600"><b>Confira seus dados</b> e evite que inconsistências possam ser identificadas como fraude pelo sistema de pagamento.</p>

        <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div class="sm:col-span-2">
            <label for="cpf" class="block text-sm font-medium leading-6 text-gray-900">CPF</label>
            <div class="mt-2">
              <input v-model="form.cpf" id="cpf" type="text" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-slate-100 text-slate-400" disabled />
            </div>
          </div>

          <div class="sm:col-span-4">
            <label for="name" class="block text-sm font-medium leading-6 text-gray-900">Nome</label>
            <div class="mt-2">
              <input v-model="form.name" type="text" id="name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>

          <div class="sm:col-span-2">
            <label for="birthdate" class="block text-sm font-medium leading-6 text-gray-900">Data Nascimento</label>
            <div class="mt-2">
              <input v-model="form.birthdate" type="text" id="birthdate" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>

          <div class="sm:col-span-2">
            <label for="phone_01" class="block text-sm font-medium leading-6 text-gray-900">Telefone</label>
            <div class="mt-2">
              <input v-model="form.phone_01" id="phone_01" type="text" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>

          <div class="sm:col-span-2">
            <label for="phone_02" class="block text-sm font-medium leading-6 text-gray-900">Telefone</label>
            <div class="mt-2">
              <input v-model="form.phone_02" id="phone_02" type="text" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>

          <div class="sm:col-span-1">
            <label for="address_postcode" class="block text-sm font-medium leading-6 text-gray-900">CEP</label>
            <div class="mt-2">
              <input v-model="form.address_postcode" id="address_postcode" type="text" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>

          <div class="col-span-5">
            <label for="address" class="block text-sm font-medium leading-6 text-gray-900">Logradouro</label>
            <div class="mt-2">
              <input v-model="form.address" type="text" id="address" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>

          <div class="sm:col-span-1 sm:col-start-1">
            <label for="address_number" class="block text-sm font-medium leading-6 text-gray-900">Número</label>
            <div class="mt-2">
              <input v-model="form.address_number" type="text" id="address_number" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>

          <div class="sm:col-span-2">
            <label for="address_neighborhood" class="block text-sm font-medium leading-6 text-gray-900">Bairro</label>
            <div class="mt-2">
              <input v-model="form.address_neighborhood" type="text" id="address_neighborhood" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>

          <div class="sm:col-span-2">
            <label for="address_city" class="block text-sm font-medium leading-6 text-gray-900">Cidade</label>
            <div class="mt-2">
              <input v-model="form.address_city" type="text" id="address_city" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>

          <div class="sm:col-span-1">
            <label for="address_state" class="block text-sm font-medium leading-6 text-gray-900">Estado</label>
            <div class="mt-2">
              <select v-model="form.address_state" id="address_state" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                <option value="AC">AC</option>
                <option value="AL">AL</option>
                <option value="AP">AP</option>
                <option value="AM">AM</option>
                <option value="BA">BA</option>
                <option value="CE">CE</option>
                <option value="ES">ES</option>
                <option value="GO">GO</option>
                <option value="MA">MA</option>
                <option value="MT">MT</option>
                <option value="MS">MS</option>
                <option value="MG">MG</option>
                <option value="PA">PA</option>
                <option value="PB">PB</option>
                <option value="PR">PR</option>
                <option value="PE">PE</option>
                <option value="PI">PI</option>
                <option value="RJ">RJ</option>
                <option value="RN">RN</option>
                <option value="RS">RS</option>
                <option value="RO">RO</option>
                <option value="RR">RR</option>
                <option value="SC">SC</option>
                <option value="SP">SP</option>
                <option value="SE">SE</option>
                <option value="TO">TO</option>
                <option value="DF">DF</option>
              </select>
            </div>
          </div>
        </div>
      </div>

    </div>

    <div class="mt-6 flex items-center justify-end gap-x-6">
      <button @click="cancelForm" type="button" class="text-sm font-semibold leading-6 text-gray-900">Cancelar</button>
      <button type="submit" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Salvar alterações</button>
    </div>
  </form>
</template>


<script>
import { PhotoIcon, UserCircleIcon } from '@heroicons/vue/24/solid'
import H2 from '@/components/elements/H2.vue'
import H3 from '@/components/elements/H3.vue'
import {format, unformat} from "@/services/date.js";

export default {
  name: "ProfileFormBilling",

  props: ['data'],

  components: {
    PhotoIcon,
    UserCircleIcon,
    H2,
    H3,
  },

  data(){
    return {
      form: {
        cpf: null,
        name: null,
        email: null,
        phone: null,
        address_postcode: null,
        address: null,
        address_number: null,
        address_neighborhood: null,
        address_city: null,
        address_state: null,
      }
    }
  },

  beforeMount() {
    this.loadData()
  },

  methods: {
    loadData() {
      this.form.cpf = this.data.cpf
      this.form.birthdate = this.data.customer.birthdate ? format(this.data.customer.birthdate) : ''
      this.form.name = this.data.name
      this.form.phone_01 = this.data.customer.phone_01
      this.form.phone_02 = this.data.customer.phone_02
      this.form.address_postcode = this.data.customer.address_postcode
      this.form.address = this.data.customer.address
      this.form.address_number = this.data.customer.address_number
      this.form.address_neighborhood = this.data.customer.address_neighborhood
      this.form.address_city = this.data.customer.address_city
      this.form.address_state = this.data.customer.address_state
    },

    submitForm() {
      let formatedForm = Object.assign({}, this.form);
      formatedForm.birthdate = unformat(formatedForm.birthdate)
      console.log(formatedForm)
    },
    cancelForm() {
      this.loadData()
    }
  }
}
</script>


<template>
  <form @submit.prevent="submitForm">
    <div class="space-y-8">

      <div class="border-b border-gray-900/10 pb-12">
        <H3>Notificações</H3>
        <p class="mt-1 text-sm leading-6 text-gray-600">Notificações, lembretes e recuperações de senha serão enviados para estes contatos.</p>

        <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div class="sm:col-span-3">
            <label for="notification_email" class="block text-sm font-medium leading-6 text-gray-900">E-mail</label>
            <div class="mt-2">
              <input
                  v-model="form.notification_email"
                  type="email"
                  id="notification_email"
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  required
              />
            </div>
          </div>

          <div class="sm:col-span-3">
            <label for="notification_whatsapp" class="block text-sm font-medium leading-6 text-gray-900">Whatsapp</label>
            <div class="mt-2">
              <input v-model="form.notification_whatsapp" type="text" id="notification_whatsapp" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
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

export default {
  name: "ProfileFormNotification",
  props: ['data'],
  components: {
    PhotoIcon,
    UserCircleIcon,
    H2,
    H3,
  },

  beforeMount() {
    this.loadData()
  },

  data() {
    return {
      form: {
        notification_email: null,
        notification_whatsapp: null,
      }
    }
  },

  methods: {
    loadData() {
      this.form.notification_email = this.data.notification_email
      this.form.notification_whatsapp = this.data.notification_whatsapp
    },
    submitForm() {
      console.log(this.form)
    },
    cancelForm() {
      this.loadData()
    }
  }
}
</script>


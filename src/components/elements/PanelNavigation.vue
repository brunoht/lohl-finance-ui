<template>
  <header class="bg-white shadow">
    <nav class="mx-auto flex max-w-3xl items-center justify-between p-6" aria-label="Global">

      <div class="flex lg:flex-1">
        <router-link :to="{ name: 'auth' }" class="-m-1.5 p-1.5">
          <span class="sr-only">lohl</span>
          <span class="text-xl font-bold text-indigo-700">lohl</span>
        </router-link>
      </div>

      <div v-if="customerId !== null" class="flex flex-1 justify-end space-x-3">
        <Link :to="{ name: 'contracts' }">Dashboard</Link>
        <Link :to="{ name: 'profile', params: {filter: 'cobranca'} }">Meus Dados</Link>
        <Link :to="{ name: 'logout' }">Sair</Link>
      </div>

      <div v-else class="flex flex-1 justify-end space-x-3">
        <Link :to="{ name: 'auth' }">Entrar</Link>
      </div>
    </nav>

  </header>
</template>

<script>
import PanelNavigationLink from "@/components/elements/PanelNavigationLink.vue"
export default {
  name: "PanelNavigation",
  components: {
    Link: PanelNavigationLink
  },
  beforeMount() {
    this.customerId = this.loadCustomerId()
  },
  data() {
    return {
      customerId: null,
    }
  },
  methods: {
    loadCustomerId() {
      return this.$cookies.get('lohl_customer_id')
    },
  }
}
</script>
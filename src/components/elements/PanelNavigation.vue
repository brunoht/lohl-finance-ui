<template>
  <header class="bg-white shadow">
    <nav class="mx-auto flex max-w-3xl items-center justify-between p-6" aria-label="Global">

      <div class="flex lg:flex-1">
        <router-link :to="{ name: 'auth' }" class="-m-1.5 p-1.5">
          <span class="sr-only">lohl</span>
          <span class="text-xl font-bold text-indigo-700">lohl</span>
        </router-link>
      </div>

      <div v-if="isConnected" class="flex flex-1 justify-end space-x-3">
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
import {useAuthStore} from '@/stores/auth.js'
const auth = useAuthStore()

export default {
  name: "PanelNavigation",
  components: {
    Link: PanelNavigationLink
  },
  beforeMount() {
    if (auth.load()) this.isConnected = true
  },
  data() {
    return {
      isConnected: false,
    }
  }
}
</script>
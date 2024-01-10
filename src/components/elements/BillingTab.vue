<template>
  <div class="container mx-auto pl-5 pr-5 mb-2 mt-5 max-w-3xl">
    <ul class="flex flex-wrap -mb-px border-b border-gray-200">

      <li v-for="tab in tabs" class="mr-2">
        <router-link
            :to="{ name: 'billings', params: {filter: tab.filter} }"
            class="inline-block hover:text-gray-600 rounded-t-lg py-4 px-4 text-sm font-medium text-center border-transparent border-b-2"
            :class="{'border-blue-600 text-gray-600': $route.params.filter === tab.filter, 'text-gray-400 hover:border-gray-300' : $route.params.filter !== tab.filter}"
        >{{ tab.title }}</router-link>
      </li>

    </ul>
  </div>
</template>

<script>
export default {
  name: "BillingTab",
  data() {
    return {
      tabs: [
        { title: 'Abertas', filter: 'abertas'},
        { title: 'A pagar', filter: 'pendentes'},
        { title: 'Pagas', filter: 'pagas'},
      ]
    }
  }
}
</script>
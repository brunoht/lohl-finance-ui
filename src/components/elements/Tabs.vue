<template>
  <ul class="flex flex-wrap -mb-px border-b border-gray-200">
    <li v-for="tab in tabs" class="mr-2">
      <router-link
          :to="{ name: routerName, params: {filter: tab.filter} }"
          class="inline-block hover:text-gray-600 rounded-t-lg py-4 px-4 text-sm font-medium text-center border-transparent border-b-2"
          :class="{'border-blue-600 text-gray-600': $route.params.filter === tab.filter, 'text-gray-400 hover:border-gray-300' : $route.params.filter !== tab.filter}"
      >{{ tab.title }}</router-link>
    </li>
  </ul>
</template>

<script>
export default {
  name: "Tabs",
  props: ['tabs', 'routerName'],
}
</script>
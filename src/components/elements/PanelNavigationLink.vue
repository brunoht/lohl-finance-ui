<template>
  <router-link :to="to" class="text-sm font-semibold leading-6 text-gray-900">
    <slot></slot>
  </router-link>
</template>

<script>
export default {
  name: "PanelNavigationLink",
  props: ['to']
}
</script>



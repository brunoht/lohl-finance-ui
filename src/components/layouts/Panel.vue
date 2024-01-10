<template>
  <div>
    <navigation />
    <div class="container mx-auto max-w-3xl pb-4">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import PanelNavigation from "@/components/elements/PanelNavigation.vue"
export default {
  name: "Panel",
  components: {
    Navigation: PanelNavigation
  }
}
</script>
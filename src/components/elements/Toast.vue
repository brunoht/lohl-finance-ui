<template>
  <div v-if="show"
       class="fixed bottom-4 right-4  text-white p-4 rounded shadow"
       :class="{'bg-green-500': status === 'success', 'bg-red-500': status === 'error'}"
  >
    {{ message }}
  </div>
</template>

<script>
export default {
  name: "Toast",
  data() {
    return {
      show: false,
      message: '',
      status: 'success'
    };
  },
  methods: {
    showToast(message, status = 'success') {
      this.message = message;
      this.show = true;
      this.status = status

      setTimeout(() => {
        this.show = false;
      }, 3000);
    },
  },
};
</script>
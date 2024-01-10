<template>
  <main class="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">

    <div class="text-center">

      <p class="text-base font-semibold text-indigo-600">
        Oops, algo não deu certo :(
      </p>

      <h1 class="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
        {{ title }}
      </h1>

      <p class="mt-6 text-base leading-7 text-gray-600">
        {{ message }}
      </p>

      <p v-if="code" class="mt-2 text-xs text-gray-500">
        Code: {{ code }}
      </p>

    </div>
  </main>
</template>


<script>
export default {

  name: "NotFound",

  props: ['title', 'message', 'code']
}
</script>
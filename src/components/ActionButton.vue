<template>
  <button
    class="rounded border-0 bg-brand-blue-1 px-5 py-3 font-medium text-white hover:shadow-blue"
    v-on:click="handleClick"
  >
    Sign in
  </button>
</template>

<script>
export default {
  name: 'ActionButton',
  methods: {
    handleClick() {
      console.log("I've been clicked")
    }
  }
}
</script>

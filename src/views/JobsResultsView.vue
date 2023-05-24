<template>
  <h1 class="text-6xl font-bold">Job results page</h1>
  <button @click="goToHome">Go to home page</button>
</template>

<script>
export default {
  name: 'JobsResultsView',
  methods: {
    goToHome() {
      // Can use path or name, but name could be argued that it's less likely to change than a path
      this.$router.push({ name: 'Home' })
    }
  }
}
</script>

<template>
  <section>
    <h1>Build for everyone</h1>
    <h2>Find your next job at Corp</h2>
  </section>
</template>

<script>
export default {
  name: 'Headline',
  data() {
    return {
      sample: 'Hello'
    }
  },
  created() {
    console.log('Creating, greeting now: ' + this.sample)
  }
}
</script>

<template>
  <section>
    <h1>{{ action }} for everyone</h1>
    <h2>Find your next job at Corp</h2>
  </section>
</template>

<script>
export default {
  name: 'Headline',
  data() {
    return {
      action: 'Build',
      interval: null
    }
  },
  created() {
    this.changeTitle()
  },
  beforeUnmount() {
    clearInterval(this.interval)
  },
  methods: {
    changeTitle() {
      this.interval = setInterval(() => {
        const actions = ['Build', 'Create', 'Design', 'Code']
        const currentActionIdex = actions.indexOf(this.action)
        const nextActionIndex = (currentActionIdex + 1) % 4
        const nextAction = actions[nextActionIndex]
        this.action = nextAction
      }, 3000)
    }
  }
}
</script>

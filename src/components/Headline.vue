<template>
  <section class="mb-16">
    <h1 class="mb-14 text-8xl font-bold tracking-tighter">
      <span :class="actionClasses">{{ action }} </span><br />
      for everyone
    </h1>
    <h2 class="text-3xl font-light">Find your next job at Corp</h2>
  </section>
</template>

<script>
import nextElementInList from '@/utils/NextElementInList.js'

export default {
  name: 'Headline',
  data() {
    return {
      action: 'Build',
      interval: null
    }
  },
  computed: {
    actionClasses() {
      return {
        [this.action.toLocaleLowerCase()]: true
      }
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
        this.action = nextElementInList(actions, this.action)
      }, 3000)
    }
  }
}
</script>

<style scope>
.build {
  color: #1a73e8;
}

.create {
  color: #34a853;
}

.design {
  color: #f9ab00;
}

.code {
  color: #d93025;
}
</style>

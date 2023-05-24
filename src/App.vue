<template>
  <MainNav />
  <Hero />
</template>

<script>
import MainNav from '@/components/navigation/MainNav.vue'
import Hero from '@/components/Hero.vue'
export default {
  name: 'App',
  components: {
    MainNav,
    Hero
  }
}
</script>

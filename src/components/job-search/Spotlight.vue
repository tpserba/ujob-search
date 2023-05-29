<template>
  <ul>
    <li v-for="spotlight in spotlights" :key="spotlight.id">
      <slot
        :img="spotlight.img"
        :title="spotlight.title"
        :description="spotlight.description"
      ></slot>
    </li>
  </ul>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Spotlight',
  data() {
    return {
      spotlights: []
    }
  },
  async mounted() {
    const baseURL = import.meta.env.VITE_APP_API_URL
    const url = `${baseURL}/spotlights`
    const response = await axios.get(url)
    this.spotlights = response.data
  }
}
</script>

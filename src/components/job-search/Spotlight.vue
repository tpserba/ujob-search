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

<script setup>
import axios from 'axios'
import { computed, onMounted, ref } from 'vue'
const spotlights = ref([])
const getSpotlights = async () => {
  const baseURL = import.meta.env.VITE_APP_API_URL
  const url = `${baseURL}/spotlights`
  const response = await axios.get(url)
  spotlights.value = response.data
}
onMounted(getSpotlights)
</script>

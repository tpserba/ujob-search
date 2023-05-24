<template>
  <div>
    <RouterLink to="/">Home</RouterLink> |
    <RouterLink to="/job/results">Job results</RouterLink>
  </div>
  <RouterView />
</template>

<script>
export default {
  name: 'App'
}
</script>

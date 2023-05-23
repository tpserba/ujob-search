<template>
  <img :src="image" class="h-8 w-8 rounded-3xl object-contain" alt="Image of the user" />
</template>

<script>
export default {
  name: 'ProfileImage',
  data() {
    return {
      image:
        'https://icons.iconarchive.com/icons/double-j-design/origami-colored-pencil/48/blue-user-icon.png'
    }
  }
}
</script>

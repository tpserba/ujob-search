<template>
  <form class="flex h-12 w-full items-center rounded-3xl border border-solid border-brand-grey-3">
    <FontAwesomeIcon :icon="['fas', 'search']" class="ml-4 mr-3" />
    <div class="flex h-full flex-1 flex-nowrap text-base font-light">
      <div class="relative flex h-full flex-1 items-center pr-3">
        <label class="absolute -top-10 left-0">Role</label>
        <TextInput placeholder="Software engineer" @handleInput="updateRole" />
      </div>
      <span
        class="flex h-full items-center border-l border-r border-brand-grey-3 bg-brand-grey-2 px-3"
        >in</span
      >
      <div class="relative flex h-full flex-1 items-center pl-3">
        <label class="absolute -top-10 left-0">Where?</label>
        <TextInput placeholder="Los Angeles" @handleInput="location = $event" />
      </div>
    </div>
    <ActionButton text="Search" type="secondary" class="rounded-r-3xl" />
  </form>
</template>

<script>
import ActionButton from '@/components/shared/ActionButton.vue'
import TextInput from '@/components/shared/TextInput.vue'
export default {
  name: 'JobSearchForm',
  components: {
    ActionButton,
    TextInput
  },
  data() {
    return {
      role: '',
      location: ''
    }
  },
  methods: {
    updateRole(payload) {
      this.role = payload
    }
  }
}
</script>

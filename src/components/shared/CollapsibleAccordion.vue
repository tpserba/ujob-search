<template>
  <div class="border-b border-solid border-brand-grey-2 py-5">
    <div
      role="button"
      class="flex cursor-pointer flex-wrap items-center justify-between"
      @click="open"
    >
      <h3 class="text-base font-semibold">{{ header }}</h3>
      <FontAwesomeIcon :icon="caretIcon" />
    </div>
    <div v-if="isOpen" class="mt-5 w-full">
      <slot>
        <p>Fallback content</p>
      </slot>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
export default {
  name: 'CollapsibleAccordion',
  props: {
    header: {
      type: String,
      required: true
    }
  },
  setup() {
    const isOpen = ref(false)

    const open = () => {
      isOpen.value = !isOpen.value
    }

    const caretIcon = computed(() => {
      return isOpen.value ? ['fas', 'angle-up'] : ['fas', 'angle-down']
    })
    return {
      open,
      isOpen,
      caretIcon
    }
  }
}
</script>

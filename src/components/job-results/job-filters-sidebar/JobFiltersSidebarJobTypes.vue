<template>
  <CollapsibleAccordion header="Job types">
    <div class="mt-5">
      <fieldset>
        <ul class="flex flex-row flex-wrap">
          <li v-for="jobType in UNIQUE_JOB_TYPES" :key="jobType" class="h-8 w-1/2">
            <input
              :id="jobType"
              v-model="selectedJobTypes"
              @change="selectJobType"
              :value="jobType"
              type="checkbox"
              class="mr-3"
            />
            <label :for="jobType">{{ jobType }}</label>
          </li>
        </ul>
      </fieldset>
    </div>
  </CollapsibleAccordion>
</template>

<script setup>
import { ref, computed } from 'vue'
import { mapActions, mapState } from 'pinia'
import { useRouter } from 'vue-router'
import { useUserStore, ADD_SELECTED_JOB_TYPES } from '@/stores/user'
import { useJobsStore } from '@/stores/jobs'
import CollapsibleAccordion from '@/components/shared/CollapsibleAccordion.vue'
const selectedJobTypes = ref([])
const jobsStore = useJobsStore()
const UNIQUE_JOB_TYPES = computed(() => jobsStore.UNIQUE_JOB_TYPES)
const userStore = useUserStore()
const router = useRouter()
const selectJobType = () => {
  userStore.ADD_SELECTED_JOB_TYPES(selectedJobTypes.value)
  router.push({ name: 'JobsResult' })
}
</script>

<template>
  <div class="flex w-96 flex-col border-r border-solid border-brand-grey-1 bg-white p-4">
    <section class="pb-5">
      <div class="flex flex-row justify-between">
        <h3 class="my-4 text-base font-semibold">What do you want to do?</h3>
        <div class="flex items-center text-sm">
          <ActionButton text="Clear filter" type="secondary" />
        </div>
      </div>
      <CollapsibleAccordion header="Degree" />
      <JobFiltersSidebarCheckboxGroup
        header="Job Types"
        :uniqueValues="UNIQUE_JOB_TYPES"
        :action="userStore.ADD_SELECTED_JOB_TYPES"
      />
      <JobFiltersSidebarCheckboxGroup
        header="Organizations"
        :uniqueValues="UNIQUE_ORGS"
        :action="userStore.ADD_SELECTED_ORGS"
      />
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import ActionButton from '@/components/shared/ActionButton.vue'
import CollapsibleAccordion from '@/components/shared/CollapsibleAccordion.vue'
import JobFiltersSidebarCheckboxGroup from '@/components/job-results/job-filters-sidebar/JobFiltersSidebarCheckboxGroup.vue'
import { useJobsStore } from '@/stores/jobs'
import { useUserStore } from '@/stores/user'

const jobsStore = useJobsStore()
const UNIQUE_ORGS = computed(() => jobsStore.UNIQUE_ORGS)
const UNIQUE_JOB_TYPES = computed(() => jobsStore.UNIQUE_JOB_TYPES)
const userStore = useUserStore()
</script>

<template>
  <div class="h-16 w-full border-b border-solid border-brand-grey-1 bg-white">
    <div class="flex h-full items-center px-8">
      <div v-if="onJobsResultsPage">
        <FontAwesomeIcon :icon="['fas', 'search']" class="mr-3" />
        <span
          ><span class="text-brand-green-1">{{ FILTERED_JOBS_BY_ORGS.length }}</span> jobs
          matched</span
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'pinia'
import { useJobsStore, FILTERED_JOBS_BY_ORGS } from '@/stores/jobs'
export default {
  name: 'SubNav',
  computed: {
    ...mapState(useJobsStore, [FILTERED_JOBS_BY_ORGS]),
    onJobsResultsPage() {
      return this.$route.name === 'JobsResults'
    }
  }
}
</script>

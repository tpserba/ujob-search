<template>
  <div class="flex w-full flex-row flex-nowrap">
    <JobFilterSidebar />
    <JobListings />
  </div>
</template>

<script>
import JobFilterSidebar from '@/components/job-results/job-filter-sidebar/JobFilterSidebar.vue'
import JobListings from '@/components/job-results/JobListings.vue'
export default {
  name: 'JobsResultsView',
  components: {
    JobFilterSidebar,
    JobListings
  }
}
</script>

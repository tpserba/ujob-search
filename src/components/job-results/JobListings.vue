<template>
  <main class="flex-auto bg-brand-grey-2 p-8">
    <ol>
      <JobListing />
      <JobListing />
      <JobListing />
    </ol>
  </main>
</template>

<script>
import JobListing from '@/components/job-results/JobListing.vue'
export default {
  name: 'JobListings',
  components: {
    JobListing
  }
}
</script>

<template>
  <main class="flex-auto bg-brand-grey-2 p-8">
    <ol>
      <JobListing v-for="job in displayedJobs" :key="job.id" :job="job" />
    </ol>
  </main>
</template>

<script>
import axios from 'axios'
import JobListing from '@/components/job-results/JobListing.vue'
const url = 'http://localhost:3000/jobs'
export default {
  name: 'JobListings',
  components: {
    JobListing
  },
  data() {
    return {
      jobs: []
    }
  },
  computed: {
    displayedJobs() {
      return this.jobs.slice(0, 10)
    }
  },
  async mounted() {
    const response = await axios.get(url)
    this.jobs = response.data
  }
}
</script>

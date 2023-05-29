<template>
  <main class="flex-auto bg-brand-grey-2 p-8">
    <ol>
      <JobListing v-for="job in displayedJobs" :key="job.id" :job="job" />
    </ol>
    <div class="mx-auto mt-8">
      <div class="flex flex-row flex-nowrap">
        <p class="flex-grow text-sm">Page {{ this.currentPage }}</p>
        <div class="flex items-center justify-center">
          <RouterLink
            role="link"
            :to="{ name: 'JobsResults', query: { page: previousPage } }"
            v-if="previousPage"
            class="mx-3 text-sm font-semibold text-brand-blue-1"
            >Previous</RouterLink
          >
          <!-- Aria role added to avoid tests failing. Anchor tags without href attribute make tests fail, so we explicitly put the role here, 
            which ends up as attribute of the top element in the implementation.-->
          <RouterLink
            role="link"
            :to="{ name: 'JobsResults', query: { page: nextPage } }"
            v-if="nextPage"
            class="mx-3 text-sm font-semibold text-brand-blue-1"
            >Next</RouterLink
          >
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import JobListing from '@/components/job-results/JobListing.vue'
import { mapActions, mapState } from 'pinia'
import { useJobsStore, FETCH_JOBS, FILTERED_JOBS_BY_ORGS } from '@/stores/jobs'

export default {
  name: 'JobListings',
  components: {
    JobListing
  },
  computed: {
    currentPage() {
      return Number.parseInt(this.$route.query.page || '1')
    },
    previousPage() {
      const previousPage = this.currentPage - 1
      const firstPage = 1
      return previousPage >= firstPage ? previousPage : undefined
    },
    ...mapState(useJobsStore, {
      FILTERED_JOBS_BY_ORGS,
      nextPage() {
        const nextPage = this.currentPage + 1
        const maxPage = Math.ceil(this.FILTERED_JOBS_BY_ORGS.length / 10)
        return nextPage <= maxPage ? nextPage : undefined
      },
      displayedJobs() {
        // falls back to first page if page property doesn't exist
        const pageNumber = this.currentPage
        const firstJobIndex = (pageNumber - 1) * 10
        const lastJobIndex = pageNumber * 10
        return this.FILTERED_JOBS_BY_ORGS.slice(firstJobIndex, lastJobIndex)
      }
    })
  },
  async mounted() {
    this.FETCH_JOBS()
  },
  methods: {
    ...mapActions(useJobsStore, [FETCH_JOBS])
  }
}
</script>

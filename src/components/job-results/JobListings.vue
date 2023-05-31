<template>
  <main class="flex-auto bg-brand-grey-2 p-8">
    <ol>
      <JobListing v-for="job in displayedJobs" :key="job.id" :job="job" />
    </ol>
    <div class="mx-auto mt-8">
      <div class="flex flex-row flex-nowrap">
        <p class="flex-grow text-sm">Page {{ currentPage }}</p>
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

<script setup>
import JobListing from '@/components/job-results/JobListing.vue'
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useJobsStore } from '@/stores/jobs'

const jobsStore = useJobsStore()
onMounted(jobsStore.FETCH_JOBS)

const route = useRoute()
const currentPage = computed(() => Number.parseInt(route.query.page || '1'))
const previousPage = computed(() => {
  const previousPage = currentPage.value - 1
  const firstPage = 1
  return previousPage >= firstPage ? previousPage : undefined
})

const FILTERED_JOBS = computed(() => jobsStore.FILTERED_JOBS)

const nextPage = computed(() => {
  const nextPage = currentPage.value + 1
  const maxPage = Math.ceil(FILTERED_JOBS.value.length / 10)
  return nextPage <= maxPage ? nextPage : undefined
})

const displayedJobs = computed(() => {
  // falls back to first page if page property doesn't exist
  const pageNumber = currentPage.value
  const firstJobIndex = (pageNumber - 1) * 10
  const lastJobIndex = pageNumber * 10
  return FILTERED_JOBS.value.slice(firstJobIndex, lastJobIndex)
})
</script>

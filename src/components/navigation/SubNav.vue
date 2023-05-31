<template>
  <div class="h-16 w-full border-b border-solid border-brand-grey-1 bg-white">
    <div class="flex h-full items-center px-8">
      <div v-if="onJobsResultsPage">
        <FontAwesomeIcon :icon="['fas', 'search']" class="mr-3" />
        <span
          ><span class="text-brand-green-1">{{ FILTERED_JOBS.length }}</span> jobs matched</span
        >
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import {useRoute} from 'vue-router' 
import { useJobsStore, FILTERED_JOBS } from '@/stores/jobs'
// Declares a reactive route object 
const route = useRoute();
const onJobsResultsPage = computed(()=> {

})
// export default {
//   name: 'SubNav',
//   computed: {
//     ...mapState(useJobsStore, [FILTERED_JOBS]),
//     onJobsResultsPage() {
//       return this.$route.name === 'JobsResults'
//     }
//   }
// }
</script>

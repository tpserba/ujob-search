<template>
  <CollapsibleAccordion header="Organizations">
    <div class="mt-5">
      <fieldset>
        <ul class="flex flex-row flex-wrap">
          <li class="h-8 w-1/2">
            <input id="VueTeam" type="checkbox" class="mr-3" />
            <label for="VueTeam">VueTeam</label>
          </li>
          <li class="h-8 w-1/2">
            <input id="Microsoft" type="checkbox" class="mr-3" />
            <label for="Microsoft">Microsoft</label>
          </li>
          <li class="h-8 w-1/2">
            <input id="Google" type="checkbox" class="mr-3" />
            <label for="Google">Google</label>
          </li>
          <li class="h-8 w-1/2">
            <input id="Lorem" type="checkbox" class="mr-3" />
            <label for="Lorem">Lorem</label>
          </li>
        </ul>
      </fieldset>
    </div>
  </CollapsibleAccordion>
</template>

<script>
import { mapState } from 'pinia'
import { useJobsStore, UNIQUE_ORGS } from '@/stores/jobs'
import CollapsibleAccordion from '@/components/shared/CollapsibleAccordion.vue'
export default {
  name: 'JobFiltersSidebarOrganizations',
  components: {
    CollapsibleAccordion
  },
  computed: {
    ...mapState(useJobsStore, [UNIQUE_ORGS])
  }
}
</script>

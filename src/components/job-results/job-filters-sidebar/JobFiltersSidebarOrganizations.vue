<template>
  <CollapsibleAccordion header="Organizations">
    <div class="mt-5">
      <fieldset>
        <ul class="flex flex-row flex-wrap">
          <li v-for="org in UNIQUE_ORGS" :key="org" class="h-8 w-1/2">
            <input :id="org" v-model="selectedOrgs" :value="org" type="checkbox" class="mr-3" />
            <label :for="org">{{ org }}</label>
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
  data() {
    return {
      selectedOrgs: []
    }
  },
  computed: {
    ...mapState(useJobsStore, [UNIQUE_ORGS])
  }
}
</script>

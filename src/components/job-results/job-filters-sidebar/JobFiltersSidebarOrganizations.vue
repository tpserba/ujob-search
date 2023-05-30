<template>
  <CollapsibleAccordion header="Organizations">
    <div class="mt-5">
      <fieldset>
        <ul class="flex flex-row flex-wrap">
          <li v-for="org in UNIQUE_ORGS" :key="org" class="h-8 w-1/2">
            <input
              :id="org"
              v-model="selectedOrgs"
              @change="selectOrg"
              :value="org"
              type="checkbox"
              class="mr-3"
            />
            <label :for="org">{{ org }}</label>
          </li>
        </ul>
      </fieldset>
    </div>
  </CollapsibleAccordion>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { useUserStore, ADD_SELECTED_ORGS } from '@/stores/user'
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
  },
  methods: {
    // Spreads actions so they become available with "this" keyword
    ...mapActions(useUserStore, [ADD_SELECTED_ORGS]),
    selectOrg() {
      this.ADD_SELECTED_ORGS(this.selectedOrgs)
      this.$router.push({ name: 'JobsResults' })
    }
  }
}
</script>

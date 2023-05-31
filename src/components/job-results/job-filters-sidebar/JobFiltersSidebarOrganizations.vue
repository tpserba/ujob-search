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

<script setup>
import { useUserStore, ADD_SELECTED_ORGS } from '@/stores/user'
import { useJobsStore } from '@/stores/jobs'
import CollapsibleAccordion from '@/components/shared/CollapsibleAccordion.vue'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
const selectedOrgs = ref([])
const jobsStore = useJobsStore()
const UNIQUE_ORGS = computed(() => jobsStore.UNIQUE_ORGS)

const userStore = useUserStore()
const router = useRouter()
const selectOrg = () => {
  userStore.ADD_SELECTED_ORGS(selectedOrgs.value)
  router.push({ name: 'JobsResults' })
}
</script>

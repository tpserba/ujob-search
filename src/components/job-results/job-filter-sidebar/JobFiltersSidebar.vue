<template>
  <div class="flex w-96 flex-col border-r border-solid border-brand-grey-1 bg-white p-4">
    <section class="pb-5">
      <div class="flex flex-row justify-between">
        <h3 class="my-4 text-base font-semibold">What do you want to do?</h3>
        <div class="flex items-center text-sm">
          <ActionButton text="Clear filter" type="secondary" />
        </div>
      </div>
      <JobFiltersSidebarOrganizations />
    </section>
  </div>
</template>

<script>
import ActionButton from '@/components/shared/ActionButton.vue'
import CollapsibleAccordion from '@/components/shared/CollapsibleAccordion.vue'
import JobFiltersSidebarOrganizations from '@/components/job-results/job-filter-sidebar/JobFiltersSidebarOrganizations.vue'
export default {
  name: 'JobFiltersSidebar',
  components: {
    ActionButton,
    CollapsibleAccordion,
    JobFiltersSidebarOrganizations
  }
}
</script>

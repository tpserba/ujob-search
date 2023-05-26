<template>
  <div class="flex w-96 flex-col border-r border-solid border-brand-grey-1 bg-white p-4">
    <section class="pb-5">
      <div class="flex flex-row justify-between">
        <h3 class="my-4 text-base font-semibold">What do you want to do?</h3>
        <div class="flex items-center text-sm">
          <ActionButton text="Clear filter" type="secondary" />
        </div>
      </div>
      <CollapsibleAccordion>
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
        </div></CollapsibleAccordion
      >
    </section>
  </div>
</template>

<script>
import ActionButton from '@/components/shared/ActionButton.vue'
import CollapsibleAccordion from '@/components/shared/CollapsibleAccordion.vue'
export default {
  name: 'JobFilterSidebar',
  components: {
    ActionButton,
    CollapsibleAccordion
  }
}
</script>

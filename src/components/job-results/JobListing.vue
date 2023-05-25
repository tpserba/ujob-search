<template>
  <li class="mb-7">
    <RouterLink
      to="/jobs/results/1"
      class="rounder hover:shadow-grey mx-auto block border border-solid border-brand-grey-2 bg-white"
    >
      <div class="mx-8 border-b border-solid border-brand-grey-2 pb-2 pt-5">
        <h2 class="mb-2 text-2xl">Project lead</h2>
        <div class="flex flex-row align-middle">
          <div class="mr-5">
            <span>Corp</span>
          </div>
          <div><span>San Francisco, CA, USA</span></div>
        </div>
      </div>
      <div class="px-8 py-4">
        <div>
          <h3 class="mb-2 mt-1">Qualifications</h3>
          <div>
            <ul class="list-disc pl-8">
              <li>Bachelor's degree or equivalent</li>
              <li>5 years or more in program management</li>
              <li>
                Experience analyzing data through querying database(e.g. SQL). Lorem ipsum lorem
                ipsum lorem ipsum
              </li>
            </ul>
          </div>
        </div>
        <div class="mt-2 text-center">
          <RouterLink to="/jobs/results/1" class="text-brand-blue-1">Expand</RouterLink>
        </div>
      </div>
    </RouterLink>
  </li>
</template>

<script>
export default {
  name: 'JobListing'
}
</script>

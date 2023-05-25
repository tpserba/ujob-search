<template>
  <main class="flex-auto bg-brand-grey-2 p-8">
    <ol>
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
          </div></RouterLink
        >
      </li>
    </ol>
  </main>
</template>

<script>
export default {
  name: 'JobListings'
}
</script>

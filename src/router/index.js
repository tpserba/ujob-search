import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import JobsResultsView from '@/views/JobsResultsView.vue'
import JobView from '@/views/JobView.vue'
const routes = [
  {
    path: '/',
    component: HomeView,
    name: 'Home'
  },
  {
    path: '/jobs/results',
    component: JobsResultsView,
    name: 'JobsResults'
  },
  {
    path: '/jobs/results/:id',
    component: JobView,
    name: 'JobListing'
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return {
      top: 0,
      left: 0,
      behavior: 'smooth'
    }
  }
})

export default router

import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import JobsResultsView from '@/views/JobsResultsView.vue'

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
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

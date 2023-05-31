import { render, screen } from '@testing-library/vue'
import SubNav from '@/components/navigation/SubNav.vue'
import { createTestingPinia } from '@pinia/testing'
import { useJobsStore } from '@/stores/jobs'

import { useRoute } from 'vue-router'
import { vi } from 'vitest'

vi.mock('vue-router')

describe('SubNav', () => {
  const renderSubNav = () => {
    const pinia = createTestingPinia()
    const jobsStore = useJobsStore()
    render(SubNav, {
      global: {
        plugins: [pinia],

        stubs: {
          FontAwesomeIcon: true
        }
      }
    })
    return { jobsStore }
  }
  describe('When user is on jobs page', () => {
    it('Displays job count', async () => {
      useRoute.mockReturnValue({ name: 'JobsResults' })
      const { jobsStore } = renderSubNav()
      const numOfJobs = 16
      jobsStore.FILTERED_JOBS = Array(numOfJobs).fill({})

      const jobCount = await screen.findByText(numOfJobs)
      expect(jobCount).toBeInTheDocument()
    })
  })

  describe('When user is not on jobs page', () => {
    it('Does not display job count', () => {
      useRoute.mockReturnValue({ name: 'Home' })
      const { jobsStore } = renderSubNav()
      const numOfJobs = 16
      jobsStore.FILTERED_JOBS = Array(numOfJobs).fill({})

      const jobCount = screen.queryByText(numOfJobs)
      expect(jobCount).not.toBeInTheDocument()
    })
  })
})

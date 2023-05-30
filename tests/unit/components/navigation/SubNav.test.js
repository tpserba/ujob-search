import { render, screen } from '@testing-library/vue'
import SubNav from '@/components/navigation/SubNav.vue'
import { createTestingPinia } from '@pinia/testing'
import { useJobsStore } from '@/stores/jobs'

describe('SubNav', () => {
  const renderSubNav = (routeName) => {
    const pinia = createTestingPinia()
    const jobsStore = useJobsStore()

    render(SubNav, {
      global: {
        plugins: [pinia],
        mocks: {
          // Replaces this.$route with our mock
          $route: {
            name: routeName
          } // could be simply $route since name is the same, left for showcase
        },
        stubs: {
          FontAwesomeIcon: true
        }
      }
    })
    return { jobsStore }
  }
  describe('When user is on jobs page', () => {
    it('Displays job count', async () => {
      const routeName = 'JobsResults'
      const { jobsStore } = renderSubNav(routeName)
      const numOfJobs = 16
      jobsStore.FILTERED_JOBS = Array(numOfJobs).fill({})

      const jobCount = await screen.findByText(numOfJobs)
      expect(jobCount).toBeInTheDocument()
    })
  })

  describe('When user is not on jobs page', () => {
    it('Does not display job count', () => {
      const routeName = 'Home'
      const { jobsStore } = renderSubNav(routeName)
      const numOfJobs = 16
      jobsStore.FILTERED_JOBS = Array(numOfJobs).fill({})

      const jobCount = screen.queryByText(numOfJobs)
      expect(jobCount).not.toBeInTheDocument()
    })
  })
})

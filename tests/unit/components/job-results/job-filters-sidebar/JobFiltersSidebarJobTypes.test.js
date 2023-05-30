import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import { createTestingPinia } from '@pinia/testing'
import JobFiltersSidebarJobTypes from '@/components/job-results/job-filters-sidebar/JobFiltersSidebarJobTypes.vue'
import { useUserStore } from '@/stores/user'
import { useJobsStore } from '@/stores/jobs'
import { vi } from 'vitest'

describe('JobFiltersSidebarJobTypes', () => {
  const renderJobFiltersSidebarJobTypes = () => {
    const pinia = createTestingPinia()
    const jobsStore = useJobsStore()
    const userStore = useUserStore()
    const $router = { push: vi.fn() }
    render(JobFiltersSidebarJobTypes, {
      global: {
        mocks: {
          $router
        },
        plugins: [pinia],
        stubs: {
          FontAwesomeIcon: true
        }
      }
    })
    return { jobsStore, userStore, $router }
  }
  it('renders a unique list of job types from jobs', async () => {
    const { jobsStore } = renderJobFiltersSidebarJobTypes()
    jobsStore.UNIQUE_JOB_TYPES = new Set(['full-time', 'part-time'])

    const button = screen.getByRole('button', { name: /job types/i })
    await userEvent.click(button)
    const jobTypesListItems = screen.getAllByRole('listitem')
    const jobTypes = jobTypesListItems.map((node) => node.textContent)
    expect(jobTypes).toEqual(['full-time', 'part-time'])
  })

  describe('when user clicks checkbox', () => {
    it('communicates that user has selected checkbox for job type', async () => {
      const { jobsStore, userStore } = renderJobFiltersSidebarJobTypes()
      jobsStore.UNIQUE_JOB_TYPES = new Set(['full-time', 'part-time'])

      const button = screen.getByRole('button', { name: /job types/i })
      await userEvent.click(button)
      const fullTimeCheckbox = screen.getByRole('checkbox', {
        name: /full-time/i
      })
      await userEvent.click(fullTimeCheckbox)

      expect(userStore.ADD_SELECTED_JOB_TYPES).toHaveBeenCalledWith(['full-time'])
    })

    it('navigates user to JobsResults page to see fresh batch of filtered jobs', async () => {
      const { jobsStore, $router } = renderJobFiltersSidebarJobTypes()
      jobsStore.UNIQUE_JOB_TYPES = new Set(['full-time'])

      const button = screen.getByRole('button', { name: /job types/i })
      await userEvent.click(button)
      const fullTimeCheckbox = screen.getByRole('checkbox', {
        name: /full-time/i
      })
      await userEvent.click(fullTimeCheckbox)

      expect($router.push).toHaveBeenCalledWith({ name: 'JobsResults' })
    })
  })
})

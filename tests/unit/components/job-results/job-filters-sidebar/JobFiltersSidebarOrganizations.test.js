import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import { createTestingPinia } from '@pinia/testing'
import JobFiltersSidebarOrganizations from '@/components/job-results/job-filters-sidebar/JobFiltersSidebarOrganizations.vue'
import { useUserStore } from '@/stores/user'
import { useJobsStore } from '@/stores/jobs'
import { vi } from 'vitest'
import { useRouter } from 'vue-router'

vi.mock('vue-router')
describe('JobFiltersSidebarOrganizations', () => {
  const renderJobFiltersSidebarOrganizations = () => {
    const pinia = createTestingPinia()
    const jobsStore = useJobsStore()
    const userStore = useUserStore()
    render(JobFiltersSidebarOrganizations, {
      global: {
        plugins: [pinia],
        stubs: {
          FontAwesomeIcon: true
        }
      }
    })
    return { jobsStore, userStore }
  }
  it('renders a unique list of organizations from jobs', async () => {
    const { jobsStore } = renderJobFiltersSidebarOrganizations()
    jobsStore.UNIQUE_ORGS = new Set(['google', 'amazon'])

    const button = screen.getByRole('button', { name: /organizations/i })
    await userEvent.click(button)
    const orgsListItems = screen.getAllByRole('listitem')
    const orgs = orgsListItems.map((node) => node.textContent)
    expect(orgs).toEqual(['google', 'amazon'])
  })

  describe('when user clicks checkbox', () => {
    it('communicates that user has selected checkbox for organization', async () => {
      useRouter.mockReturnValue({ push: vi.fn() })
      const { jobsStore, userStore } = renderJobFiltersSidebarOrganizations()
      jobsStore.UNIQUE_ORGS = new Set(['google', 'amazon'])
      const button = screen.getByRole('button', { name: /organizations/i })
      await userEvent.click(button)
      const googleCheckbox = screen.getByRole('checkbox', {
        name: /google/i
      })
      await userEvent.click(googleCheckbox)

      expect(userStore.ADD_SELECTED_ORGS).toHaveBeenCalledWith(['google'])
    })

    it('navigates user to JobsResults page to see fresh batch of filtered jobs', async () => {
      const push = vi.fn()
      useRouter.mockReturnValue({ push })
      const { jobsStore } = renderJobFiltersSidebarOrganizations()
      jobsStore.UNIQUE_ORGS = new Set(['google'])
      const button = screen.getByRole('button', { name: /organizations/i })
      await userEvent.click(button)
      const googleCheckbox = screen.getByRole('checkbox', {
        name: /google/i
      })
      await userEvent.click(googleCheckbox)

      expect(push).toHaveBeenCalledWith({ name: 'JobsResults' })
    })
  })
})

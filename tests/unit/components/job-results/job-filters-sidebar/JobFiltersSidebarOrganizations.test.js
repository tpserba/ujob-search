import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import { createTestingPinia } from '@pinia/testing'
import JobFiltersSidebarOrganizations from '@/components/job-results/job-filters-sidebar/JobFiltersSidebarOrganizations.vue'

import { useJobsStore } from '@/stores/jobs'

describe('JobFiltersSidebarOrganizations', () => {
  it('renders a unique list of organizations from jobs', async () => {
    const pinia = createTestingPinia()
    const jobsStore = useJobsStore()
    jobsStore.UNIQUE_ORGS = new Set(['google', 'amazon'])

    render(JobFiltersSidebarOrganizations, {
      global: {
        plugins: [pinia],
        stubs: {
          FontAwesomeIcon: true
        }
      }
    })
    const button = screen.getByRole('button', { name: /organizations/i })
    await userEvent.click(button)
    const orgsListItems = screen.getAllByRole('listitem')
    const orgs = orgsListItems.map((node) => node.textContent)
    expect(orgs).toEqual(['google', 'amazon'])
  })
})

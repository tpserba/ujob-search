import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import { createTestingPinia } from '@pinia/testing'
import JobFiltersSidebarCheckboxGroup from '@/components/job-results/job-filters-sidebar/JobFiltersSidebarCheckboxGroup.vue'

import { useRouter } from 'vue-router'
import { vi } from 'vitest'

vi.mock('vue-router')

describe('JobFiltersSidebarCheckboxGroup', () => {
  const createProps = (props = {}) => ({
    header: 'Some header',
    uniqueValues: new Set(['value a', 'value b']),
    action: vi.fn(),
    ...props
  })
  const renderJobFiltersSidebarCheckboxGroup = (props) => {
    const pinia = createTestingPinia()
    render(JobFiltersSidebarCheckboxGroup, {
      props: {
        ...props
      },
      global: {
        plugins: [pinia],
        stubs: {
          FontAwesomeIcon: true
        }
      }
    })
  }
  it('renders a unique list of values', async () => {
    const props = createProps({
      header: 'Job Types',
      uniqueValues: new Set(['full-time', 'part-time'])
    })

    renderJobFiltersSidebarCheckboxGroup(props)

    const button = screen.getByRole('button', { name: /job types/i })
    await userEvent.click(button)

    const jobTypesListItems = screen.getAllByRole('listitem')
    const jobTypes = jobTypesListItems.map((node) => node.textContent)
    expect(jobTypes).toEqual(['full-time', 'part-time'])
  })

  describe('when user clicks checkbox', () => {
    it('communicates that user has selected checkbox for value', async () => {
      useRouter.mockReturnValue({ push: vi.fn() })
      const action = vi.fn()
      const props = createProps({
        header: 'Job Types',
        uniqueValues: new Set(['full-time', 'part-time']),
        action
      })
      renderJobFiltersSidebarCheckboxGroup(props)

      const button = screen.getByRole('button', { name: /job types/i })
      await userEvent.click(button)

      const fullTimeCheckbox = screen.getByRole('checkbox', {
        name: /full-time/i
      })
      await userEvent.click(fullTimeCheckbox)

      expect(action).toHaveBeenCalledWith(['full-time'])
    })

    it('navigates user to JobsResults page to see fresh batch of filtered jobs', async () => {
      const push = vi.fn()
      useRouter.mockReturnValue({ push })
      const props = createProps({
        header: 'Job Types',
        uniqueValues: new Set(['full-time'])
      })
      renderJobFiltersSidebarCheckboxGroup(props)

      const button = screen.getByRole('button', { name: /job types/i })
      await userEvent.click(button)

      const fullTimeCheckbox = screen.getByRole('checkbox', {
        name: /full-time/i
      })
      await userEvent.click(fullTimeCheckbox)

      expect(push).toHaveBeenCalledWith({ name: 'JobsResults' })
    })
  })
})

import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import JobSearchForm from '@/components/job-search/JobSearchForm.vue'
import { vi } from 'vitest'

describe('JobSearchForm', () => {
  describe('When user submits form', () => {
    it("directs user to jobs results search with user's search parameters", async () => {
      const push = vi.fn()
      const $router = { push } // Remember es6 shorthand
      render(JobSearchForm, {
        global: {
          mocks: {
            $router // Remember es6 shorthand
          },
          stubs: {
            FontAwesomeIcon: true
          }
        }
      })
      const roleInput = screen.getByRole('textbox', {
        name: /role/i
      })
      await userEvent.type(roleInput, 'Dev')

      const locationInput = screen.getByRole('textbox', {
        name: /where?/i
      })
      await userEvent.type(locationInput, 'LA')

      const submitButton = screen.getByRole('button', {
        name: /search/i
      })
      await userEvent.click(submitButton)
      // Expects the function to have been called with the correct argument
      expect(push).toHaveBeenCalledWith({
        name: 'JobsResults',
        query: { role: 'Dev', location: 'LA' }
      })
    })
  })
})

import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import { useRouter } from 'vue-router'
import JobSearchForm from '@/components/job-search/JobSearchForm.vue'
import { vi } from 'vitest'

vi.mock('vue-router')

describe('JobSearchForm', () => {
  describe('When user submits form', () => {
    it("directs user to jobs results search with user's search parameters", async () => {
      const push = vi.fn()
      useRouter.mockReturnValue({ push })
      render(JobSearchForm, {
        global: {
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

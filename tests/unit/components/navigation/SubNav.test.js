import { render, screen } from '@testing-library/vue'
import SubNav from '@/components/navigation/SubNav.vue'

describe('SubNav', () => {
  describe('When user is on jobs page', () => {
    it('Displays job count', () => {
      const $route = {
        name: 'JobsResult'
      }
      render(SubNav, {
        // Needs to mock that the user is on the jobs results page
        // since the value is no longer hard coded and stored in a property and is computed now
        computed: {
          onJobsResultsPage() {
            return true
          }
        },
        global: {
          mocks: {
            // Replaces this.$route with our mock
            $route: $route // could be simply $route since name is the same, left for showcase
          },
          stubs: {
            FontAwesomeIcon: true
          }
        }
      })
      const jobCount = screen.getByText('1653')
      expect(jobCount).toBeInTheDocument()
    })
  })

  describe('When user is not on jobs page', () => {
    it('Does not display job count', () => {
      const $route = {
        name: 'Home'
      }
      render(SubNav, {
        global: {
          mocks: {
            $route
          },
          stubs: {
            FontAwesomeIcon: true
          }
        }
      })
      const jobCount = screen.queryByText('1653')
      expect(jobCount).not.toBeInTheDocument()
    })
  })
})

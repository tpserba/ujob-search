import { render, screen } from '@testing-library/vue'
import SubNav from '@/components/navigation/SubNav.vue'

describe('SubNav', () => {
  const renderSubNav = (routeName) => {
    render(SubNav, {
      global: {
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
  }
  describe('When user is on jobs page', () => {
    it('Displays job count', () => {
      const routeName = 'JobsResults'
      renderSubNav(routeName)

      const jobCount = screen.getByText('1653')
      expect(jobCount).toBeInTheDocument()
    })
  })

  describe('When user is not on jobs page', () => {
    it('Does not display job count', () => {
      const routeName = 'Home'
      renderSubNav(routeName)
      const jobCount = screen.queryByText('1653')
      expect(jobCount).not.toBeInTheDocument()
    })
  })
})

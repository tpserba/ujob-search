import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import MainNav from '@/components/navigation/MainNav.vue'
import { RouterLinkStub } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { useUserStore } from '../../../../src/stores/user'

describe('MainNav', () => {
  const renderMainNav = () => {
    const pinia = createTestingPinia()
    const $route = {
      name: 'Home'
    }
    render(MainNav, {
      global: {
        plugins: [pinia],
        mocks: {
          $route
        },
        stubs: {
          FontAwesomeIcon: true,
          RouterLink: RouterLinkStub
        }
      }
    })
  }
  it('Displays company name', () => {
    //render(MainNav)
    renderMainNav()
    const companyName = screen.getByText('Corp Careers')
    expect(companyName).toBeInTheDocument()
  })

  it('Displays menu items for navigation', () => {
    //render(MainNav)
    renderMainNav()
    const navItems = screen.getAllByRole('listitem')
    const navMenuTexts = navItems.map((item) => item.textContent)

    expect(navMenuTexts).toEqual([
      'Teams',
      'Location',
      'Life at Corp',
      'How we hire',
      'Students',
      'Jobs'
    ])
  })

  describe('When the user logs in', () => {
    it('Displays user profile picture', async () => {
      renderMainNav()
      const userStore = useUserStore()
      // Aria role is img
      let profileImg = screen.queryByRole('img', {
        name: /user profile image/i
      })
      expect(profileImg).not.toBeInTheDocument()

      // Aria role is button
      const loginBtn = screen.getByRole('button', {
        name: /Sign in/i
      })
      userStore.isLoggedIn = true
      await userEvent.click(loginBtn)
      profileImg = screen.getByRole('img', {
        name: /user profile image/i
      })
      expect(profileImg).toBeInTheDocument()
    })
  })
})

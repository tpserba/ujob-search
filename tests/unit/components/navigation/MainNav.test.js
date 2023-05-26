import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import MainNav from '@/components/navigation/MainNav.vue'
import { RouterLinkStub } from '@vue/test-utils'

describe('MainNav', () => {
  const renderMainNav = () => {
    const $route = {
      name: 'Home'
    }
    render(MainNav, {
      global: {
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
      //render(MainNav)
      renderMainNav()
      // Aria role is img
      let profileImg = screen.queryByRole('img', {
        name: /user profile image/i
      })
      expect(profileImg).not.toBeInTheDocument()

      // Aria role is button
      const loginBtn = screen.getByRole('button', {
        name: /Sign in/i
      })
      await userEvent.click(loginBtn)
      profileImg = screen.getByRole('img', {
        name: /user profile image/i
      })
      expect(profileImg).toBeInTheDocument()
    })
  })
})

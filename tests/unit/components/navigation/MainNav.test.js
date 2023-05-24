import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import MainNav from '@/components/navigation/MainNav.vue'

describe('MainNavm', () => {
  it('Displays company name', () => {
    render(MainNav)
    const companyName = screen.getByText('Corp Careers')
    expect(companyName).toBeInTheDocument()
  })

  it('Displays menu items for navigation', () => {
    render(MainNav)
    const navItems = screen.getAllByRole('listitem')
    console.log(navItems)
    const navMenuTexts = navItems.map((item) => item.textContent)
    console.log(navMenuTexts)

    expect(navMenuTexts).toEqual(['Teams', 'Locations', 'Life at Corp', 'Students', 'Jobs'])
  })

  describe('When the user logs in', () => {
    it('Displays user profile picture', async () => {
      render(MainNav)
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

import { render, screen } from '@testing-library/vue'
//import matchers from '@testing-library/jest-dom/matchers'

import MainNav from '@/components/MainNav.vue'
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
})

import { render, screen } from '@testing-library/vue'
//import matchers from '@testing-library/jest-dom/matchers'

import MainNav from '@/components/MainNav.vue'
describe('MainNavm', () => {
  it('Displays company name', () => {
    render(MainNav)
    const companyName = screen.getByText('Corp Careers')
    expect(companyName).toBeInTheDocument()
  })
})

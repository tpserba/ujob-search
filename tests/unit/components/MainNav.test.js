import { render, screen } from '@testing-library/vue'
import MainNav from '@/components/MainNav.vue'
describe('MainNavm', () => {
  it('Displays company name', () => {
    render(MainNav)
    screen.debug()
  })
})

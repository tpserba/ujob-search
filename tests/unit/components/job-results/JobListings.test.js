import { render, screen } from '@testing-library/vue'
import JobListings from '@/components/job-results/JobListings.vue'
import axios from 'axios'
import { RouterLinkStub } from '@vue/test-utils'

// Finds axios library and replaces exports with vitest mock functions
vi.mock('axios')

describe('JobListings', () => {
  const createRoute = (queryParams = {}) => ({
    query: {
      page: '5',
      ...queryParams
    }
  })

  const renderJobListings = ($route) => {
    render(JobListings, {
      global: {
        mocks: {
          $route
        },
        stubs: {
          RouterLink: RouterLinkStub
        }
      }
    })
  }
  it('fetches jobs', () => {
    axios.get.mockResolvedValue({ data: [] })
    const $route = createRoute()
    renderJobListings($route)
    expect(axios.get).toHaveBeenCalledWith('http://localhost:3000/jobs') // the call is what matters, it doesn't matter is response.data is empty array
  })

  it('displays maximum of 10 jobs', async () => {
    axios.get.mockResolvedValue({ data: Array(15).fill({}) })
    const queryParams = { page: '1' }
    const $route = createRoute(queryParams)
    renderJobListings($route)
    /* Uses 'find' because test ran faster than rendering, and 'get' verb caused error because there were no elements.
    With await it makes sure the elements(if any) are in the page, and in that case
    it can perform the test correctly */
    const jobListings = await screen.findAllByRole('listitem')
    expect(jobListings).toHaveLength(10)
  })

  describe('When params exclude page number', () => {
    it('displays page number 1', () => {
      const queryParams = { page: undefined }
      const $route = createRoute(queryParams)

      renderJobListings($route)

      expect(screen.getByText('Page 1')).toBeInTheDocument()
    })
  })

  describe('When params  include page number', () => {
    it('displays page number', () => {
      const queryParams = { page: 3 }
      const $route = createRoute(queryParams)

      renderJobListings($route)

      expect(screen.getByText('Page 3')).toBeInTheDocument()
    })
  })

  describe('When user is on first page', () => {
    it('does not show link to previous page', async () => {
      axios.get.mockResolvedValue({ data: Array(15).fill({}) })
      const queryParams = { page: '1' }
      const $route = createRoute(queryParams)
      renderJobListings($route)
      await screen.findAllByRole('listitem')
      // If link is not present after refresh(after await) then test will fail
      const previousLink = screen.queryByRole('link', {
        name: /previous/i
      })
      expect(previousLink).not.toBeInTheDocument()
    })

    it('show next page link', async () => {
      axios.get.mockResolvedValue({ data: Array(15).fill({}) })
      const queryParams = { page: '1' }
      const $route = createRoute(queryParams)
      renderJobListings($route)
      await screen.findAllByRole('listitem')
      // If link is not present after refresh(after await) then test will fail
      const nextLink = screen.queryByRole('link', {
        name: /next/i
      })
      expect(nextLink).toBeInTheDocument()
    })
  })
})

import { render, screen } from '@testing-library/vue'
import JobListings from '@/components/job-results/JobListings.vue'
import { RouterLinkStub } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { useJobsStore } from '@/stores/jobs'
import { useRoute } from 'vue-router'
import { vi } from 'vitest'

vi.mock('vue-router')

describe('JobListings', () => {
  const renderJobListings = () => {
    const pinia = createTestingPinia()
    render(JobListings, {
      global: {
        plugins: [pinia],
        stubs: {
          RouterLink: RouterLinkStub
        }
      }
    })
  }
  it('fetches jobs', () => {
    useRoute.mockReturnValue({ query: {} })
    renderJobListings()
    const jobsStore = useJobsStore()
    expect(jobsStore.FETCH_JOBS).toHaveBeenCalled() // the call is what matters, it doesn't matter is response.data is empty array
  })

  it('displays maximum of 10 jobs', async () => {
    useRoute.mockReturnValue({ query: { page: '1' } })
    renderJobListings()
    const jobsStore = useJobsStore()
    jobsStore.jobs = Array(15).fill({})
    /* Uses 'find' because test ran faster than rendering, and 'get' verb caused error because there were no elements.
    With await it makes sure the elements(if any) are in the page, and in that case
    it can perform the test correctly */
    const jobListings = await screen.findAllByRole('listitem')
    expect(jobListings).toHaveLength(10)
  })

  describe('When params exclude page number', () => {
    it('displays page number 1', () => {
      useRoute.mockReturnValue({ query: {} })

      renderJobListings()

      expect(screen.getByText('Page 1')).toBeInTheDocument()
    })
  })

  describe('When params  include page number', () => {
    it('displays page number', () => {
      useRoute.mockReturnValue({ query: { page: '3' } })

      renderJobListings()

      expect(screen.getByText('Page 3')).toBeInTheDocument()
    })
  })

  describe('When user is on first page', () => {
    it('does not show link to previous page', async () => {
      useRoute.mockReturnValue({ query: { page: '1' } })
      renderJobListings()
      const jobsStore = useJobsStore()
      jobsStore.jobs = Array(15).fill({})
      await screen.findAllByRole('listitem')
      // If link is not present after refresh(after await) then test will fail
      const previousLink = screen.queryByRole('link', {
        name: /previous/i
      })
      expect(previousLink).not.toBeInTheDocument()
    })

    it('show next page link', async () => {
      useRoute.mockReturnValue({ query: { page: '1' } })
      renderJobListings()
      const jobsStore = useJobsStore()
      jobsStore.jobs = Array(15).fill({})
      // Query to make sure to find multiple listitem elements, or elements fulfilling that role
      // it verifies that the compo has had time to re render the joblistings based on the backend results
      await screen.findAllByRole('listitem')
      // If link is not present after refresh(after await) then test will fail
      const nextLink = screen.queryByRole('link', {
        name: /next/i
      })
      expect(nextLink).toBeInTheDocument()
    })
  })

  describe('when user is on last page', () => {
    it('does not show link to next page', async () => {
      useRoute.mockReturnValue({ query: { page: '2' } })
      renderJobListings()
      const jobsStore = useJobsStore()
      jobsStore.jobs = Array(15).fill({})
      await screen.findAllByRole('listitem')
      const nextLink = screen.queryByRole('link', {
        name: /next/i
      })
      expect(nextLink).not.toBeInTheDocument()
    })

    it('shows link to previous page', async () => {
      useRoute.mockReturnValue({ query: { page: '2' } })
      renderJobListings()
      const jobsStore = useJobsStore()
      jobsStore.jobs = Array(15).fill({})
      await screen.findAllByRole('listitem')
      const previousLink = screen.queryByRole('link', {
        name: /previous/i
      })
      expect(previousLink).toBeInTheDocument()
    })
  })
})

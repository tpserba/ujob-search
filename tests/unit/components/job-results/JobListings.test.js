import { render, screen } from '@testing-library/vue'
import JobListings from '@/components/job-results/JobListings.vue'
import axios from 'axios'
import { RouterLinkStub } from '@vue/test-utils'

// Finds axios library and replaces exports with vitest mock functions
vi.mock('axios')

describe('JobListings', () => {
  it('fetches jobs', () => {
    axios.get.mockResolvedValue({ data: [] })
    render(JobListings)
    expect(axios.get).toHaveBeenCalledWith('http://localhost:3000/jobs') // the call is what matters, it doesn't matter is response.data is empty array
  })

  it('displays maximum of 10 jobs', async () => {
    axios.get.mockResolvedValue({ data: Array(15).fill({}) })
    render(JobListings, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub
        }
      }
    })
    const jobListings = await screen.findAllByRole('listitem')
    expect(jobListings).toHaveLength(10)
  })
})

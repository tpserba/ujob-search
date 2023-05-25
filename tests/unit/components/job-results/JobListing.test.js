import { render, screen } from '@testing-library/vue'
import JobListing from '@/components/job-results/JobListing.vue'
import { RouterLinkStub } from '@vue/test-utils'

describe('JobListing', () => {
  const createJobProps = (jobProps = {}) => ({
    title: 'Vue Developer',
    organization: 'AirBnB',
    ...jobProps
  })
  const renderJobListing = (jobProps) => {
    render(JobListing, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub
        }
      },
      props: {
        job: {
          ...jobProps
        }
      }
    })
  }
  it('renders job title', () => {
    const jobProps = createJobProps({ title: 'Vue Programmer' })
    renderJobListing(jobProps)
    expect(screen.getByText('Vue Programmer')).toBeInTheDocument()
  })
  it('renders job organization', () => {
    const jobProps = createJobProps({ organization: 'Samsung' })
    renderJobListing(jobProps)
    expect(screen.getByText('Samsung')).toBeInTheDocument()
  })
})

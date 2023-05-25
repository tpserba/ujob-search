import { render, screen } from '@testing-library/vue'
import JobListing from '@/components/job-results/JobListing.vue'
import { RouterLinkStub } from '@vue/test-utils'

describe('JobListing', () => {
  it('renders job title', () => {
    render(JobListing, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub
        }
      },
      props: {
        job: {
          title: 'Vue Developer'
        }
      }
    })
    expect(screen.getByText('Vue Developer')).toBeInTheDocument()
  })
  it('renders job organization', () => {
    render(JobListing, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub
        }
      },
      props: {
        job: {
          organization: 'AirBnB'
        }
      }
    })
    expect(screen.getByText('AirBnB')).toBeInTheDocument()
  })
})

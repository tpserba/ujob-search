import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import CollapsibleAccordion from '@/components/shared/CollapsibleAccordion.vue'

describe('CollapsibleAccordion', () => {
  it('renders child content', async () => {
    render(CollapsibleAccordion, {
      global: {
        stubs: {
          FontAwesomeIcon: true
        }
      },
      props: {
        header: 'My category'
      },
      slots: {
        default: '<h3>My nested child</h3>'
      }
    })
    // It doesn't expect it to be in the document
    // since starting value of the accordion is false(closed) and nothing (so no child content) is displayed
    expect(screen.queryByText('My nested child')).not.toBeInTheDocument()
    const button = screen.getByRole('button', {
      name: /my category/i
    })
    await userEvent.click(button)
    expect(screen.getByText('My nested child')).toBeInTheDocument()
  })

  describe('when parent does not provide content for child', () => {
    it('renders fallback content', async () => {
      render(CollapsibleAccordion, {
        global: {
          stubs: {
            FontAwesomeIcon: true
          }
        },
        props: {
          header: 'My category'
        }
      })
      const button = screen.getByRole('button', { name: /my category/i })
      await userEvent.click(button)
      expect(screen.getByText('Fallback content')).toBeInTheDocument()
    })
  })
})

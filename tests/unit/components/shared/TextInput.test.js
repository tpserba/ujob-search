import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import TextInput from '@/components/shared/TextInput.vue'

describe('TextInput', () => {
  it('Communicates that user has entered a characgter', async () => {
    const { emitted } = render(TextInput, {
      props: {
        modelValue: ''
      }
    })
    const input = screen.getByRole('textbox')
    await userEvent.type(input, 'NY')
    const messages = emitted()['update:modelValue']
    expect(messages).toEqual([['N'], ['NY']])
  })
})

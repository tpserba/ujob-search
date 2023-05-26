import axios from 'axios'
import getJobs from '@/api/getJobs.js'

vi.mock('axios')
describe('getJobs', () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({
      data: [
        {
          id: 1,
          title: 'Java Engineer'
        }
      ]
    })
  })
  it('fetches jobs that candidates can apply to', async () => {
    await getJobs()
    expect(axios.get).toHaveBeenCalledWith('http://myfakeapi.com/jobs')
  })
  it('extracts jobs from response', async () => {
    const jobs = await getJobs()
    const expected = [{ id: 1, title: 'Java Engineer' }]
    expect(jobs).toEqual(expected)
  })
})

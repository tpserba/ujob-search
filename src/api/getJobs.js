import axios from 'axios'

const getJobs = async () => {
  const baseURL = import.meta.env.VITE_APP_API_URL
  const url = `${baseURL}/jobs`
  await axios.get(url)
}

export default getJobs

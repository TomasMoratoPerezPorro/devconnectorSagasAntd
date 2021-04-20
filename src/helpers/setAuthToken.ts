import axios from 'axios'

const setAuthToken = (token: string) => {
  console.error('INISDE SET AUTH TOKEN')
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token
  } else {
    delete axios.defaults.headers.common['x-auth-token']
  }
}

export default setAuthToken

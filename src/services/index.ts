import axios from 'axios'
import { IUserRegisterInfo } from '../models/common'

const instance = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: { 'Content-Type': 'application/json' }
})

const userAPI = {
  registerUser: async (body: IUserRegisterInfo) => instance.post('/users', body)
}

const services = {
  userAPI
}

export default services

import axios from 'axios'
import { IUserLoginInfo, IUserRegisterInfo } from '../models/common'

const instance = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: { 'Content-Type': 'application/json' }
})

const userAPI = {
  registerUser: async (body: IUserRegisterInfo) => instance.post('/users', body),
  loginUser: async (body: IUserLoginInfo) => instance.post('/auth', body),
  loadUser: async () => instance.get('/auth'),
  getCurrentUserProfile: async () => instance.get('/profile/me'),
  createUserProfile: async (body: any) => instance.post('/profile', body),
  //TOKEN
  setToken: (token: string) => (instance.defaults.headers.common['x-auth-token'] = token),
  deleteToken: () => delete instance.defaults.headers.common['x-auth-token']
}

const services = {
  userAPI
}

export default services

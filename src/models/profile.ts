import { IUserInfo } from './common'

export interface IProfileObject {
  social: ISocialObject
  skills: string[]
  user: IUserInfo
  website: string
  company: string
  status: string
  location: string
  bio: string
  githubusername: string
  experience: IExperienceObject[]
  education: IEducationObject[]
  date: string
}

export interface IEducationObject {
  current: boolean
  _id: string
  school: string
  degree: string
  fieldofstudy: string
  from: string
  to: string
  description: string
}

export interface ISocialObject {
  youtube: string
  twitter: string
  facebook: string
  linkedin: string
  instagram: string
}

export interface IExperienceObject {
  current: boolean
  _id: string
  title: string
  company: string
  location: string
  from: string
  to: string
  description: string
}

import type { CurrentUser, Project, Token } from '@/types'
import axios from 'axios'

const refreshGitlabToken = async () => {
  const refresh_token = localStorage.getItem('refresh_token')
  if (!refresh_token) return Promise.reject('there is no refresh token')

  return new Promise<Token>((resolve, reject) =>
    axios
      .post(`gitlab/refresh`, { code: refresh_token })
      .then(({ data }) => {
        localStorage.setItem('access_token', data.access_token)
        localStorage.setItem('refresh_token', data.refresh_token)
        localStorage.setItem('expiry_at', (parseInt(data.created_at)! + 7200).toString())
        return resolve(data)
      })
      .catch(reject)
  )
}

const fetchGitlabToken = async (code: string) =>
  new Promise((resolve, reject) =>
    axios.post('gitlab/token', { code }).then(({ data }) => {
      if (typeof data.access_token !== 'undefined') {
        localStorage.setItem('access_token', data.access_token)
        localStorage.setItem('refresh_token', data.refresh_token)
        localStorage.setItem('expiry_at', (parseInt(data.created_at)! + 7200).toString())
        return resolve(true)
      } else {
        return reject(data)
      }
    })
  )

const fetchGitlabUser = async () => {
  const token = localStorage.getItem('access_token')
  if (!token) return Promise.reject('there is no token')
  return new Promise<CurrentUser>((resolve, reject) =>
    axios
      .get(`https://${import.meta.env.VITE_GITLAB_DOMAIN}/api/v4/user`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(({ data }: { data: CurrentUser }) => resolve(data))
      .catch(reject)
  )
}

const fetchGitlabStarredProjects = async (id: number) => {
  const token = localStorage.getItem('access_token')
  if (!token) return Promise.reject('there is no token')

  return new Promise<Project[]>((resolve, reject) =>
    axios
      .get(`https://${import.meta.env.VITE_GITLAB_DOMAIN}/api/v4/users/${id}/starred_projects`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(({ data }) => resolve(data))
      .catch(reject)
  )
}

export default {
  fetchGitlabStarredProjects,
  fetchGitlabToken,
  fetchGitlabUser,
  refreshGitlabToken
}

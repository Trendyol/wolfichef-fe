import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from 'axios'
import App from './App.vue'
import router from './router'
import utils from './utils'

if (typeof localStorage.identifier === 'undefined') {
  localStorage.identifier = [...Array(30)].map(() => Math.random().toString(36)[2]).join('')
}

axios.defaults.baseURL = import.meta.env.VITE_API_ROOT
axios.defaults.headers.common['X-User-Identifier'] = localStorage.identifier

if (
  import.meta.env.VITE_ENABLE_GITLAB_INTEGRATION === 'true' &&
  localStorage.getItem('expiry_at')
) {
  const currentTime: number = Math.floor(new Date().getTime() / 1000)
  const expiry_at: number = parseInt(localStorage.getItem('expiry_at')!)

  if (currentTime - expiry_at > -300) {
    utils.refreshGitlabToken()
  }
}

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

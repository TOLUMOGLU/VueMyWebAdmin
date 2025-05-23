import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../pages/Auth/LoginPage.vue'
import Dashboard from '../pages/Admin/Dashboard.vue'

const routes = [
  { path: '/', component: LoginPage },
  { path: '/dashboard', component: Dashboard },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

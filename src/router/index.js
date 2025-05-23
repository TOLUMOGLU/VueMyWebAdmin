import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/userStore.js'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('@/pages/Auth/LoginPage.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/pages/Admin/Dashboard.vue')
    },
  ]
})
router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  const useLogIn = userStore.isLoggedIn;
  if(!useLogIn){
    //return next({ name: 'login'});
  }
  console.log(useLogIn);
  next();
});
export default router
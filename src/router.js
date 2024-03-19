import { createRouter, createWebHistory } from 'vue-router'
import commonStore from './store.js'

const router = createRouter({
    routes: [
        {
            name: 'home',
            path: '/',
            component: () => import('./components/Home.vue'),
        },
        {
            name: 'xss',
            path: '/xss',
            component: () => import('./components/Xss.vue'),
            props: route => ({ query: route.query.search })
        },
        {
            name: 'csrf',
            path: '/csrf',
            component: () => import('./components/Csrf.vue'),
        },
        {
            path: '/clickjacking',
            component: () => import('./components/Clickjacking.vue'),
        },
        {
            path: '/nosql',
            component: () => import('./components/noSqlInjection.vue'),
        },
        {
            path: '/admin',
            component: () => import('./components/SecretRouter.vue'),
        },
        {
            path: '/unsafe-file',
            component: () => import('./components/UnsafeFile.vue'),
        },
    ],
    history: createWebHistory()
})
// 路由守卫
// router.beforeEach((to, from, next) => {
//     const common_store = commonStore()
//     // 检查用户的数据权限
//     if (to.path === '/admin' && !common_store.isAdmin) {
//         next('/')
//     } else {
//         next()
//     }
// })

export default router
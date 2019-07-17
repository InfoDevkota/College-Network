
const routes = [
  {
    path: '/',
    component: () => import('layouts/User.vue'),
    meta: {
      requiresAuth: true
    },
    children: [
      { path: 'feed', name: 'feed', component: () => import('pages/user/Posts.vue') },
      { path: 'user/profile/:id/update', name: 'profile-update', props: true, component: () => import('pages/user/ProfileUpdate.vue') },

      { path: 'feed/:id', name: 'feed-detail', props: true, component: () => import('pages/user/PostDetail.vue') },

      { path: 'user/profile/:id', name: 'user-profile', props: true, component: () => import('pages/user/Profile.vue') },
      { path: '/chats', name: 'chat-detail', component: () => import('pages/chat') },
      { path: '/department/:id', props: true, name: 'department-detail', component: () => import('pages/department/index') }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/Auth.vue'),
    children: [
      { path: '', name: 'signin', component: () => import('pages/auth/signin.vue') },
      { path: '/register', name: 'register', component: () => import('pages/auth/register.vue') }
      // { path: 'signin', name: 'signin', component: () => import('pages/auth/signin.vue') }
    ]
  },
  {
    path: '/user',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes

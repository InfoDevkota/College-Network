
const routes = [
  {
    path: '/user',
    component: () => import('layouts/User.vue'),
    meta: {
      requiresAuth: true
    },
    children: [
      { path: 'feed', name: 'feed', component: () => import('pages/user/Posts.vue') },
      { path: 'feed/:id', name: 'feed-detail', props: true, component: () => import('pages/user/PostDetail.vue') },

      { path: 'profile/:id', name: 'user-profile', props: true, component: () => import('pages/user/Profile.vue') },
      { path: 'chat', name: 'chat', component: () => import('pages/user/Chat.vue') }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/Auth.vue'),
    children: [
      { path: '', name: 'signin', component: () => import('pages/auth/signin.vue') }
      // { path: 'signin', name: 'signin', component: () => import('pages/auth/signin.vue') }
    ]
  },
  {
    path: '/user',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },
  {
    path: '/chats',
    name: 'chat-detail',
    component: () => import('pages/chat')
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

import Root from '@/containers/Common/Root'
import Status from '@/containers/Common/Status'
import Example from '@/containers/Example'

export default {
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Root,
      children: [
        {
          alias: '',
          path: 'example',
          name: 'Example',
          component: Example
        }
      ]
    },
    {
      path: '/status',
      name: 'Status',
      component: Status,
      props: route => ({ code: route.query.code })
    },
    {
      path: '*',
      redirect: {
        name: 'Status',
        query: { code: '404' }
      }
    }
  ]
}

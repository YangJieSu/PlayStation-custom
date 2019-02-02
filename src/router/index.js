import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/pages/Index';
import Home from '@/components/Home';
import Gamehost from '@/components/Gamehost';
import GamehostMenu from '@/components/pages/GamehostMenu';
import Switch from '@/components/pages/Switch';
import Ps4 from '@/components/pages/Ps4';
import N3ds from '@/components/pages/N3ds';
import AllProducts from '@/components/pages/AllProducts';
import ProductDetail from '@/components/pages/ProductDetail';
import CreateOrder from '@/components/pages/CreateOrder';
import OrderCheckout from '@/components/pages/OrderCheckout';

Vue.use(Router)

export default new Router({
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {x: 0, y: 0}
    }
  },
  routes: [
    {
      path: '*',
      redirect: '/index',
    },
    {
      path: '/',
      name: 'custom',
      redirect: '/index',
      component: Home,
      children: [
        {
          path: 'index',
          name: 'Index',
          component: Index
        },
        {
          path: 'gamehost',
          name: 'Gamehost',
          component: Gamehost,
          children: [
            {
              path: '/',
              name: '主機介紹',
              component: GamehostMenu
            },
            {
              path: 'switch',
              name: '主機介紹-Switch',
              component: Switch
            },
            {
              path: 'ps4',
              name: '主機介紹-PS4',
              component: Ps4
            },
            {
              path: 'n3ds',
              name: '主機介紹-N3DS',
              component: N3ds
            }
          ],
        },
        {
          path: 'products',
          name: 'AllProducts',
          component: AllProducts
        },
        {
          path: 'productDetail/:productId',
          name: 'ProductDetail',
          component: ProductDetail,
        },
        {
          path: 'create_order',
          name: 'CreateOrder',
          component: CreateOrder,
        },
        {
          path: 'order_checkout/:orderId',
          name: 'OrderCheckout',
          component: OrderCheckout
        }
      ]
    }
  ]
})

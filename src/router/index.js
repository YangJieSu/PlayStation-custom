import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/pages/Home';
import AllProducts from '@/components/AllProducts';
import SingleItem from '@/components/pages/SingleItem';
import CreateOrder from '@/components/pages/CreateOrder';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      redirect: '/',
    },
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [
        {
          path: '',
          name: 'AllProducts',
          component: AllProducts,
        },
        {
          path: 'product/:productId',
          name: 'SingleItem',
          component: SingleItem,
        },
        {
          path: 'create_order',
          name: 'CreateOrder',
          component: CreateOrder,
        },
      ],
    },
  ]
})

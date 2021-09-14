import Vue from "vue";
import VueRouter from "vue-router";
import main from '@/views/main'
import contents from '@/views/contents'
import {
  SharedElementRouteGuard,
  SharedElementDirective,
} from 'v-shared-element'

Vue.use(SharedElementDirective)
Vue.use(VueRouter);

const scrollBehavior = function(to, from, savedPosition) {
  return new Promise(resolve => {
    let position = { x: 0, y: 0 };
    if (savedPosition) {
      position = savedPosition;
    }
    resolve(position);
  });
};

const routes = [
    {
        path: '/',
        name: 'main',
        component: main
    },
    {
        path: '/:method/:movieCd',
        name: 'contents',
        component: contents
    },
    
    
];

const router = new VueRouter({
  // mode: 'history',
  routes,
  scrollBehavior
});
router.beforeEach(SharedElementRouteGuard);

Vue.config.productionTip = false;

export default router;
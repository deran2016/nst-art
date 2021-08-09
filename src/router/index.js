/* eslint-disable import/no-unresolved */
import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store/index';

Vue.use(VueRouter);

const routes = [
  {
    path: '/404',
    name: '404',
    component: () => import('../views/404.vue'),
  },
  {
    path: '/:preset/',
    name: 'Intro',
    component: () => import('../views/Terms.vue'),
  },
  {
    path: '/:preset/explanation',
    name: 'Explanation',
    component: () => import('../views/Explanation.vue'),
  },
  {
    path: '/:preset/gallary',
    name: 'Gallary',
    component: () => import('../views/Gallary.vue'),
  },
  {
    path: '/:preset/video',
    name: 'VideoExplanation',
    component: () => import('../views/VideoExplanation.vue'),
  },
  {
    path: '/:preset/st',
    name: 'StyleTransfer',
    component: () => import('../views/StyleTransfer.vue'),
  },
  {
    path: '/:preset/artist',
    name: 'Artist',
    component: () => import('../views/Artist.vue'),
  },
  {
    path: '/:preset/art',
    name: 'Art',
    component: () => import('../views/Art.vue'),
  },
  {
    path: '/:preset/survey',
    name: 'Survey',
    component: () => import('../views/Survey.vue'),
  },
  {
    path: '/:preset/submit',
    name: 'Submit',
    component: () => import('../views/Submit.vue'),
  },

  { path: '*', redirect: '/404', hidden: true },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.params.preset) {
    const { preset } = to.params;

    switch (preset) {
      case '1':
        console.log('Type 1');
        store.state.data.experimentType = '1';
        next();
        break;
      case '2':
        console.log('Type 2');
        store.state.data.experimentType = '2';
        next();
        break;
      case '3':
        console.log('Type 3');
        store.state.data.experimentType = '3';
        next();
        break;
      default:
        console.log('wrong preset');
        next({ name: '404' });
        // store.state.data.experimentType = 'no';
        // next();
    }
  }
  next();
});

export default router;

import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import App from './App';
import goods from './components/goods/goods';
import ratings from './components/ratings/ratings';
import sellers from './components/sellers/sellers';

import './common/stylus/index.styl';

// 注册vue全局插件
Vue.use(VueRouter);
Vue.use(VueResource);

//let app = Vue.extend(App);

const routes = [
  { path: '/goods', component: goods },
  { path: '/ratings', component: ratings },
  { path: '/sellers', component: sellers }
];

let router = new VueRouter({
  routes
});

const app2 = new Vue({
  router: router,
  render: h => h(App)
}).$mount('#app');

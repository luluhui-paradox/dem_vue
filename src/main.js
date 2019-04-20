import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import VueResource from 'vue-resource'

Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(MintUI);
Vue.use(ElementUI);
Vue.use(VueResource);



new Vue({
  render: h => h(App),
  router,
}).$mount('#app');

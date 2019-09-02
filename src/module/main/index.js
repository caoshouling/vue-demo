import Vue from 'vue';
import Vuex from 'vuex';
import VueBus from 'vue-bus';
import VueRouter from 'vue-router';
//全局引入配置
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import css from '../../css/style.css';//放在elementui后面，便于覆盖
import App from './app.vue';

Vue.use(VueBus);
Vue.use(Vuex);
Vue.use(VueRouter);

//全局引入配置
Vue.use(ElementUI);

new Vue({
   el:'#app',
   render: h => h(App)
});

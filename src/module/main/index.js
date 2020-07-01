import Vue from 'vue';
import Vuex from 'vuex';
import VueBus from 'vue-bus';

//全局引入配置
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import css from '../../css/style.css';//放在elementui后面，便于覆盖
import App from 'module/main/App.vue';
import axios from 'axios';
import router from 'routers';
import VueHighlightJS from "vue-highlightjs";
import store from 'store'
Vue.use(VueBus);
Vue.use(Vuex);

//全局祖册axios
Vue.prototype.$axios = axios;

//全局引入配置
Vue.use(ElementUI);
Vue.use(VueHighlightJS);

new Vue({
   el: '#app',
   router,
   store,
   render: h => h(App)
 })

import {helloword} from '../test';
import css from '../../css/style.css';
import Vue from 'vue';
import App from './app.vue';

let  btn = document.createElement("span");
btn.innerHTML = helloword(); 
document.getElementById("test").appendChild(btn);

new Vue({
   el:'#app',
   render: h => h(App)
});

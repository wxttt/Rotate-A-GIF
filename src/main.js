import { createApp } from 'vue'
import App from './App.vue'

import 'normalize.css';
import '@/styles/iconfont.css';
import mitt from 'mitt';

const emitter = mitt();

const app = createApp(App);
app.config.globalProperties.emitter = emitter; // 注册全局事件触发器

app.mount('#app')

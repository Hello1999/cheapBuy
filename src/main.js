import { createApp } from 'vue'
import App from './App.vue'
import installElementPlus from './plugins/element'
import store from './store'
import 'weui'

const app = createApp(App).use(store)
installElementPlus(app)
app.mount('#app')
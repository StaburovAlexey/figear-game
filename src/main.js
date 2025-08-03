import { createApp } from 'vue'
import 'normalize.css'
import './style.css'
import App from './App.vue'
import vLoading from './directives/v-loading'

const app = createApp(App)
app.directive('loading', vLoading)
app.mount('#app')

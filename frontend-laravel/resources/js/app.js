// resources/js/app.js
import './bootstrap'
import { createApp } from 'vue'
import App from './components/App.vue'
import router from './router'
import store from './Store'

const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
app.use('/api', bookingRoutes);

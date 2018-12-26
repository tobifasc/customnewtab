import Vue from 'vue'
import App from './App.vue'
require('@/assets/main.css')
require('@fortawesome/fontawesome-free/css/all.css')


Vue.config.productionTip = false

new Vue({
    render: h => h(App),
}).$mount('#app')

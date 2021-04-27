import Vue from 'vue'
import App from './App.vue'
import Particles from 'particles.vue'

Vue.config.productionTip = false
Vue.use(Particles)

new Vue({
  render: h => h(App),
}).$mount('#app');

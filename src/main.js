import Vue from 'vue'
import store from './store'
import App from './App.vue'

new Vue({
  el: '#root',
  store,
  render: h => h(App)
})

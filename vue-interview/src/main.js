import Vue from 'vue'
import App from './App.vue'
import Router from 'vue-router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faArrowRight, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import Dog from './components/Dog.vue'
import Home from './components/Home.vue'

library.add(faArrowRight, faSearch)
 
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/dog/:dog',
      name: 'dog',
      component: Dog,
      props: true,
    }
 ]
})

Vue.config.productionTip = false

Vue.filter('titleCase', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.toLowerCase().split(' ').map(function(word) {
    return (word.charAt(0).toUpperCase() + word.slice(1));
  }).join(' ');
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')

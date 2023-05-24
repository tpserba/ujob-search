//import './assets/main.css'

import { createApp } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import router from '@/router'

import '@/index.css'
import App from './App.vue'

library.add(faSearch)

createApp(App).use(router).component('FontAwesomeIcon', FontAwesomeIcon).mount('#app')

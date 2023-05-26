//import './assets/main.css'

import { createApp } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faAngleDown, faAngleUp, faSearch } from '@fortawesome/free-solid-svg-icons'
import router from '@/router'
import { createPinia } from 'pinia'
import '@/index.css'
import App from './App.vue'

library.add(faSearch)
library.add(faAngleDown)
library.add(faAngleUp)
const pinia = createPinia()

createApp(App).use(pinia).use(router).component('FontAwesomeIcon', FontAwesomeIcon).mount('#app')

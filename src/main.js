import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import { createPinia } from 'pinia'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// Bu satırlar kesinlikle olmalı:
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faLinkedin, faGithub, faMedium } from '@fortawesome/free-brands-svg-icons'

library.add(faEnvelope, faLinkedin, faGithub, faMedium)

loadFonts()

const app = createApp(App)

const pinia = createPinia()
app.use(pinia)
app.use(router)
app.use(vuetify)

// FontAwesome bileşenini global kaydet
app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')

import Vue from 'vue'
import { library, config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

// This is important, we are going to let Nuxt.js worry about the CSS
config.autoAddCss = true

// You can add your icons directly in this plugin. See other examples for how you
// can add other styles or just individual icons.
library.add(fab, far, fas)

// Register the component globally
Vue.component('font-awesome-icon', FontAwesomeIcon)

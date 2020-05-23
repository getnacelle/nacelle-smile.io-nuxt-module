import { configure, addParameters } from '@storybook/vue'
import Vue from 'vue'
import Vuex from 'vuex'
import '../assets/global.css'
import './styles/bulma.css'
import 'vue-glide-js/dist/vue-glide.css'

import nacellePlugin from '../tests/mocks/nacelle-vue-plugin'
import nacelleHelpers from '../tests/mocks/nacelle-helpers'
import axiosModule from '../tests/mocks/axios-module'

Vue.use(Vuex)
Vue.use(nacellePlugin)
Vue.use(nacelleHelpers)
Vue.use(axiosModule)

const req = require.context('../components/stories', true, /.stories.js$/)

configure(req, module)

addParameters({
  options: {
    showPanel: true,
    panelPosition: 'bottom'
  }
})

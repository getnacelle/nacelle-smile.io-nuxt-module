import Vue from 'vue'
import Vuex from 'vuex'
import createStoreConfig from './storeConfig'
Vue.use(Vuex)

const store = new Vuex.Store(createStoreConfig())

export default store

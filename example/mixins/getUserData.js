import * as Cookies from 'es-cookie'
// import store from '../store/store'
import { mapMutations } from 'vuex'
export default {
  methods: {
    ...mapMutations('user', ['setUserData']),
    getUserData() {
      const cookie = Cookies.get('user-data')
      if (cookie !== undefined) {
        const data = JSON.parse(Cookies.get('user-data'))
        this.store.commit('user/setUserData', data)
        // this.setUserData(data)
      }
    }
  }
  // mounted() {
  //   Cookies.set('user-data', JSON.stringify({ test: 'hi' }))
  // }
}

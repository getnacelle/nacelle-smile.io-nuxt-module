import { ObserveVisibility } from 'vue-observe-visibility'

export default {
  directives: {
    ObserveVisibility
  },
  props: {
    observeVisibility: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      visible: false
    }
  },
  computed: {
    visibility() {
      if (this.observeVisibility) {
        return this.visible
      }
      return true
    }
  },
  methods: {
    visibilityChanged(isVisible) {
      this.visible = isVisible
    }
  }
}

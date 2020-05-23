<template>
  <div :style="style">
    <transition name="slide" appear>
      <section v-if="visible" class="cookie-bar" id="cookie-bar">
        <slot>
          <span class="message-mobile">
            This website uses cookies
            <nuxt-link :to="privacyPolicyLink">(Learn More)</nuxt-link>
          </span>
          <span class="message-desktop">
            By using this site, you agree to our use of cookies for personalized
            content,
            <br class="break-comma" />according to our
            <nuxt-link :to="privacyPolicyLink">Privacy Policy</nuxt-link>
          </span>
        </slot>
        <button
          id="accept"
          type="button"
          tabindex="0"
          role="button"
          aria-pressed="false"
          @click="onAcceptClick"
        >
          Accept
        </button>
      </section>
    </transition>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  props: {
    privacyPolicyLink: {
      type: String,
      default: '/privacy-policy'
    },
    animationDuration: {
      type: Number,
      default: 0.5
    }
  },
  data() {
    return {
      visible: false
    }
  },
  computed: {
    ...mapState('user', ['acceptCookies']),
    style() {
      return {
        '--cookie-animation-duration': `${this.animationDuration}s`
      }
    }
  },
  mounted() {
    this.readCookieAccept().then(result => {
      this.visible = !this.acceptCookies
    })
  },
  methods: {
    ...mapActions('user', ['createCookieAccept', 'readCookieAccept']),
    onAcceptClick() {
      this.visible = false
      this.createCookieAccept()
    }
  }
}
</script>

<style lang="scss" scoped>
.slide-enter-active {
  animation-name: slideIn;
  animation-direction: normal;
  animation-fill-mode: forwards;
  animation-duration: var(--cookie-animation-duration);
}
.slide-leave-active {
  animation-name: slideIn;
  animation-direction: reverse;
  animation-fill-mode: forwards;
  animation-duration: var(--cookie-animation-duration);
}
@keyframes slideIn {
  0% {
    transform: translateY(
      calc((var(--cookie-bar-height) + var(--cookie-bar-v-pad)))
    );
  }
  100% {
    transform: translateY(0);
  }
}
.cookie-bar {
  --cookie-bar-height: 60px;
  --cookie-bar-v-pad: 1em;
  position: fixed;
  z-index: 100;
  height: var(--cookie-bar-height);
  bottom: 0;
  right: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: white;
  @media screen and (max-width: 767px) {
    padding: var(--cookie-bar-v-pad) 0.75em;
  }
  @media screen and (min-width: 768px) {
    padding: var(--cookie-bar-v-pad) 1.5em;
  }
  border: 1px solid black;
  font-family: 'brandon-grotesque', sans-serif;
  font-size: 14px;
  font-weight: 100;
  .message-mobile {
    display: none;
    @media screen and (max-width: 767px) {
      display: inline-block;
    }
  }
  .message-desktop {
    background-color: white;
    @media screen and (max-width: 767px) {
      display: none;
    }
  }
  .break-comma {
    @media screen and (min-width: 1023px) {
      display: none;
    }
  }
}
#accept {
  @media screen and (max-width: 767px) {
    padding: 1em 2em;
  }
  @media screen and (min-width: 768px) {
    padding: 1em 5em;
  }
  border-width: thin;
  background: black;
  color: white;
  cursor: pointer;
}
</style>

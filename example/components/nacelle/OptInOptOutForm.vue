<template>
  <section id="user-data-options" :style="sectionStyle">
    <form>
      <h2 class="title is-4 has-text-centered">
        <slot name="formTitle">Cookie Preferences</slot>
      </h2>
      <slot></slot>
    </form>
    <input
      :value="buttonText"
      id="save"
      type="submit"
      tabindex="0"
      :aria-pressed="ariaPressed"
      :style="buttonStyle"
      @click="save"
    />
  </section>
</template>

<script>
export default {
  props: {
    privacyPolicyLink: {
      type: String,
      default: '/privacy-policy'
    },
    border: {
      type: String,
      default: '1px solid gray'
    },
    buttonText: {
      type: String,
      default: 'Save Preferences'
    },
    buttonBackground: {
      type: String,
      default: 'black'
    },
    buttonColor: {
      type: String,
      default: 'white'
    }
  },
  data() {
    return {
      ariaPressed: false,
      preTitle: '<slot name="title">Section Title</slot>',
      preDescription: '<slot name="description">Description goes here</slot>'
    }
  },
  computed: {
    buttonStyle() {
      return {
        '--button-background-color': `${this.buttonBackground}`,
        '--button-color': `${this.buttonColor}`
      }
    },
    sectionStyle() {
      return {
        '--section-border-style': `${this.border}`
      }
    }
  },
  methods: {
    save() {
      this.ariaPressed = true
    }
  }
}
</script>

<style lang="scss">
#user-data-options {
  border: var(--section-border-style);
}
form div:last-of-type {
  fieldset {
    margin-bottom: 0;
  }
}
#save {
  @media screen and (max-width: 767px) {
    padding: 1em 2em;
  }
  @media screen and (min-width: 768px) {
    padding: 1em 5em;
  }
  display: block;
  margin: 2em auto;
  margin-bottom: 0.5em;
  border-width: thin;
  background-color: var(--button-background-color);
  color: var(--button-color);
  cursor: pointer;
}
</style>

<template>
  <div :id="sectionID">
    <h3 id="field-title">
      <slot name="title">
        Add a title with:
        <code>{{ preTitle }}</code>
      </slot>
    </h3>
    <p id="field-description">
      <slot name="description">
        Add a description with:
        <code>{{ preDescription }}</code>
      </slot>
    </p>
    <fieldset :name="name" class="input-field">
      <radio-input
        v-model="value"
        value="optin"
        :id="optInName"
        :name="name"
        :checked="optInChecked"
        :label="optInLabel"
      />
      <radio-input
        v-model="value"
        value="optout"
        :id="optOutName"
        :name="name"
        :checked="optOutChecked"
        :label="optOutLabel"
      />
    </fieldset>
  </div>
</template>

<script>
import RadioInput from '~/components/nacelle/RadioInput'

export default {
  components: {
    RadioInput
  },
  props: {
    name: {
      type: String,
      default: 'placeholder'
    },
    optInLabel: {
      type: String,
      default: 'Yes, I consent'
    },
    optOutLabel: {
      type: String,
      default: 'No, I do not consent'
    },
    defaultOption: {
      type: String,
      default: 'optIn'
    }
  },
  data() {
    return {
      value: null,
      sectionID: `consent-${this.name}`,
      titleHint: 'Add a title with: <code>{{preTitle}}</code>}',
      preTitle: '<template v-slot:title>Section Title</template>',
      preDescription:
        '<template v-slot:description>Section Description Goes Here</template>'
    }
  },
  computed: {
    optInName() {
      return `opt-in-${this.name}`
    },
    optOutName() {
      return `opt-out-${this.name}`
    },
    optInChecked() {
      return this.defaultOption === 'optIn'
    },
    optOutChecked() {
      return this.defaultOption === 'optOut'
    }
  }
}
</script>

<style lang="scss">
p {
  margin-top: 0.5em;
}
fieldset.input-field {
  display: inline-block;
  margin-top: 1em;
  margin-right: 2em;
  margin-bottom: 2em;
  label {
    display: block;
    margin-right: 2em;
  }
}
</style>

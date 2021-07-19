<template>
  <span
    class="toggle"
    role="checkbox"
    tabindex="0"
    @click="toggle"
    aria-label="checkbox"
    @keydown.space.prevent="toggle"
    :aria-checked="toggleValue.toString()"
  ></span>
</template>

<script>
export default {
  model: {
    prop: 'toggleValue',
    event: 'toggle'
  },
  props: ['toggleValue'],
  methods: {
    toggle() {
      this.$emit('toggle', !this.toggleValue)
    }
  }
}
</script>

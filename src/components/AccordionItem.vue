<template>
  <div class="accordion-item">
    <div
      @click="toggle"
      @keyup.enter="toggle"
      role="button"
      tabindex="0"
      class="accordion-item-header"
    >
      <slot name="header"></slot>
      <svg
        class="icon"
        :class="{ 'rotate-90': active }"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <path
          d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z"
        />
      </svg>
    </div>
    <transition name="slide-down">
      <div class="accordion-item-body" v-show="active">
        <slot name="content"></slot>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'AccordionItem',
  inject: ['accordionListState'],
  props: {
    itemId: { required: true },
    isActive: { default: false }
  },
  data() {
    return {}
  },
  computed: {
    active() {
      if (!this.accordionListState.multiple) {
        return this.accordionListState.activeItem === this.itemId
      }
      return this.accordionListState.activeItem.includes(this.itemId)
    }
  },
  methods: {
    toggle() {
      if (!this.accordionListState.multiple) {
        this.accordionListState.activeItem = this.active ? null : this.itemId
      } else {
        const { activeItem } = this.accordionListState
        const itemIndex = activeItem.findIndex((item) => item === this.itemId)
        if (itemIndex != -1) {
          this.accordionListState.activeItem.splice(itemIndex, 1)
        } else {
          this.accordionListState.activeItem.push(this.itemId)
        }
      }
    }
  },
  created() {
    if (!this.accordionListState.multiple && this.isActive) {
      this.accordionListState.activeItem = this.itemId
    }
    if (this.accordionListState.multiple && this.isActive) {
      this.accordionListState.activeItem.push(this.itemId)
    }
  }
}
</script>

<style lang="scss" scoped></style>
<style lang="scss">
.icon {
  transition: all 0.25s;
  &.rotate-90 {
    transform: rotate(90deg);
  }
}
</style>

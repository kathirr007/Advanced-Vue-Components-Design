<template>
  <div class="accordion-list">
    <div class="text-right">
      <button
        class="btn btn-with-icon"
        @click="expandAll"
        @keyup.enter="expandAll"
        v-if="multiple"
      >
        {{ expandCollapseText }}
        <font-awesome-icon
          class="ml-2 icon"
          :class="{ 'rotate-90': isAllExpanded }"
          :icon="['fas', 'angle-double-right']"
        />
      </button>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'AccordionList',
  provide() {
    return {
      accordionListState: this.sharedData
    }
  },
  props: {
    multiple: { default: false },
    expandText: { default: 'Expand All' },
    collapseText: { default: 'Collapse All' }
  },
  data() {
    return {
      sharedData: {
        activeItem: this.multiple ? [] : null,
        multiple: this.multiple
      }
    }
  },
  computed: {
    allAccordions() {
      return this.$children
    },
    isAllExpanded() {
      return (
        this.multiple &&
        this.sharedData.activeItem.length === this.allAccordions.length
      )
    },
    expandCollapseText() {
      if (this.isAllExpanded) {
        return this.collapseText
      } else {
        return this.expandText
      }
    }
  },
  methods: {
    expandAll() {
      if (this.sharedData.activeItem.length === this.allAccordions.length) {
        this.sharedData.activeItem = []
      } else {
        this.sharedData.activeItem = this.$children.map((item) => item.itemId)
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>

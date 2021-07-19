<template>
  <on-click-outside :do="close">
    <div class="search-select" :class="{ 'is-active': isOpen }">
      <button
        @click="open"
        @keyup.enter.prevent="open"
        ref="button"
        type="button"
        class="search-select-input"
      >
        <span v-if="value !== null">{{ value }}</span>
        <span v-else class="search-select-placeholder">Select a band...</span>
      </button>
      <div ref="dropdown" v-show="isOpen" class="search-select-dropdown">
        <input
          class="search-select-search"
          v-model="search"
          @keyup.esc="close"
          @keyup.up="highlightPrev"
          @keyup.down="highlightNext"
          @keyup.enter.prevent="selectHighlighted"
          @keydown.tab.prevent
          ref="searchInput"
        />
        <ul
          ref="options"
          v-if="filteredOptions.length"
          class="search-select-options"
        >
          <li
            class="search-select-option"
            :class="{ 'is-active': i == highlightedIndex }"
            v-for="(option, i) in filteredOptions"
            :key="option"
            @click="select(option)"
            @keyup.enter="select(option)"
          >
            {{ option }}
          </li>
        </ul>
        <div v-else class="search-select-empty">
          No results found "{{ search }}"
        </div>
      </div>
    </div>
  </on-click-outside>
</template>

<script>
import OnClickOutside from '@/components/OnClickOutside'
import Popper from 'popper.js'

// new Popper(reference, element, options)

export default {
  name: 'SearchSelect',
  props: ['value', 'options', 'filterFunction'],
  components: {
    OnClickOutside
  },
  data() {
    return {
      search: '',
      isOpen: false,
      highlightedIndex: 0
    }
  },
  computed: {
    filteredOptions() {
      return this.filterFunction(this.options, this.search)
    }
  },
  methods: {
    open() {
      if (this.isOpen) {
        return
      }
      this.isOpen = true
      this.$nextTick(() => {
        this.setPopper()
        this.$refs.searchInput.focus()
      })
    },
    close() {
      // debugger
      if (!this.isOpen) return
      this.isOpen = false
      this.$refs.button.focus()
    },
    select(option) {
      this.$emit('input', option)
      this.search = ''
      this.close()
    },
    selectHighlighted() {
      this.select(this.filteredOptions[this.highlightedIndex])
    },
    highlight(index) {
      this.highlightedIndex = index

      if (this.highlightedIndex < 0) {
        this.highlightedIndex = this.filteredOptions.length - 1
      }

      if (this.highlightedIndex > this.filteredOptions.length - 1) {
        this.highlightedIndex = 0
      }

      this.$refs.options.children[this.highlightedIndex].scrollIntoView({
        block: 'nearest',
        behavior: 'smooth'
      })
    },
    highlightPrev() {
      this.highlight(this.highlightedIndex - 1)
    },
    highlightNext() {
      this.highlight(this.highlightedIndex + 1)
    },
    setPopper() {
      if (this.popper === undefined) {
        this.popper = new Popper(this.$refs.button, this.$refs.dropdown, {
          placement: 'bottom'
        })
      } else {
        this.popper.scheduleUpdate()
      }
    }
  },
  beforeDestroy() {
    this.popper.destroy()
  }
}
</script>

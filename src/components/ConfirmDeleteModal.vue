<template>
  <div class="modal-backdrop" v-show="show">
    <div class="modal">
      <h1 class="text-center text-2xl font-bold mb-4">Are you sure?</h1>
      <p class="text-center text-grey-darker mb-6">
        Deleting your account cannot be undone.
      </p>
      <div class="text-center">
        <button
          @click="cancel"
          @keyup.enter="cancel"
          type="button"
          class="btn btn-grey mr-4"
        >
          Cancel
        </button>
        <button
          @click="confirmDelete"
          @keyup.enter="confirmDelete"
          type="button"
          class="btn btn-red"
        >
          Delete it
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import preventBackgroundScrolling from '@/mixins/preventBackgroundScrolling'
export default {
  props: ['show', 'accountId'],
  mixins: [preventBackgroundScrolling],
  methods: {
    cancel() {
      this.$emit('close')
    },
    confirmDelete() {
      console.log(`Deleting account ${this.accountId}...`)
      this.$emit('close')
    }
  },
  watch: {},
  created() {
    const escapeHandler = (e) => {
      if (e.key === 'Escape' && this.show) {
        this.cancel()
      }
    }
    document.addEventListener('keydown', escapeHandler)
    this.$once('hook:destroyed', () => {
      document.removeEventListener('keydown', escapeHandler)
    })
  }
}
</script>

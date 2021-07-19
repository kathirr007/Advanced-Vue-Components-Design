<template>
  <button
    type="button"
    @click="confirmDeleteModalOpen = true"
    @keyup.enter="confirmDeleteModalOpen = true"
  >
    <slot></slot>
    <portal to="modals" v-if="confirmDeleteModalOpen">
      <confirm-delete-modal
        :show="confirmDeleteModalOpen"
        @close="confirmDeleteModalOpen = false"
        :account-id="accountId"
      />
    </portal>
  </button>
</template>

<script>
import ConfirmDeleteModal from './ConfirmDeleteModal.vue'

export default {
  components: {
    ConfirmDeleteModal
  },
  props: ['accountId'],
  data() {
    return {
      confirmDeleteModalOpen: false
    }
  }
}
</script>

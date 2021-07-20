<template>
  <div class="card">
    <h1 class="text-2xl font-bold mb-6">Your Settings</h1>
    <label class="block mb-6">
      <span class="block text-grey-darker font-semibold mb-2">Name</span>
      <input v-model="name" class="form-input" :placeholder="'your name...'" />
    </label>
    <label class="block mb-6">
      <span class="block text-grey-darker font-semibold mb-2"
        >Auto Formated Name</span
      >
      <input
        :value="name | capitalize | formattedName"
        @blur="name = $event.target.value"
        class="form-input"
        :placeholder="'your name...'"
      />
    </label>
    <label class="block mb-6">
      <span class="block text-grey-darker font-semibold mb-2"
        >Auto Formated to Currency</span
      >
      <input
        :value="amount | formatCurrency"
        @blur="amount = $event.target.value"
        class="form-input"
        :placeholder="'$0.00'"
      />
    </label>
    <label class="block mb-6">
      <span class="block text-grey-darker font-semibold mb-2"
        >Email Address</span
      >
      <input v-model="email" class="form-input" placeholder="you@example.com" />
    </label>
    <div class="mb-8">
      <span class="block text-grey-darker font-semibold mb-2">Newsletter</span>
      <div class="flex justify-between items-center">
        <p class="mr-4">Send you occasional news and updates.</p>
        <toggle-input v-model="receiveNewsletter" class="flex-no-shrink" />
      </div>
    </div>
    <div class="flex justify-between">
      <!-- styleable component -->
      <delete-account-button
        :account-id="accountId"
        class="btn btn-red btn-with-icon"
      >
        <font-awesome-icon :icon="['far', 'trash-alt']" />
        Delete account
      </delete-account-button>
      <button type="button" class="btn btn-blue">Update Settings</button>
    </div>
  </div>
</template>

<script>
import DeleteAccountButton from './DeleteAccountButton.vue'
import ToggleInput from './ToggleInput.vue'

export default {
  components: {
    DeleteAccountButton,
    ToggleInput
  },
  props: ['accountId'],
  filters: {
    capitalize: function (value) {
      if (!value) return ''
      value = value.toString()

      return value.charAt(0).toUpperCase() + value.slice(1)
    },
    formatCurrency(val) {
      if (val === '') {
        return ''
      }
      let number = +val.replace(/[^\d.]/g, '')

      const standardFormat = new Intl.NumberFormat('en-AU', {
        style: 'currency',
        currency: 'AUD',
        minimumFractionDigis: 2
      })

      return isNaN(number) ? '$0.00' : standardFormat.format(number)
    },
    formattedName(val) {
      return val !== '' ? `Hi ${val}` : ''
    }
  },
  data() {
    return {
      name: '',
      email: 'jane@example.com',
      amount: '',
      receiveNewsletter: false
    }
  },
  computed: {
    formattedInput() {
      return this.name == '' ? '' : `Hi ${this.name}`
    }
  },
  methods: {
    toggleNewsletter() {
      this.receiveNewsletter = !this.receiveNewsletter
    }
  }
}
</script>

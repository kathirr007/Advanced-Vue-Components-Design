<template>
  <element-dimensions>
    <div
      slot-scope="{ width }"
      class="profile-card"
      :class="{ 'profile-card--horizontal': width >= 400 }"
    >
      <img
        class="profile-card-image"
        :src="`https://loremflickr.com/480/480/girl/all?random=${randomNumber}`"
        alt=""
      />
      <div class="profile-card-meta">
        <div class="mb-4">
          <p class="text-xl leading-tight">Toby Flenderson</p>
          <p class="text-sm leading-tight text-grey-dark">
            Human Resources at Dunder Mifflin
          </p>
        </div>
        <div>
          <button class="btn btn-sm btn-pill btn-indigo-outline">
            Message
          </button>
        </div>
      </div>
    </div>
  </element-dimensions>
</template>

<script>
import ElementDimensions from '@/components/ElementDimensions.vue'

import { randomNumber } from '@/utils'

export default {
  name: 'ProfileCard',
  components: {
    ElementDimensions
  },
  computed: {
    randomNumber: () => randomNumber(143)
  }
}
</script>

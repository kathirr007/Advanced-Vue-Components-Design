<template>
  <renderless-tag-input
    :tags="tags"
    @update="(newTag) => $emit('update', newTag)"
    :remove-on-backspace="false"
  >
    <div
      class="stacked-tag-input"
      slot-scope="{ tags, addTag, removeBtnEvents, inputProps, inputEvents }"
    >
      <div class="stacked-tag-input-form">
        <input
          class="form-input"
          placeholder="Add tag..."
          v-bind="inputProps"
          v-on="inputEvents"
        />
        <button class="btn btn-indigo" @click="addTag" @keyup.enter="addTag">
          Add Tag
        </button>
      </div>
      <ul class="stacked-tag-list">
        <li v-for="tag in tags" :key="tag">
          {{ tag }}
          <button
            type="button"
            class="stacked-tag-link"
            v-on="removeBtnEvents(tag)"
          >
            Remove
          </button>
        </li>
      </ul>
    </div>
  </renderless-tag-input>
</template>

<script>
import RenderlessTagInput from '@/components/RenderlessTagInput'
export default {
  name: 'InlineTagInput',
  model: {
    prop: 'tags',
    event: 'update'
  },
  props: {
    tags: { required: true }
  },
  components: { RenderlessTagInput }
}
</script>

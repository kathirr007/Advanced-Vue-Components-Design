<template>
  <renderless-tag-input
    :tags="tags"
    @update="(newTag) => $emit('update', newTag)"
  >
    <template v-slot="{ tags, removeBtnEvents, inputProps, inputEvents }">
      <div class="tag-input">
        <span v-for="tag in tags" :key="tag" class="tag-input-tag">
          <span>{{ tag }}</span>
          <button
            type="button"
            class="tag-input-remove"
            v-on="removeBtnEvents(tag)"
          >
            &times;
          </button>
        </span>
        <input
          class="tag-input-text"
          placeholder="Add tag..."
          v-bind="inputProps"
          v-on="inputEvents"
        />
      </div>
    </template>
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

<script>
import elementResizeDetector from 'element-resize-detector'

const erd = elementResizeDetector({ strategy: 'scroll' })

export default {
  name: 'ElementDimensions',
  data() {
    return {
      width: '',
      height: ''
    }
  },
  mounted() {
    erd.listenTo(this.$el, (el) => {
      this.width = el.offsetWidth
      this.height = el.offsetHeight
    })
  },
  render(h) {
    return this.$scopedSlots.default({
      width: this.width,
      height: this.height
    })
  }
}
</script>

<style lang="scss" scoped></style>

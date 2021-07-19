export default {
  props: {
    preventBackgroundScrolling: { default: true }
  },
  mounted() {
    this.preventBackgroundScrolling &&
      document.body.style.setProperty('overflow', 'hidden')
  },
  beforeDestroy() {
    this.preventBackgroundScrolling &&
      document.body.style.removeProperty('overflow')
  }
}

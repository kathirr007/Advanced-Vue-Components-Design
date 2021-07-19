<script>
export default {
  name: 'FetchJson',
  props: ['url'],
  data() {
    return {
      response: null,
      loading: true
    }
  },
  created() {
    fetch(this.url)
      .then((response) => response.json())
      .then((response) => {
        setTimeout(() => {
          this.response = response
          this.loading = false
        }, 2500)
      })
  },
  render() {
    return this.$scopedSlots.default({
      response: this.response,
      loading: this.loading
    })
  }
}
</script>

<style lang="scss" scoped></style>

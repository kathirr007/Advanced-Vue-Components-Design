<script>
import contacts from '@/contacts.json'
export default {
  name: 'RenderWithChildren',
  props: [],
  data() {
    return {
      contacts
    }
  },
  render(h) {
    return h(
      'div',
      {
        attrs: {
          class: 'max-w-sm mx-auto mb-8'
        }
      },
      [
        h(
          'h2',
          { attrs: { class: 'text-white text-center' } },
          'Render function with children'
        ),
        h(
          'ul',
          {
            attrs: {
              class: 'text-white my-4 w-50'
            }
          },
          this.contacts.map((contact) => {
            return h('li', {}, `${contact.name.first} ${contact.name.last}`)
          })
        )
      ]
    )
  }
}
</script>

<style lang="scss" scoped></style>

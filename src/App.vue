<template>
  <div class="min-h-screen bg-grey-darker p-8">
    <h1 class="text-center text-white mb-4">Advanced Vue Components Design</h1>
    <h2 class="mt-8 mb-4 text-white text-center">
      Search select component [Compund componnet]
    </h2>
    <div class="max-w-sm mx-auto card mb-8">
      <div class="mb-4">
        <label class="form-label mb-2">Favorite Thrash Band</label>
        <search-select
          v-model="selectedOption"
          :options="selectOptions"
          :filter-function="filterFunction"
        ></search-select>
      </div>
      <div class="text-right">
        <button type="button" class="btn btn-blue">Save Changes</button>
      </div>
    </div>
    <h2 class="mt-8 mb-4 text-white text-center">
      Compound component with renderless, provide/inject, external-library,
      v-model bining, scoped-slots
    </h2>
    <div class="max-w-sm mx-auto card mb-8">
      <h2 class="-mt-4 mb-4">Your sortable contacts</h2>
      <sortable-list v-model="contacts">
        <template v-slot:default="{ items }">
          <div class="contact-list">
            <sortable-item v-for="contact in items" :key="contact.id">
              <div class="contact-list-item">
                <div class="contact-list-contact">
                  <img
                    :src="contact.avatar"
                    class="contact-list-avatar"
                    alt=""
                  />
                  <div>
                    <div class="contact-list-name">{{ contact.name }}</div>
                    <div class="contact-list-email">{{ contact.email }}</div>
                  </div>
                </div>
                <sortable-handle>
                  <svg
                    class="contact-list-handle"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M14 4h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1zM8 4h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1zm6 6h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1zm-6 0h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1zm6 6h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1zm-6 0h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1z"
                    />
                  </svg>
                </sortable-handle>
              </div>
            </sortable-item>
          </div>
        </template>
      </sortable-list>
    </div>
    <div class="max-w-sm mx-auto">
      <user-settings-form :accountId="accountId"></user-settings-form>
    </div>
    <div class="max-w-sm card my-4 mx-auto">
      <label class="block">
        <span class="form-label mb-2">Select a date</span>
        <date-picker
          class="form-input"
          v-model="date"
          format="D MMM YYYY"
          :options="{ firstDay: 1 }"
        ></date-picker>
      </label>
    </div>

    <div class="max-w-sm mx-auto">
      <div class="p-8 mb-4 text-center">
        <button
          @click="announcmentModalOpen = true"
          @keyup.enter="announcmentModalOpen = true"
          type="button"
          class="btn btn-blue"
        >
          Open Modal
          <portal to="modals" v-if="announcmentModalOpen">
            <announcement-modal
              :show="announcmentModalOpen"
              @close="announcmentModalOpen = false"
            ></announcement-modal>
          </portal>
        </button>
      </div>
    </div>

    <div class="max-w-sm mx-auto mb-8">
      <h2 class="text-center text-white mb-4">Injecting content using slots</h2>
      <media-card>
        <img
          slot="image"
          src="https://images.unsplash.com/photo-1495835788122-ca48931258be?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=acc48b0187b28f7a221362b843f15755&auto=format&fit=crop&w=3450&q=80"
          alt=""
        />
        <template slot="heading">
          The Long Road to Mastering the Perfect Cartwheel
        </template>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia eos
          accusantium minima architecto natus sequi quisquam incidunt dolorem,
          adipisci accusamus facere dicta magni, qui consectetur, omnis quis,
          voluptas tempore quo!
        </p>
      </media-card>
    </div>

    <render-with-children></render-with-children>

    <div class="max-w-sm mx-auto mb-8">
      <fetch-json url="/albums.json">
        <template v-slot:default="{ response: albums, loading }">
          <div class="card">
            <h2 class="text-2xl font-bold mb-6">Your Albums</h2>
            <div v-if="loading" class="text-center">
              Loading <font-awesome-icon :icon="['fas', 'spinner']" spin />
            </div>
            <div v-else class="album-grid">
              <div
                class="album-grid-item"
                v-for="(album, i) in albums"
                :key="i + 1"
              >
                <img :src="album.artwork" alt="" />
              </div>
            </div>
          </div>
        </template>
      </fetch-json>
    </div>

    <fetch-json url="/contacts.json">
      <template v-slot:default="{ response: contacts, loading }">
        <div class="max-w-sm mx-auto mb-8">
          <div class="card">
            <h2 class="text-2xl font-bold mb-6">Your Contacts</h2>
            <div v-if="loading" class="text-center">
              Loading <font-awesome-icon :icon="['fas', 'spinner']" spin />
            </div>
            <contact-list v-else :contacts="contacts"></contact-list>
          </div>
        </div>
      </template>
    </fetch-json>

    <div class="max-w-sm mx-auto mb-8 card">
      <h2 class="text-gray-700 mb-4">
        Wrapped Renderless in stacked-tag-input
      </h2>
      <stacked-tag-input v-model="tags"> </stacked-tag-input>
    </div>

    <div class="max-w-sm mx-auto mb-8 card">
      <h2 class="text-gray-700 mb-4">Wrapped Renderless in inline-tag-input</h2>
      <inline-tag-input v-model="tags"> </inline-tag-input>
    </div>
    <div class="max-w-sm mx-auto mb-8 card">
      <h2 class="text-gray-700 mb-4">Renderless tag input customized</h2>
      <renderless-tag-input v-model="tags" :removeOnBackspace="false">
        <div
          class="stacked-tag-input"
          slot-scope="{
            tags,
            addTag,
            removeBtnEvents,
            inputProps,
            inputEvents
          }"
        >
          <div class="stacked-tag-input-form">
            <input
              class="form-input"
              placeholder="Add tag..."
              v-bind="inputProps"
              v-on="inputEvents"
            />
            <button
              class="btn btn-indigo"
              @click="addTag"
              @keyup.enter="addTag"
            >
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
    </div>
    <div class="max-w-sm mx-auto mb-8 card">
      <h2 class="text-gray-700 mb-4">Renderless tag input</h2>
      <renderless-tag-input v-model="tags">
        <template v-slot="{ tags, removeBtnEvents, inputProps, inputEvents }">
          <div class="tag-input">
            <span v-for="tag in tags" :key="tag" class="tag-input-tag">
              <!-- <button
                type="button"
                class="tag-input-remove"
                @click="removeTag(tag)"
                @keyup.enter="removeTag(tag)"
              >
                &times;
              </button> -->
              <button
                type="button"
                class="tag-input-remove"
                v-on="removeBtnEvents(tag)"
              >
                &times;
              </button>
              <span>{{ tag }}</span>
            </span>
            <!-- <input
              class="tag-input-text"
              placeholder="Add tag..."
              v-model="input"
              @keydown.backspace="handleBackspace"
              @keydown.enter.prevent="addTag"
            /> -->
            <input
              class="tag-input-text"
              placeholder="Add tag..."
              v-bind="inputProps"
              v-on="inputEvents"
            />
          </div>
        </template>
      </renderless-tag-input>
    </div>
    <div class="max-w-sm mx-auto mb-8 card">
      <h2 class="text-gray-700 mb-4">Original Tag Input</h2>
      <tag-input v-model="tags"></tag-input>
    </div>
    <div class="mx-auto mb-8">
      <profile-card></profile-card>
    </div>
    <div class="mx-auto mb-8">
      <profile-card></profile-card>
    </div>
    <div class="mx-auto mb-8">
      <h2 class="text-white text-center mb-4">
        Provide / Inject in accordion with multiple panel options
      </h2>
      <accordion-list :multiple="true">
        <accordion-item :isActive="true" :item-id="1">
          <template slot="header"> Item A </template>
          <template slot="content">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Error
            pariatur ducimus veritatis quis explicabo, reiciendis beatae magni
            consequatur alias qui sit nulla porro distinctio blanditiis
            voluptate in corrupti ex non.
          </template>
        </accordion-item>
        <accordion-item :item-id="2">
          <template slot="header"> Item B </template>
          <template slot="content">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Error
            pariatur ducimus veritatis quis explicabo, reiciendis beatae magni
            consequatur alias qui sit nulla porro distinctio blanditiis
            voluptate in corrupti ex non.
          </template>
        </accordion-item>
        <accordion-item :item-id="3">
          <template slot="header"> Item C </template>
          <template slot="content">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Error
            pariatur ducimus veritatis quis explicabo, reiciendis beatae magni
            consequatur alias qui sit nulla porro distinctio blanditiis
            voluptate in corrupti ex non.
          </template>
        </accordion-item>
      </accordion-list>
    </div>
    <div class="mx-auto mb-8">
      <h2 class="text-white text-center mb-4">Provide / Inject in accordion</h2>
      <accordion-list>
        <accordion-item :item-id="1">
          <template slot="header"> Item A </template>
          <template slot="content">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Error
            pariatur ducimus veritatis quis explicabo, reiciendis beatae magni
            consequatur alias qui sit nulla porro distinctio blanditiis
            voluptate in corrupti ex non.
          </template>
        </accordion-item>
        <accordion-item :item-id="2">
          <template slot="header"> Item B </template>
          <template slot="content">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Error
            pariatur ducimus veritatis quis explicabo, reiciendis beatae magni
            consequatur alias qui sit nulla porro distinctio blanditiis
            voluptate in corrupti ex non.
          </template>
        </accordion-item>
        <accordion-item :is-active="true" :item-id="3">
          <template slot="header"> Item C </template>
          <template slot="content">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Error
            pariatur ducimus veritatis quis explicabo, reiciendis beatae magni
            consequatur alias qui sit nulla porro distinctio blanditiis
            voluptate in corrupti ex non.
          </template>
        </accordion-item>
      </accordion-list>
    </div>

    <portal-target name="modals"></portal-target>
  </div>
</template>

<script>
import UserSettingsForm from '@/components/UserSettingsForm.vue'
import AnnouncementModal from '@/components/AnnouncementModal.vue'
import DatePicker from '@/components/DatePicker.vue'
import MediaCard from '@/components/MediaCard.vue'
import RenderWithChildren from '@/components/RenderWithChildren.vue'
import FetchJson from '@/components/FetchJson.vue'
import ContactList from '@/components/ContactList.vue'
import TagInput from '@/components/TagInput.vue'
import RenderlessTagInput from '@/components/RenderlessTagInput.vue'
import InlineTagInput from '@/components/InlineTagInput.vue'
import StackedTagInput from '@/components/StackedTagInput.vue'
import ElementDimensions from '@/components/ElementDimensions.vue'
import ProfileCard from '@/components/ProfileCard.vue'
import AccordionList from '@/components/AccordionList.vue'
import AccordionItem from '@/components/AccordionItem.vue'
import SortableList from '@/components/SortableList.vue'
import SortableItem from '@/components/SortableItem.vue'
import SortableHandle from '@/components/SortableHandle.vue'
import SearchSelect from '@/components/SearchSelect.vue'

export default {
  components: {
    SearchSelect,
    AccordionList,
    AccordionItem,
    ProfileCard,
    ElementDimensions,
    UserSettingsForm,
    DatePicker,
    AnnouncementModal,
    MediaCard,
    RenderWithChildren,
    FetchJson,
    ContactList,
    TagInput,
    RenderlessTagInput,
    InlineTagInput,
    StackedTagInput,
    SortableList,
    SortableItem,
    SortableHandle
  },
  data() {
    return {
      contacts: [
        {
          id: 1,
          name: 'Alfreda Ferreira',
          email: 'alfreda.ferreira@example.com',
          avatar: 'https://randomuser.me/api/portraits/med/women/6.jpg'
        },
        {
          id: 2,
          name: 'Leevi Wirtanen',
          email: 'leevi.wirtanen@example.com',
          avatar: 'https://randomuser.me/api/portraits/med/men/19.jpg'
        },
        {
          id: 3,
          name: 'Kaitlin Sutton',
          email: 'kaitlin.sutton@example.com',
          avatar: 'https://randomuser.me/api/portraits/med/women/2.jpg'
        },
        {
          id: 4,
          name: 'Alice Wilson',
          email: 'alice.wilson@example.com',
          avatar: 'https://randomuser.me/api/portraits/med/women/62.jpg'
        },
        {
          id: 5,
          name: 'Etienne Roy',
          email: 'etienne.roy@example.com',
          avatar: 'https://randomuser.me/api/portraits/med/men/4.jpg'
        }
      ],
      announcmentModalOpen: false,
      date: '2021-07-18',
      accountId: 78,
      tags: ['awesome', 'excellent', 'amazing'],
      selectedOption: null,
      selectOptions: [
        'Anthrax',
        'Dark Angel',
        'Death Angel',
        'Destruction',
        'Exodus',
        'Flotsam and Jetsam',
        'Kreator',
        'Megadeth',
        'Metallica',
        'Overkill',
        'Sepultura',
        'Slayer',
        'Testament'
      ]
    }
  },
  methods: {
    filterFunction(options, search) {
      return options.filter((item) =>
        item.toLowerCase().startsWith(search.toLowerCase())
      )
    }
  }
}
</script>

<style src="@/assets/css/app.css" />

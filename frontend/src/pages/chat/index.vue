<template>
  <div class="WAL position-relative bg-grey-4" :style="style">
    <q-layout view="lHh Lpr lFf" class="WAL__layout shadow-3" container>
      <q-header elevated>
        <q-toolbar class="bg-grey-3 text-black">
          <q-btn
            round
            flat
            icon="keyboard_arrow_left"
            class="WAL__drawer-open q-mr-sm"
            @click="leftDrawerOpen = true"
          />

          <q-btn round flat>
            <q-avatar>
              <img :src="currentConversation.avatar" v-if="currentConversation">
            </q-avatar>
          </q-btn>

          <span class="q-subtitle-1 q-pl-md" v-if="currentConversation">
            {{ currentConversation.person }}
          </span>

          <q-space/>

          <q-btn round flat icon="search" />
          <q-btn round flat>
            <q-icon name="attachment" class="rotate-135" />
          </q-btn>
          <q-btn round flat icon="more_vert">
            <q-menu auto-close :offset="[110, 0]">
              <q-list style="min-width: 150px">
                <q-item clickable>
                  <q-item-section>Contact data</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section>Block</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section>Select messages</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section>Silence</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section>Clear messages</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section>Erase messages</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </q-toolbar>
      </q-header>

      <q-drawer
        v-model="leftDrawerOpen"
        bordered
        show-if-above
        :breakpoint="690"
      >
        <q-toolbar class="bg-grey-3">
          <q-avatar class="cursor-pointer" @click="$router.push({name: 'feed'})">
             <q-icon name="fas fa-arrow-circle-left" />
          </q-avatar>

          <q-space />

          <q-btn round flat icon="message" />
          <q-btn round flat icon="more_vert">
            <q-menu auto-close :offset="[110, 8]">
              <q-list style="min-width: 150px">
                <q-item clickable>
                  <q-item-section>New group</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section>Profile</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section>Archived</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section>Favorites</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section>Settings</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section>Logout</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>

          <q-btn
            round
            flat
            icon="close"
            class="WAL__drawer-close"
            @click="leftDrawerOpen = false"
          />
        </q-toolbar>

        <q-toolbar class="bg-grey-2">
          <q-input rounded outlined dense class="WAL__field full-width" bg-color="white" v-model="searchUser" placeholder="Search or start a new conversation">
            <template slot="prepend">
              <q-icon name="search" />
            </template>
          </q-input>
        </q-toolbar>

        <q-scroll-area style="height: calc(100% - 100px)">
          <q-list>
            <q-item
              v-for="(conversation, index) in conversations"
              :key="conversation.id"
              clickable
              v-ripple
              @click="handleOnConversationSelect(conversation, index)"
            >
              <q-item-section avatar>
                <q-avatar>
                  <img :src="conversation.avatar">
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label lines="1">
                  {{ conversation.person }}
                </q-item-label>
                <q-item-label class="conversation__summary" caption>
                  <q-icon name="check" v-if="conversation.sent" />
                  <q-icon name="fas fa-ban" v-if="conversation.deleted" />
                  {{ conversation.caption }}
                </q-item-label>
              </q-item-section>

              <q-item-section side>
                <q-item-label caption>
                  {{ conversation.time }}
                </q-item-label>
            <q-icon name="fas fa-circle" class="text-green" style="font-size: 0.7em"/>
              </q-item-section>
            </q-item>
            <q-inner-loading :showing="loadingConverstions">
                <q-spinner-ios size="50px" color="primary" />
              </q-inner-loading>
          </q-list>
        </q-scroll-area>
      </q-drawer>

      <q-page-container class="bg-grey-2">
          <q-page padding>
            {{chatMessenges}}
             <q-chat-message
                v-for="chatMessenge in chatMessenges"
                :key="chatMessenge.id"
                :name="chatMessenge.name"
                :avatar="chatMessenge.avatar"
                :text="[chatMessenge.text]"
                :stamp="chatMessenge.stamp"
                :sent="chatMessenge.sent"
                :bg-color="(chatMessenge.sent) ? 'amber-7': 'blue' "
            />
            <q-chat-message
                name="me"
                avatar="https://cdn.quasar.dev/img/avatar3.jpg"
                :text="['hey, how are you?']"
                stamp="7 minutes ago"
                :sent="true"
                bg-color="amber-7"
            />
            <q-chat-message
                name="Jane"
                avatar="https://cdn.quasar.dev/img/avatar5.jpg"
                :text="[
                'doing fine, how r you?',
                'I just feel like typing a really, really, REALY long message to annoy you...'
                ]"
                size="6"
                stamp="4 minutes ago"
                text-color="white"
                bg-color="grey"
            />
            <q-chat-message
                name="Jane"
                avatar="https://cdn.quasar.dev/img/avatar5.jpg"
                :text="['Did it work?']"
                stamp="1 minutes ago"
                size="8"
                text-color="white"
                bg-color="grey"
            />
            <q-chat-message
                name="me"
                avatar="https://cdn.quasar.dev/img/avatar3.jpg"
                :text="['hey, how are you?']"
                stamp="7 minutes ago"
                sent
                bg-color="amber-7"
            />
            <q-chat-message
                name="Jane"
                avatar="https://cdn.quasar.dev/img/avatar5.jpg"
                :text="[
                'doing fine, how r you?',
                'I just feel like typing a really, really, REALY long message to annoy you...'
                ]"
                size="6"
                stamp="4 minutes ago"
                text-color="white"
                bg-color="grey"
            />
            <q-chat-message
                name="Jane"
                avatar="https://cdn.quasar.dev/img/avatar5.jpg"
                :text="['Did it work?']"
                stamp="1 minutes ago"
                size="8"
                text-color="white"
                bg-color="grey"
            /><q-chat-message
                name="me"
                avatar="https://cdn.quasar.dev/img/avatar3.jpg"
                :text="['hey, how are you?']"
                stamp="7 minutes ago"
                sent
                bg-color="amber-7"
            />
            <q-chat-message
                name="Jane"
                avatar="https://cdn.quasar.dev/img/avatar5.jpg"
                :text="[
                'doing fine, how r you?',
                'I just feel like typing a really, really, REALY long message to annoy you...'
                ]"
                size="6"
                stamp="4 minutes ago"
                text-color="white"
                bg-color="grey"
            />
            <q-chat-message
                name="Jane"
                avatar="https://cdn.quasar.dev/img/avatar5.jpg"
                :text="['Did it work?']"
                stamp="1 minutes ago"
                size="8"
                text-color="white"
                bg-color="grey"
            />
            <q-banner class="bg-primary text-white">
              Unfortunately, the credit card did not go through, please try again.
            </q-banner>
          </q-page>
      </q-page-container>

      <q-footer>
        <q-toolbar class="bg-grey-3 text-black row">
          <q-btn round flat icon="insert_emoticon" class="q-mr-sm" />
          <q-input rounded outlined dense class="WAL__field col-grow q-mr-sm" bg-color="white" v-model="message" placeholder="Type a message" />
          <q-btn round flat icon="mic" @click="handleSubmitMessage"/>
        </q-toolbar>
      </q-footer>
    </q-layout>
  </div>
</template>

<script>
import io from 'socket.io-client'
import jwtDecode from 'jwt-decode'

export default {
  name: 'ChatAppLayout',
  data () {
    return {
      chatMessenges: [],
      socket: '',
      leftDrawerOpen: false,
      searchUser: '',
      message: '',
      loadingConverstions: false,
      currentConversationIndex: 0,
      conversations: [
        {
          id: 1,
          person: 'Razvan Stoenescu',
          avatar: 'https://cdn.quasar.dev/img/avatar5.jpg',
          caption: 'I\'m working on Quasar!',
          time: '15:00',
          sent: true
        },
        {
          id: 2,
          person: 'Dan Popescu',
          avatar: 'https://cdn.quasar.dev/img/avatar5.jpg',
          caption: 'I\'m working on Quasar!',
          time: '16:00',
          deleted: true
        },
        {
          id: 3,
          person: 'Denjell Thompson-Yvetot',
          avatar: 'https://cdn.quasar.dev/img/avatar5.jpg',
          caption: 'I\'m working on Quasar!',
          time: '17:00',
          sent: true
        },
        {
          id: 4,
          person: 'Jeff Galbraith',
          avatar: 'https://cdn.quasar.dev/img/avatar5.jpg',
          caption: 'I\'m working on Quasar!',
          time: '18:00',
          sent: true
        }
      ]
    }
  },
  mounted () {
    this.socket = io('http://localhost:4000?token=' + this.$q.sessionStorage.getItem('token'),
      {
        path: '/api/v1/socket'
      }
    )
  },
  computed: {
    getCurrentUser () {
      return jwtDecode(this.$q.sessionStorage.getItem('token'))
    },
    currentConversation () {
      if (this.conversations) {
        return this.conversations[this.currentConversationIndex]
      } else {
        return ''
      }
    },

    style () {
      return {
        height: this.$q.screen.height + 'px'
      }
    }
  },

  watch: {
    searchUser: {
      handler (username) {
        if (username) this.handleRemoteSearchUser(username)
        else this.conversations = []
      }
    },
    leftDrawerOpen (val) {
      // if user opens drawer in mobile mode
      // then widens the window and closes drawer,
      // we should still show drawer on page in standard mode
      if (val === false && this.$q.screen.width >= 690) {
        this.$nextTick(() => {
          this.leftDrawerOpen = true
        })
      }
    }
  },
  methods: {
    handleOnConversationSelect (conversation, index) {
      this.currentConversationIndex = index
      this.$axios.get(`/api/v1/chat/${conversation.id}`)
        .then(response => {
          if (response.data.hasOwnProperty('messages')) {
            this.chatMessenges = response.data.messages.messages.map(message => {
              console.log(message.from._id)
              console.log(this.getCurrentUser.userId)
              console.log('------------------')
              return {
                id: message._id,
                name: '',
                avatar: 'https://cdn.quasar.dev/img/avatar5.jpg',
                stamp: '1 minutes ago',
                text: message.message,
                textColor: 'white',
                bgColor: 'amber-7',
                sent: message.from._id === this.getCurrentUser.userId
              }
            })
          } else {

          }
          console.log(response.data)
        })
    },
    handleSubmitMessage () {
      this.socket.emit('new message', {
        to: this.conversations[this.currentConversationIndex].id,
        message: this.message
      })
      this.$axios.get(`/api/v1/chat/${this.conversations[this.currentConversationIndex].id}`)
        .then(response => {
          if (response.data.hasOwnProperty('messages')) {
            this.chatMessenges = response.data.messages.messages.map(message => {
              return {
                id: message._id,
                name: '',
                avatar: 'https://cdn.quasar.dev/img/avatar5.jpg',
                stamp: '1 minutes ago',
                text: message.message,
                textColor: 'white',
                bgColor: 'amber-7',
                sent: message.from._id === this.getCurrentUser.userId
              }
            })
          } else {

          }
        })
    },
    handleRemoteSearchUser (username) {
      this.loadingConverstions = true
      this.conversations = []
      this.$axios.get(`/api/v1/users/${username}`)
        .then(response => {
          this.loadingConverstions = false
          if (response.data.users.length > 0) {
            this.conversations = response.data.users.map(user => {
              return {
                id: user._id,
                person: user.name,
                avatar: 'https://cdn.quasar.dev/img/avatar5.jpg',
                caption: 'I\'m working on Quasar!',
                time: '18:00',
                sent: true
              }
            })
          } else {
            this.conversations = []
          }
        })
    }
  }
}
</script>

<style lang="stylus">
.WAL
  width 100%
  height 100%

  &:before
    content ''
    height 127px
    position fixed
    top 0
    width 100%
    background-color #009688

  &__layout
    margin 0 auto
    z-index 4000
    height 100%
    width 100%
    border-radius 5px

  &__field.q-field--outlined .q-field__control:before
    border none

  .q-drawer--standard
    .WAL__drawer-close
      display none

@media (max-width 850px)
  .WAL
    padding 0
    &__layout
      width 100%
      border-radius 0

@media (min-width 691px)
  .WAL
    &__drawer-open
      display none

.conversation__summary
  margin-top 4px

.conversation__more
  margin-top 0!important
  font-size 1.4rem
</style>

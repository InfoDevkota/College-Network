<template>
  <div class="WAL position-relative bg-grey-4" :style="style">
    <q-layout view="lHh Lpr lFf" class="WAL__layout shadow-3" container>     

      <q-drawer
        v-model="leftDrawerOpen"
        bordered
        show-if-above
        :breakpoint="690"
      >
        <q-toolbar class="bg-grey-3">
          <!-- <q-avatar class="cursor-pointer" @click="$router.push({name: 'feed'})">
             <q-icon name="fas fa-arrow-circle-left" />
          </q-avatar> -->

          <q-space />

          <q-btn size="sm" round flat @click="newGroup.isVisible = true" icon="message" />
          <!-- <q-btn size="sm" round flat icon="more_vert">
            <q-menu auto-close :offset="[110, 8]">
              <q-list dense style="min-width: 150px">
                <q-item clickable @click="newGroup.isVisible = true">
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
          </q-btn> -->

          <q-btn
            round
            flat
            icon="close"
            class="WAL__drawer-close"
            @click="leftDrawerOpen = false"
          />
        </q-toolbar>

        <!-- <q-toolbar class="bg-grey-2">
          <q-input rounded outlined dense class="WAL__field full-width" bg-color="white" v-model="searchUser" placeholder="Search or start a new conversation">
            <template slot="prepend">
              <q-icon name="search" />
            </template>
          </q-input>
        </q-toolbar> -->
        <q-scroll-area style="height: calc(100% - 100px)">
          <q-list>
            <q-item
              v-for="(conversation, index) in conversations"
              :key="index"
              clickable
              v-ripple
              :active="conversation.id === $route.params.conversationId"
              @click="handleOnConversationSelect(conversation, index)"
              active-class="my-active-chat"
            >
              <q-item-section avatar>
                <q-avatar>
                  <img :src="conversation.avatar">
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label lines="1">
                  {{conversation.conversationName}}
                </q-item-label>
                <q-item-label class="conversation__summary" caption>
                  <!-- <q-icon name="check" v-if="conversation.sent" />
                  <q-icon name="fas fa-ban" v-if="conversation.deleted" /> -->
                  <b>{{ conversation.author.name }}: </b> {{ conversation.message }}
                </q-item-label>
              </q-item-section>

              <q-item-section side>
                <q-item-label caption>
                  {{ conversation.date | fromNow }}
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
          <router-view></router-view>
      </q-page-container>

      <q-footer class="bg-grey-3" v-if="$route.name === 'chat-message-detail'">
        <q-chip removable v-for="(file, index) in fileList.files" :key="index" class="shadow-2" size="sm" text-color="white"  @remove="deleteFile(index)" color="primary">
          <q-avatar>
            <img :src="getImage(file)">>
          </q-avatar>
          {{file.name}}
        </q-chip>
        <q-toolbar class="bg-grey-3 text-black row" >
          <!-- <q-btn round flat icon="insert_emoticon" class="q-mr-sm" /> -->
          <q-input rounded outlined dense class="WAL__field col-grow q-mr-sm" bg-color="white" v-model="message" @keyup.enter.native="handleSubmitMessage" placeholder="Type a message" />
          <q-btn round flat size="sm" icon="fas fa-paper-plane" @click.prevent="handleSubmitMessage"/>
          <file-upload v-model="fileList">
            <div slot="activator">
              <q-btn round size="sm" flat icon="fas fa-paperclip" @click.prevent="handleSubmitMessage"/>
            </div>
          </file-upload>
        </q-toolbar>
      </q-footer>
    </q-layout>
     <q-dialog v-model="newGroup.isVisible" persistent>
      <q-card style="width: 650px; max-width: 40vw;">
        <q-form
            @submit="handleCreateNewConversation"
            @reset="onReset"
          >
        <q-toolbar>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg">
          </q-avatar>

          <q-toolbar-title>New<span class="text-weight-bold">Group</span></q-toolbar-title>

          <q-btn flat round dense icon="close" v-close-popup />
        </q-toolbar>

        <q-separator />

        <q-card-section style="max-height: 50vh" class="scroll">
          <q-input
            outlined
            dense
            v-model="newGroup.data.groupName"
            label="Name *"
            hint="Name is required"
            emit-value
            map-options
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
          />
          <q-select
            class="full-width"
            outlined
            label="Members *"
            v-model="newGroup.data.members"
            use-input
            dense
            multiple
            option-value="id"
            option-label="name"
            emit-value
            clearable
            stack-label
            input-debounce="0"
            :options="newGroup.data.memberOptions"
            @filter="remoteUsersToCreateNewGroup"
            map-options
            style="width: 250px"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
          >
          <template v-slot:selected-item="scope">
            <q-chip
              removable
              dense
              @remove="scope.removeAtIndex(scope.index)"
              :tabindex="scope.tabindex"
              color="primary"
              text-color="white"
              class="q-mr-xs"
            >
              <q-avatar>
                <q-img :src="scope.opt.avatar" />
              </q-avatar>
              {{ scope.opt.name }}
            </q-chip>
          </template>
            <template slot="prepend">
              <q-icon name="person_pin" />
            </template>
            <template v-slot:option="scope">
              <q-item
                dense
                v-bind="scope.itemProps"
                v-on="scope.itemEvents"
              >
                <q-item-section avatar>
                  <q-avatar>
                    <q-img :src="scope.opt.avatar" />
                  </q-avatar>                  
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ scope.opt.name }}</q-item-label>
                  <q-item-label caption>{{ scope.opt.email }}</q-item-label>
                </q-item-section>
              </q-item>
            </template>
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-italic text-grey">
                  No users found
                </q-item-section>
              </q-item>
            </template>
          </q-select>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn flat label="Create" color="primary" type="submit" />
          <q-btn flat label="Cancel" color="primary" type="reset" />
        </q-card-actions>
        </q-form>
      </q-card>
       
    </q-dialog>
  </div>
</template>

<script>
import jwtDecode from 'jwt-decode'
import FileUpload from '../../components/FileUpload'
import socket from '../../util/socket/socket'
import io from 'socket.io-client'
import moment from "moment";
export default {
  name: 'ChatAppLayout',
  components: {
    FileUpload: FileUpload
  },
  data () {
    return {
      fileList: {},
      currentConversationId: '',
      newGroup: {
        isLoading: false,
        errors: {
          responseError: "",
          requestError: "",
          clientError: ""
        },
        isVisible: false,
        data: {
          groupName: "",
          members: [],
          memberOptions: []
        }
      },
      chatMessenges: [],
      leftDrawerOpen: false,
      searchUser: '',
      message: '',
      loadingConverstions: false,
      currentConversationIndex: 0,
      conversations: [
        // {
        //   id: 1,
        //   person: 'Razvan Stoenescu',
        //   avatar: 'https://cdn.quasar.dev/img/avatar5.jpg',
        //   caption: 'I\'m working on Quasar!',
        //   time: '15:00',
        //   sent: true
        // },
        // {
        //   id: 2,
        //   person: 'Dan Popescu',
        //   avatar: 'https://cdn.quasar.dev/img/avatar5.jpg',
        //   caption: 'I\'m working on Quasar!',
        //   time: '16:00',
        //   deleted: true
        // },
        // {
        //   id: 3,
        //   person: 'Denjell Thompson-Yvetot',
        //   avatar: 'https://cdn.quasar.dev/img/avatar5.jpg',
        //   caption: 'I\'m working on Quasar!',
        //   time: '17:00',
        //   sent: true
        // },
        // {
        //   id: 4,
        //   person: 'Jeff Galbraith',
        //   avatar: 'https://cdn.quasar.dev/img/avatar5.jpg',
        //   caption: 'I\'m working on Quasar!',
        //   time: '18:00',
        //   sent: true
        // }
      ]
    }
  },
  filters: {
    fromNow: function(date) {
      return moment(date)
        .startOf("hour")
        .fromNow();
    }
  },
  created() {
    // socket.emit('created', 'Sagar')
    // socket.on('created', (data) => {
    //     console.log(data)
    // })
    // socket.on('chat-message', (data) => {
    //     this.messages.push({ message: data, type: 'receiving' })
    // })
    // socket.on('typing', (data) => {
    //     this.typing = true
    // })
    // socket.on('stopTyping', (data) => {
    //     this.typing = false
    // })  
  },
  mounted () {
    this.currentConversationId = this.$route.params.conversationId
    this.getCurrentUserConversations()
    // this.socket = socketIO
    // this.$axios.get(`/api/v1/chat/users`)
    //   .then(response => {
    //     this.conversations = response.data.users.map(user => {
    //       return {
    //         id: user._id,
    //         person: user.name,
    //         avatar: 'https://cdn.quasar.dev/img/avatar5.jpg',
    //         caption: 'I\'m working on Quasar!',
    //         time: '18:00',
    //         sent: true
    //       }
    //     })
    //   })
    // this.socket.on('newMessageSend', (data) => {
    //   console.log('##################SEND########################')
    //   this.chatMessenges.push(
    //     {
    //       id: data['messageId'],
    //       name: '',
    //       avatar: 'https://cdn.quasar.dev/img/avatar5.jpg',
    //       stamp: '1 minutes ago',
    //       text: data.message,
    //       textColor: 'white',
    //       bgColor: 'amber-7',
    //       sent: true
    //     }
    //   )
    // })
    // this.socket.on('newMessageReceived', (data) => {
    //   console.log('##################RECEIVED########################')
    //   console.log(typeof data.from)
    //   console.log(typeof this.conversations[this.currentConversationIndex].id)
    //   if (data.from === this.conversations[this.currentConversationIndex].id) {
    //     this.chatMessenges.push(
    //       {
    //         id: data['messageId'],
    //         name: '',
    //         avatar: 'https://cdn.quasar.dev/img/avatar5.jpg',
    //         stamp: '1 minutes ago',
    //         text: data.message,
    //         textColor: 'white',
    //         bgColor: 'amber-7',
    //         sent: false
    //       }
    //     )
    //   }
    // })
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
        height: this.$q.screen.height - 56 + 'px'
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
    deleteFile(index) {
      this.fileList.files.splice(index, 1);
    },
    getImage(file) {
      return URL.createObjectURL(file)
    },
    joinConversation(conversation) {
      socket.emit('join', { conversation }, function() {
        console.log("user has joined this channel.");
      })
    },
    async getCurrentUserConversations() {
      try {
        const { data } = await this.$axios.get(`/api/v1/chat/conversations/${this.getCurrentUser.userId}`)
        console.log(data)
        if(data && data.hasOwnProperty("conversations")) {
          this.conversations = data.conversations.map(conversation => {
          return {
            id: conversation[0] ? conversation[0].conversationId : "",
            author: conversation[0] ? conversation[0].author: "",
            message: conversation[0] ? conversation[0].body: "",
            date: conversation[0] ? conversation[0].updatedAt: "",
            conversationName: conversation.conversationName
            // id: user[0]._id,
            // person: user.name,
            // avatar: 'https://cdn.quasar.dev/img/avatar5.jpg',
            // caption: 'I\'m working on Quasar!',
            // time: '18:00',
            // sent: true
          }
        })
        }
      } catch (error) {

      } finally {

      }
    },
    onReset() {
      this.newGroup.data.groupName = ""
      this.newGroup.data.memberOptions = []
      this.newGroup.data.members = []
      this.newGroup.isVisible = false
    },
    remoteUsersToCreateNewGroup (val, update, abort) {
      if (val) {
        this.$axios.get(`/api/v1/users/${val}`).then(response => {
          update(() => {
            this.newGroup.data.memberOptions = response.data.users.filter(user => user._id !== this.getCurrentUser.userId).map(user => {
              return {
                id: user._id,
                name: user.name,
                avatar: this.$axios.defaults.baseURL + user.profileImage,
                email: user.email
              }
            })
          })
        })
      }
      // update(() => {
      //   this.customerOptions = ['ram', 'hari']
      // })
    },
    async handleCreateNewConversation() {
      try {
        // this.clearErrors(this.errors)
        let payload = {
          name: this.newGroup.data.groupName,
          recipients: [...this.newGroup.data.members, this.getCurrentUser.userId],
          message: 'Hi',
          user: this.getCurrentUser.userId
        }
        const {data, status} = await this.$axios.post('/api/v1/chat/conversation/new', payload)
        if(status === 201) {
          this.conversations.push({
            id: data.conversation.conversationId,
            author:  data.conversation.author,
            message:  data.conversation.body,
            conversationName: this.newGroup.data.groupName,
            date:  data.conversation.createdAt
          })
          this.$q.notify({
            color: 'teal',
            icon: 'post_add',
            position: 'bottom-right',
            message: `${this.newGroup.data.groupName} Group created.`
          })
          this.newGroup.isVisible = false
          // this.$router.push({ name: "feed" })
        }
      } catch (error) {
        if(error.response) {
          if(error.response.data.hasOwnProperty("errors")) {
            this.$q.notify({
            color: 'negative',
            icon: 'report_problem',
            position: 'top-right',
            message: 'One or more fields have errors.'
          })
            this.newGroup.errors.responseError = error.response.data.errors;
          }
        } else if(error.request) {
            this.newGroup.errors.requestError = error.request;
        } else {
          this.newGroup.errors.clientError = error.message
        }
      } finally {
      }
    },
    onMessageReceived () {
      
    },
    handleOnConversationSelect (conversation, index) {
      console.log(conversation)
      console.log("-----------")
      this.$router.push({name: 'chat-message-detail', params: { conversationId: conversation.id }})
      this.currentConversationId = conversation.id
      this.joinConversation(conversation.id);
    //   socket.on('connect', () => { // when user connects successfully
    //     console.log("Yaa user connected.")
    //     socket.emit('join', { conversation: 1 }, function() {
    //       console.log("user has joined this channel.");
    //     })
    // })
    //   this.currentConversationIndex = index
    //   this.currentConversationId = conversation.id
    //   this.$axios.get(`/api/v1/chat/conversation/${conversation.id}`)
    //     .then(response => {
    //       if (response.data.hasOwnProperty("conversation")) {
    //         this.chatMessenges = response.data.conversation.map(message => {
    //           return {
    //             id: message._id,
    //             name: message.author.name,
    //             avatar: 'https://cdn.quasar.dev/img/avatar5.jpg',
    //             stamp: message.createdAt,
    //             text: message.body,
    //             textColor: 'white',
    //             bgColor: 'amber-7',
    //             sent: message.author._id === this.getCurrentUser.userId
    //           }
    //         })
    //       } else {
    //         this.chatMessenges = []
    //       }
    //       console.log(response.data)
    //     })
    },
    handleSubmitMessage () {
      if(this.message) {
        this.$axios.post(`api/v1/chat/message/${this.$route.params.conversationId}/`, {
        message: this.message,
        user: this.getCurrentUser.userId
      })
      .then(response => {
        socket.emit('createMessage', {
          room: this.currentConversationId,
          text: this.message,
          sender: this.getCurrentUser
        },() =>{
          this.message = ""
        })
      })
      }
      
      // this.$axios.get(`/api/v1/chat/${this.conversations[this.currentConversationIndex].id}`)
      //   .then(response => {
      //     if (response.data.hasOwnProperty('messages')) {
      //       this.chatMessenges = response.data.messages.messages.map(message => {
      //         return {
      //           id: message._id,
      //           name: '',
      //           avatar: 'https://cdn.quasar.dev/img/avatar5.jpg',
      //           stamp: '1 minutes ago',
      //           text: message.message,
      //           textColor: 'white',
      //           bgColor: 'amber-7',
      //           sent: message.from._id === this.getCurrentUser.userId
      //         }
      //       })
      //     } else {
      //       this.chatMessenges = []
      //     }
      //   })
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
  height 90%

  &:before
    content ''
    height 127px
    position fixed
    top 0
    width 100%
    background-color #009688

  &__layout
    margin 0 auto
    z-index 0
    height 100%
    width 100%
    border-radius 0px

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

.my-active-chat
  color: white!important
  background rgba(0, 0, 0, 0) linear-gradient(150deg, rgb(0, 188, 212), rgb(0, 150, 136), rgb(103, 58, 183)) repeat scroll 0% 0%
</style>

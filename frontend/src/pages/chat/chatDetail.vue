<template>
<div>
  <q-header elevated>
        <q-toolbar class="bg-grey-3 text-black">
          <q-btn
            round
            flat
            icon="keyboard_arrow_left"
            class="WAL__drawer-open q-mr-sm"
          />
          <q-btn round flat v-for="(participant, index) of conversationDetail.participants" :key="index" @click="$router.push({name: 'user-profile', params: { id: participant._id }})">
            <q-avatar>              
              <img :src="$axios.defaults.baseURL + participant.profileImage">
            </q-avatar>
            <q-tooltip>
              {{participant.name}}
            </q-tooltip>
            <q-badge align="top" class="absolute-bottom" v-show="onlineUsers.includes(participant._id)" color="transparent">
              <q-icon
                name="fas fa-circle"
                class="text-green"
                style="font-size: 0.7em"
              />
            </q-badge>
            
          </q-btn>

          <span class="q-subtitle-1 q-pl-md" v-if="conversationDetail.conversation_name">
            {{ conversationDetail.conversation_name }}
          </span>
          <!--<q-space/>

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
          </q-btn> -->
        </q-toolbar>
      </q-header>
      <q-page padding v-scroll>
    <q-chat-message
      v-for="(chatMessenge, index) in chatMessenges"
      :key="index"
      :name="chatMessenge.name"
      :avatar="chatMessenge.avatar"
      :text="[chatMessenge.text]"
      :stamp="chatMessenge.stamp | fromNow"
      :sent="chatMessenge.sent"
      :bg-color="chatMessenge.sent ? 'amber-7' : 'blue'"
    />
    <!-- <q-chat-message
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
            /> -->
    <!-- <q-banner v-if="chatMessenges.length === 0" class="bg-primary text-white">
      This is your first conversation
    </q-banner> -->
  </q-page>
</div>
  
</template>
<script>
import jwtDecode from "jwt-decode";
import io from "socket.io-client";
import moment from "moment";
import socket from "../../util/socket/socket";
export default {
  props: ["conversationId"],
  data() {
    return {
      chatMessenges: [],
      conversationDetail: {},
      onlineUsers: []
    };
  },
  computed: {
   getAuthUser() {
      return this.$q.sessionStorage.getItem("authUser");
    }
  },
  directives: {
  	scroll: {
    	inserted: (el, binding) => {
        console.log(el.scrollHeight)
        // el.scroll({
        //   top: el.scrollHeight,
        //   behavior: 'slow'
        // });
      },
    },
  },
  mounted() {
    socket.on("onlineUser", (usersOnline) => {
          this.onlineUsers = usersOnline.map(user => user.userId)
        });
    console.log("receive message");
    socket.on("newMessage",(data) => {
      console.log(data);
      this.chatMessenges.push({
        id: data.room,
        name: data.sender.name,
        avatar: this.$axios.defaults.baseURL + this.getAuthUser.profileImage,
        stamp: new Date(),
        text: data.text,
        textColor: "white",
        bgColor: "amber-7",
        sent: data.sender.userId === this.getAuthUser.userId
      });
    });
  },
  filters: {
    fromNow: function(date) {
      return moment(date)
        .fromNow();
    }
  },
  created() {
  },
  watch: {
    conversationId: {
      immediate: true,
      handler(id) {
        // this.joinConversation()
        if(id) {
          this.$axios
          .get(`/api/v1/chat/conversation/${id}`)
          .then(response => {
            if (response.data.hasOwnProperty("conversation")) {
              this.conversationDetail = response.data.detail
              this.chatMessenges = response.data.conversation.map(message => {
                return {
                  id: message._id,
                  name: message.author.name,
                  avatar: this.$axios.defaults.baseURL + message.author.profileImage,
                  stamp: message.createdAt,
                  text: message.body,
                  textColor: "white",
                  bgColor: "amber-7",
                  sent: message.author._id === this.getAuthUser.userId
                };
              });
            } else {
              this.chatMessenges = [];
              this.conversationDetail = null
            }
            console.log(response);
          })
          .catch((error) => {
            console.log(error.message)
          })
        }
      }
    }
  },
  methods: {
    scrollToBottom(el, smooth) {
      if (typeof el.scroll === "function") {
        el.scroll({
          top: el.scrollHeight,
          behavior: smooth ? 'smooth' : 'instant'
        });
      } else {
        el.scrollTop = el.scrollHeight;
      }
    } 
    // joinConversation() {
    //   socket.emit('join', { conversation: this.conversationId }, function() {
    //     console.log("user has joined this channel.");
    //   })
    // }
  }
  // created() {
  //   socket.on('connect', () => { // when user connects successfully
  //     console.log("Yaa user connected.")
  //     socket.emit('join', { conversation: this.conversationId }, function() {
  //       console.log("user has joined this channel.");
  //     })
  // })
  // }
};
</script>

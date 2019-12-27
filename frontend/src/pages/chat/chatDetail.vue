<template>
  <q-page padding v-scroll>
    {{ chatMessenges }}
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
      chatMessenges: []
    };
  },
  created() {
    // socket = io("http://localhost:5000");
  },
  computed: {
    getCurrentUser() {
      return jwtDecode(this.$q.sessionStorage.getItem("token"));
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
    console.log("receive message");
    socket.on("newMessage",(data) => {
      console.log(data);
      this.chatMessenges.push({
        id: data.room,
        name: data.sender.name,
        avatar: "https://cdn.quasar.dev/img/avatar5.jpg",
        stamp: new Date(),
        text: data.text,
        textColor: "white",
        bgColor: "amber-7",
        sent: data.sender.userId === this.getCurrentUser.userId
      });
    });
  },
  filters: {
    fromNow: function(date) {
      return moment(date)
        .startOf("hour")
        .fromNow();
    }
  },
  watch: {
    conversationId: {
      handler() {
        // this.joinConversation()
        this.$axios
          .get(`/api/v1/chat/conversation/${this.conversationId}`)
          .then(response => {
            if (response.data.hasOwnProperty("conversation")) {
              this.chatMessenges = response.data.conversation.map(message => {
                return {
                  id: message._id,
                  name: message.author.name,
                  avatar: "https://cdn.quasar.dev/img/avatar5.jpg",
                  stamp: message.createdAt,
                  text: message.body,
                  textColor: "white",
                  bgColor: "amber-7",
                  sent: message.author._id === this.getCurrentUser.userId
                };
              });
            } else {
              this.chatMessenges = [];
            }
            console.log(response.data);
          });
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

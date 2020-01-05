<template>
  <q-layout view="lHh Lpr fFr" class="shadow-2 rounded-borders">
    <q-header>
      <q-toolbar
        size="sm"
        style="background: rgba(0, 0, 0, 0) linear-gradient(150deg, rgb(0, 188, 212), rgb(0, 150, 136), rgb(103, 58, 183)) repeat scroll 0% 0%;"
      >
        <q-btn
          flat
          rounded
          dense
          icon="menu"
          class="q-mr-sm"
          v-if="$q.screen.lt.md"
          @click="drawer = !drawer"
        />
        <q-input
          placeholder="Type to start searching ..."
          dark
          borderless
          v-model="searchText"
          class="q-ml-md"
        >
          <template v-slot:append>
            <q-icon v-if="searchText === ''" name="search" />
            <q-icon
              v-else
              name="clear"
              class="cursor-pointer"
              @click="searchText = ''"
            />
          </template>
        </q-input>
        <q-space />
        <q-chip
          size="md"
          color="tranparent"
          dark
          clickable
          @click="handleProfileDetail"
        >
          <q-avatar size="sm">
            <img :src="$axios.defaults.baseURL + getAuthUser.profileImage" />
          </q-avatar>
          {{ getAuthUser.email }}
        </q-chip>
        <q-btn
          round
          flat
          size="sm"
          icon="home"
          @click="$router.push({ name: 'feed-posts' })"
        />
        <q-btn
          flat
          round
          size="sm"
          icon="question_answer"
          @click="$router.push({ name: 'chats' })"
        />
        <q-btn dense size="sm" round flat icon="email">
          <q-badge dense size="sm" color="red" floating>
            4
          </q-badge>
        </q-btn>

        <q-btn
          size="sm"
          flat
          round
          icon="whatshot"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />
        <q-btn flat round size="sm" icon="more_vert">
          <q-menu transition-show="scale" transition-hide="scale">
            <q-list dense style="min-width: 100px">
              <q-item clickable @click="handleProfileDetail">
                <q-item-section>My Profile</q-item-section>
              </q-item>
              <q-item clickable>
                <q-item-section>My Setting</q-item-section>
              </q-item>
              <q-separator />
              <q-item clickable @click="handleLogout">
                <q-item-section>Log out</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>
    <!--  <q-drawer
      v-model="drawer"
      bordered
      content-class="bg-white"
    >
            <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
      <q-list>
        <q-item clickable v-ripple @click="$router.push({name: 'feed'})">
              <q-item-section avatar>
                <q-icon name="fas fa-bolt" />
              </q-item-section>

              <q-item-section>
                College Buzz
              </q-item-section>
            </q-item>

             <q-item clickable  :active="active" v-ripple @click="$router.push({name: 'chat-detail'})" active-class="text-orange">
              <q-item-section avatar>
                <q-icon name="fas fa-comments" />
              </q-item-section>

              <q-item-section>
                Chat
              </q-item-section>
            </q-item>
             <q-separator spaced />
<q-item-label header>Explore</q-item-label>
      <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="drafts" />
              </q-item-section>

              <q-item-section>
                Groups
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="drafts" />
              </q-item-section>

              <q-item-section>
                Events
              </q-item-section>
</q-item>
      </q-list>
            </q-scroll-area>
            <q-img class="absolute-top" src="https://cdn.quasar.dev/img/material.png" style="height: 150px">
          <div class="absolute-bottom bg-transparent">
            <q-avatar size="56px" class="q-mb-sm">
              <img :src="$axios.defaults.baseURL+getAuthUser.profileImage">
            </q-avatar>
            <div class="text-weight-bold">{{getAuthUser.email}}</div>
             <div>@rstoenescu</div>
          </div>
        </q-img>
    </q-drawer>-->
    <!-- <q-drawer
        v-model="drawer"
        :width="500"
        :breakpoint="400"
        show-if-above
      >
        <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
          <q-list padding>
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="inbox" />
              </q-item-section>

              <q-item-section>
                Inbox
              </q-item-section>
            </q-item>

            <q-item active clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="star" />
              </q-item-section>

              <q-item-section>
                Star
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="send" />
              </q-item-section>

              <q-item-section>
                Send
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="drafts" />
              </q-item-section>

              <q-item-section>
                Drafts
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>

        <q-img class="absolute-top" src="https://cdn.quasar.dev/img/material.png" style="height: 150px">
          <div class="absolute-bottom bg-transparent">
            <q-avatar size="56px" class="q-mb-sm">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png">
            </q-avatar>
            <div class="text-weight-bold">Razvan Stoenescu</div>
            <div>@rstoenescu</div>
          </div>
        </q-img>
      </q-drawer> -->
    <q-dialog
      v-model="seamless"
      seamless
      transition-show="flip-down"
      position="bottom"
      transition-hide="flip-up"
    >
      <q-card class="bg-orange text-white" style="width: 350px">
        <q-card-section style="padding: 0">
          <q-bar>
            <q-avatar>
              <img :src="`https://cdn.quasar.dev/img/avatar3.jpg`" />
            </q-avatar>
            <div>Google Chrome</div>
            <q-space />

            <q-btn dense flat icon="close" v-close-popup>
              <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
            </q-btn>
          </q-bar>
        </q-card-section>
        <q-card-section style="max-height: 30vh" class="scroll">
          <div>
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
              bg-color="primary"
            />
            <q-chat-message
              name="Jane"
              avatar="https://cdn.quasar.dev/img/avatar5.jpg"
              :text="['Did it work?']"
              stamp="1 minutes ago"
              size="8"
              text-color="white"
              bg-color="primary"
            />
          </div>
        </q-card-section>
        <q-card-section style="padding: 0">
          <q-input filled autogrow standout dense>
            <template v-slot:append>
              <q-icon name="close" class="cursor-pointer" />
            </template>
          </q-input>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-drawer
      v-model="leftDrawerOpen"
      overlay
      elevated
      behavior="mobile"
      :breakpoint="700"
      show-if-above
      content-class="bg-black text-white"
      side="right"
    >
      <q-scroll-area class="fit">
        <q-list separator dark>
          <q-item>
            <q-item-section>
              <q-item-label>Friends Online ({{onlineUsers.length}})</q-item-label>
            </q-item-section>
          </q-item>
          <!-- <q-item clickable v-for="(onlineUser, index) in onlineUsers" :key="index" @click="$router.push({ name: 'chat' })">
            <q-item-section avatar>
              <q-icon
                name="fas fa-circle"
                class="text-red"
                style="font-size: 0.7em"
              />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{onlineUser.name}}</q-item-label>
              <q-item-label caption>Offline</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-avatar>
                <img :src="`https://cdn.quasar.dev/img/avatar2.jpg`" />
              </q-avatar>
            </q-item-section>
          </q-item> -->
          <q-item clickable v-for="(onlineUser, index) in onlineUsers" :key="index" @click="$router.push({ name: 'chat' })">
            <q-item-section avatar>
              <q-icon
                name="fas fa-circle"
                class="text-green"
                style="font-size: 0.7em"
              />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{onlineUser.name}}</q-item-label>
              <q-item-label caption>Online</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-avatar>
                <img :src="`https://cdn.quasar.dev/img/avatar2.jpg`" />
              </q-avatar>
            </q-item-section>
          </q-item>
          <q-separator dark />
        </q-list>
      </q-scroll-area>
    </q-drawer>
    <q-page-container style="background-color: #e9ebee;">
      <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
import socket from '../util/socket/socket'
import jwtDecode from "jwt-decode";
export default {
  data() {
    return {
      leftDrawerOpen: true,
      seamless: false,
      active: true,
      searchText: "",
      drawer: true,
      onlineUsers: [],
      lazy: [
        {
          label: "Node 1",
          children: [
            { label: "Node 1.1", lazy: true },
            { label: "Node 1.2", lazy: true }
          ]
        },
        {
          label: "Node 2",
          lazy: true
        },
        {
          label: "Lazy load empty",
          lazy: true
        },
        {
          label: "Node is not expandable",
          expandable: false,
          children: [{ label: "Some node" }]
        }
      ]
    };
  },
  watch: {
    searchText(value){
      if(value) {
        this.$router.push({name: "search", query: { search: value }})
      } else {
        this.$router.push({name: "feed-posts"})
      }
    }
  },
  mounted() {
    if(this.$route.query.search) {
      this.searchText = this.$route.query.search
    } else {
      this.searchText = ""
    }
    socket.on("connect", () => {
      var room = 'GlobalRoom';
      var user = this.getAuthUser
      socket.emit('global room', {
        room: room,
        user: user
      })
      console.log('online')
    })
    socket.on("onlineUser", (usersOnline) => {
      this.onlineUsers = usersOnline;
    });
    socket.on("newFeed", (message) => {
      this.showNewFeedNotification(message)
    });
  },
  computed: {
    getAuthUser() {
      return this.$q.sessionStorage.getItem("authUser");
    }
  },
  methods: {
    showNewFeedNotification(message){
      this.$q.notify({
        message: `<b>${message.user.name}</b> ${message.message}.`,
        color: 'grey',
        html: true,
        position: "bottom-left",
        avatar: this.$axios.defaults.baseURL + message.user.profileImage
      })
    },
    handleProfileDetail() {
      this.$router.push({
        name: "user-profile",
        params: { id: this.getAuthUser.userId }
      });
    },
    handleLogout() {
      this.$q.sessionStorage.clear();
      this.$router.push({ name: "signin" });
    },
    onLazyLoad({ node, key, done, fail }) {
      // call fail() if any error occurs

      setTimeout(() => {
        // simulate loading and setting an empty node
        if (key.indexOf("Lazy load empty") > -1) {
          done([]);
          return;
        }

        const label = node.label;
        done([
          { label: `${label}.1` },
          { label: `${label}.2`, lazy: true },
          {
            label: `${label}.3`,
            children: [
              { label: `${label}.3.1`, lazy: true },
              { label: `${label}.3.2`, lazy: true }
            ]
          }
        ]);
      }, 1000);
    }
  }
};
</script>

<template>
  <q-page padding>
      <q-dialog v-model="createPostDialog" position="top">
      <q-card style="width: 500px">
        <q-linear-progress :value="0.6" color="pink" />

        <q-card-section class="row items-center no-wrap">
                    <q-list>
<q-item>
                  <q-item-section avatar top>
                       <q-avatar>
                <img :src="`https://cdn.quasar.dev/img/avatar3.jpg`">
              </q-avatar>
                  </q-item-section>
                  <q-item-section>
                    <q-editor
      v-model="editor"
      :toolbar="[
        ['left', 'center', 'right', 'justify'],
        ['bold', 'italic', 'underline', 'strike'],
        [{
          label: $q.lang.editor.formatting,
          icon: $q.iconSet.editor.formatting,
          list: 'no-icons',
          options: ['p', 'h3', 'h4', 'h5', 'h6', 'code']
        }],
        ['undo', 'redo']
      ]"
    />                 </q-item-section>
              </q-item>
              <q-item  dense style="padding:0 15px 10px">
                <q-item-section>
                </q-item-section>
            <q-item-section side>
                            <q-item-label>   <q-btn size="md" push color="primary" label="Share"  @click="savePost" />
                            <!-- <q-btn size="md" push color="primary" label="Update" v-else @click="updatePost" /> -->
</q-item-label>

            </q-item-section>
          </q-item>
                    </q-list>
        </q-card-section>
      </q-card>
    </q-dialog>
      <q-card
        style="margin-bottom: 10px"
      >
          <q-list bordered>
            <q-item>
                  <q-item-section avatar top>
                       <q-avatar>
                <img :src="`https://cdn.quasar.dev/img/avatar3.jpg`">
              </q-avatar>
                  </q-item-section>
                  <q-item-section>
          <q-btn outline rounded color="primary" label="" :ripple="false" @click="createPostDialog = true" no-caps />
                  </q-item-section>
                  <q-item-section side>
                    <q-btn outline round color="primary" icon="fas fa-2x fa-paperclip" />
                  </q-item-section>
            </q-item>
          </q-list>
      </q-card>
      <q-page-sticky position="bottom-right" :offset="[18, 18]" style="z-index: 9999">
                  <q-btn size="sm" fab icon="fas fa-comments" color="accent" />
                      </q-page-sticky>
    <q-infinite-scroll @load="onLoad" :offset="250" >
      <q-card
        v-for="(item, index) in items"
        :key="index"
        class="caption"
        style="margin-bottom: 10px"
        bordered
        flat
      >
        <q-list bordered>
          <q-item>
            <q-item-section avatar>
              <q-avatar>
                <img :src="`https://cdn.quasar.dev/img/${offline[0].avatar}`">
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <router-link  :to="{name: 'user-profile', params: { id: item.postedBy.id }}">
                <q-item-label v-if="item.postedBy">{{ item.postedBy.name }}</q-item-label>
              </router-link>
              <q-item-label caption lines="1">{{ item.date }}</q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-btn size="sm" color="grey-7" round flat icon="more_vert">
                <q-menu square dense transition-show="flip-right"
                          anchor="bottom right"
          self="top left"

          transition-hide="flip-left"
 auto-close>
                  <q-list>
                    <q-item :clickable="item.postedBy.id === getCurrentUser.userId" @click="handleRemovePost(item.id, index)">
                      <q-item-section>Remove Post</q-item-section>
                    </q-item>
                    <q-item :clickable="item.postedBy.id === getCurrentUser.userId" @click="handleUpdatePost(item, index)">
                      <q-item-section>Edit Post</q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-btn>
            </q-item-section>
          </q-item>
           <q-item style="padding: 5px" clickable @click="handleDetailPost(item.id)">
            <q-item-section v-html="item.content">
            </q-item-section>
           </q-item>
          <!-- <q-item style="padding: 5px 0 0">
            <q-item-section>
              <q-img src="https://cdn.quasar.dev/img/parallax2.jpg"></q-img>
            </q-item-section>
          </q-item> -->
          <q-item dense>
            <q-item-section avatar>
              <q-btn size="sm" flat round color="primary" icon="fas fa-thumbs-up">
                <q-badge color="orange" floating>{{ item.totalLike }}</q-badge>
                <q-tooltip anchor="bottom left" self="center left">Here I am!</q-tooltip>
              </q-btn>
            </q-item-section>

            <q-item-section></q-item-section>

            <q-item-section side>
              <q-btn size="sm" flat round color="secondary" icon="fas fa-comments">
                <q-badge color="orange" floating>{{ item.totalComments }}</q-badge>
                <q-tooltip anchor="bottom left" self="center left">Here I am!</q-tooltip>
              </q-btn>
            </q-item-section>
          </q-item>
                <q-separator />
          <q-item dense style="padding: 0">
            <q-item-section>
              <q-btn-group size="sm" flat spread>
                <q-btn size="sm" flat icon="fas fa-thumbs-up" color="grey-7" @click="(item.liked)? handlePostUnlike(item.id) :handlePostLike(item.id)" :text-color="(item.liked) ? 'primary' : ''"  label="Like"/>
                <q-btn size="sm" flat icon="fas fa-comments" color="grey-7"  label="Comment"/>
              </q-btn-group>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card>
      <template v-slot:loading>
        <div class="row justify-center q-my-md">
          <q-spinner-dots color="primary" size="40px" v-if="items.length < post_params.count"/>
          <q-card v-else> -- End of post -- </q-card>
        </div>
      </template>
    </q-infinite-scroll>
  </q-page>
</template>
<script>
import jwtDecode from 'jwt-decode'

const offline = [
  {
    id: 5,
    name: 'Brunhilde Panswick',
    email: 'bpanswick4@csmonitor.com',
    avatar: 'avatar2.jpg'
  }
]
export default {
  data () {
    return {
      post_params: {
        page: 1,
        count: 1,
        size: 5
      },
      items: [],
      offline,
      drawerLeft: true,
      createPostDialog: false,
      editor: ''
    }
  },
  computed: {
    getCurrentUser () {
      return jwtDecode(this.$q.sessionStorage.getItem('token'))
    }
  },
  created () {
  },
  methods: {
    handleDetailPost (postId) {
      this.$router.push({ name: 'feed-detail', params: { id: postId } })
    },
    handleUpdatePost (post, postIndex) {
      this.createPostDialog = true
      this.editor = post.content
    },
    handleRemovePost (postId, postIndex) {
      this.$axios.delete(`/api/v1/post/${postId}`)
        .then(response => {
          this.items.splice(postIndex, 1)
          this.post_params.count = this.post_params.count - 1
          this.$q.notify({
            message: 'Post Deleted',
            color: 'green'
          })
        })
    },
    savePost () {
      this.$q.loading.show()
      this.$axios.post('/api/v1/createPost', { content: this.editor })
        .then(response => {
          console.log(response.data)
          this.$q.loading.hide()
          this.createPostDialog = false
          this.items.unshift({
            id: response.data.post._id,
            content: response.data.post.content,
            postedBy: { name: 'sagar', id: response.data.post.postedBy },
            date: response.data.post.updatedAt
          })
          this.editor = ''
        })
    },
    updatePost () {
      // this.$q.loading.show()
      // this.$axios.post('/api/v1/createPost', { content: this.editor })
      //   .then(response => {
      //     console.log(response.data)
      //     this.$q.loading.hide()
      //     this.createPostDialog = false
      //     this.items.unshift({
      //       id: response.data.post._id,
      //       content: response.data.post.content,
      //       postedBy: { name: 'sagar', id: response.data.post.postedBy },
      //       date: response.data.post.updatedAt
      //     })
      //     this.editor = ''
      //   })
    },
    handlePostLike (postId) {
      this.$axios.put(`/api/v1/like/${postId}`)
        .then(response => {
          const index = this.items.findIndex(item => item.id === response.data.post._id)
          this.items[index]['liked'] = true
          this.items[index]['totalLike'] = response.data.post.totalLike
        })
    },
    handlePostUnlike (postId) {
      this.$axios.put(`/api/v1/unlike/${postId}`)
        .then(response => {
          const index = this.items.findIndex(item => item.id === response.data.post._id)
          this.items[index]['liked'] = false
          this.items[index]['totalLike'] = response.data.post.totalLike
        })
    },
    onLoad (index, done) {
      console.log(this.items.length, this.post_params.count)
      if (this.items.length < this.post_params.count) {
        this.post_params.page = index
        this.$axios.get('/api/v1/getPosts', { params: this.post_params })
          .then(response => {
            this.post_params.count = response.data.totalPosts
            var temp = response.data.posts.map(post => {
              return {
                id: post._id,
                content: post.content,
                postedBy: {
                  id: post.postedBy._id,
                  name: post.postedBy.name
                },
                date: post.updatedAt,
                liked: post.liked,
                totalComments: post.totalComments,
                totalLike: post.totalLike
              }
            })
            this.items.push(...temp)
            done()
          })
      }
    }
  }
}
</script>

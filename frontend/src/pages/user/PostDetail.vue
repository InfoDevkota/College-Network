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
                  <img :src="`https://cdn.quasar.dev/img/avatar3.jpg`" />
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
                />
              </q-item-section>
            </q-item>
            <q-item dense style="padding:0 15px 10px">
              <q-item-section></q-item-section>
              <q-item-section side>
                <q-item-label>
                  <q-btn size="md" push color="primary" label="Share" @click="savePost" />
                  <!-- <q-btn size="md" push color="primary" label="Update" v-else @click="updatePost" /> -->
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-card class="caption" style="margin-bottom: 10px" bordered flat>
      <q-list bordered>
        <q-item>
          <q-item-section avatar>
            <q-avatar>
                <img v-if="post.postedBy" :src="$axios.defaults.baseURL+post.postedBy.profileImage">
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label v-if="post.postedBy">{{ post.postedBy.name }}</q-item-label>
            <q-item-label caption lines="1">{{ post.date | fromNow }}</q-item-label>
          </q-item-section>

          <q-item-section side>
            <q-btn size="sm" color="grey-7" round flat icon="more_vert">
              <q-menu
                square
                dense
                transition-show="flip-right"
                anchor="bottom right"
                self="top left"
                transition-hide="flip-left"
                auto-close
              >
                <q-list>
                  <q-item
                    :clickable="post.postedBy.id === getAuthUser.userId"
                    @click="handleRemovePost(post.id, index)"
                  >
                    <q-item-section>Remove Post</q-item-section>
                  </q-item>
                  <q-item
                    :clickable="post.postedBy.id === getAuthUser.userId"
                    @click="handleUpdatePost(post, index)"
                  >
                    <q-item-section>Edit Post</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </q-item-section>
        </q-item>
        <q-item style="padding: 5px">
          <q-item-section v-html="post.content"></q-item-section>
        </q-item>
        <!-- <q-item style="padding: 5px 0 0">
            <q-item-section>
              <q-img src="https://cdn.quasar.dev/img/parallax2.jpg"></q-img>
            </q-item-section>
        </q-item>-->
        <q-item dense>
          <q-item-section avatar>
            <q-btn size="sm" flat round color="primary" icon="fas fa-thumbs-up">
              <q-badge color="orange" floating>{{ post.totalLike }}</q-badge>
              <q-tooltip anchor="bottom left" self="center left">Here I am!</q-tooltip>
            </q-btn>
          </q-item-section>

          <q-item-section></q-item-section>

          <q-item-section side>
            <q-btn size="sm" flat round color="secondary" icon="fas fa-comments">
              <q-badge color="orange" floating>{{ post.totalComments }}</q-badge>
              <q-tooltip anchor="bottom left" self="center left">Here I am!</q-tooltip>
            </q-btn>
          </q-item-section>
        </q-item>
        <q-separator />
        <q-item dense style="padding: 0">
          <q-item-section>
            <q-btn-group size="sm" flat spread>
              <q-btn
                size="sm"
                flat
                icon="fas fa-thumbs-up"
                color="grey-7"
                @click="(post.liked)? handlePostUnlike(post.id) :handlePostLike(post.id)"
                :text-color="(post.liked) ? 'primary' : ''"
                label="Like"
              />
              <q-btn size="sm" flat icon="fas fa-comments" color="grey-7" label="Comment" />
            </q-btn-group>
          </q-item-section>
        </q-item>
        <q-separator />
        <q-item>
          <q-item-section avatar>
            <q-avatar>
              <img :src="$axios.defaults.baseURL + getAuthUser.profileImage" />
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-input v-model="comment" rounded autogrow standout dense required></q-input>
          </q-item-section>
           <q-item-section side>
            <q-btn size="xs" round color="primary" @click="postComment" icon="fas fa-paper-plane" />
          </q-item-section>
        </q-item>
      </q-list>
      <q-list v-for="(comment) in post.comments" :key="comment._id">
        <q-item>
          <q-item-section avatar>
            <q-avatar>
              <img v-if="comment.commentBy" :src="$axios.defaults.baseURL+comment.commentBy.profileImage">
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label v-if="post.postedBy">{{ comment.commentBy.name }}</q-item-label>
            <q-item-label caption lines="1">{{ comment.comment }}</q-item-label>
            <q-item-label caption lines="1">{{ comment.updatedAt | fromNow }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card>
  </q-page>
</template>
<script>
import jwtDecode from 'jwt-decode'
import moment from "moment";

const offline = [
  {
    id: 5,
    name: 'Brunhilde Panswick',
    email: 'bpanswick4@csmonitor.com',
    avatar: 'avatar2.jpg'
  }
]
export default {
  props: ['id'],
  data () {
    return {
      post: {
        comments: []
      },
      post_params: {
        page: 1,
        count: 1,
        size: 5
      },
      comment: '',
      items: [],
      offline,
      drawerLeft: true,
      createPostDialog: false,
      editor: ''
    }
  },
  computed: {
    getAuthUser() {
      return this.$q.sessionStorage.getItem("authUser");
    },
  },
  filters: {
    fromNow: function(date) {
      return moment(date)
        .fromNow();
    }
  },
  created () {},
  mounted () {
    this.getPostDetail(this.id)
  },
  methods: {
    postComment () {
      this.$q.loading.show()
      this.$axios
        .post(`/api/v1/post/${this.id}/comment/`, { comment: this.comment })
        .then(response => {
          this.$q.loading.hide()
          this.post.comments = response.data.post.comments
        })
      this.comment = ''
    },
    getPostDetail (postId) {
      this.$axios.get(`/api/v1/post/${postId}`).then(response => {
        this.post = {
          id: response.data.post._id,
          content: response.data.post.content,
          postedBy: {
            id: response.data.post.postedBy._id,
            name: response.data.post.postedBy.name,
            profileImage: response.data.post.postedBy.profileImage
          },
          date: response.data.post.createdAt,
          liked: response.data.post.liked,
          totalComments: response.data.post.totalComments,
          totalLike: response.data.post.totalLike,
          comments: response.data.post.comments
        }
      })
    },
    handleDetailPost (postId) {
      this.$router.push({ id: postId, name: 'feed-detail' })
    },
    handleUpdatePost (post, postIndex) {
      this.createPostDialog = true
      this.editor = post.content
    },
    handleRemovePost (postId, postIndex) {
      this.$axios.delete(`/api/v1/post/${postId}`).then(response => {
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
      this.$axios
        .post('/api/v1/createPost', { content: this.editor })
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
      this.$axios.put(`/api/v1/like/${postId}`).then(response => {
        // const index = this.items.findIndex(
        //   item => item.id === response.data.post._id
        // )
        this.post['liked'] = true
        this.post['totalLike'] = response.data.post.totalLike
        // this.items[index]['liked'] = true
        // this.items[index]['totalLike'] = response.data.post.totalLike
      })
    },
    handlePostUnlike (postId) {
      this.$axios.put(`/api/v1/unlike/${postId}`).then(response => {
        // const index = this.items.findIndex(
        //   item => item.id === response.data.post._id
        // )
        this.post['liked'] = false
        this.post['totalLike'] = response.data.post.totalLike

        // this.items[index]['liked'] = false
        // this.items[index]['totalLike'] = response.data.post.totalLike
      })
    },
    onLoad (index, done) {
      console.log(this.items.length, this.post_params.count)
      if (this.items.length < this.post_params.count) {
        this.post_params.page = index
        this.$axios
          .get('/api/v1/getPosts', { params: this.post_params })
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

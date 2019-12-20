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
                  <img
                    :src="$axios.defaults.baseURL + getCurrentUser.profileImage"
                  />
                </q-avatar>
              </q-item-section>
              <q-item-section>
                <q-editor
                  v-model="editor"
                  :toolbar="[
                    ['left', 'center', 'right', 'justify'],
                    ['bold', 'italic', 'underline', 'strike'],
                    [
                      {
                        label: $q.lang.editor.formatting,
                        icon: $q.iconSet.editor.formatting,
                        list: 'no-icons',
                        options: ['p', 'h3', 'h4', 'h5', 'h6', 'code']
                      }
                    ],
                    ['undo', 'redo']
                  ]"
                />
                <q-uploader
                  ref="upload"
                  field-name="image"
                  :factory="factoryFn"
                  hide-upload-btn
                  no-thumbnails
                  style="max-width: 100%"
                />
              </q-item-section>
            </q-item>
            <q-item dense style="padding:0 15px 10px">
              <q-item-section>
                <q-card-section> </q-card-section>
              </q-item-section>
              <q-item-section side>
                <q-item-label>
                  <q-btn
                    size="md"
                    push
                    color="primary"
                    v-if="isEdit"
                    label="Update"
                    @click="updatePost"
                  />
                  <q-btn
                    size="md"
                    push
                    color="primary"
                    v-else
                    label="Share"
                    @click="savePost"
                  />
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </q-dialog>
    <!-- <q-card style="margin-bottom: 10px">
      <q-list bordered>
        <q-item>
          <q-item-section avatar top>
            <q-avatar>
              <img
                :src="$axios.defaults.baseURL + getCurrentUser.profileImage"
              />
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-btn
              outline
              rounded
              color="primary"
              label=""
              :ripple="false"
              @click="createPostDialog = true"
              no-caps
            />
          </q-item-section>
          <q-item-section side>
            <q-btn
              outline
              round
              color="primary"
              icon="fas fa-2x fa-paperclip"
            />
          </q-item-section>
        </q-item>
      </q-list>
    </q-card> -->
    <q-page-sticky
      position="bottom-right"
      :offset="[18, 18]"
      style="z-index: 9999"
    >
      <q-btn size="sm" fab icon="fas fa-comments" color="accent" />
    </q-page-sticky>
    <div class="row justify-center">
      <div class="col-12 col-md-6">
        <q-infinite-scroll @load="onLoad" :offset="250">
          <q-btn color="primary" rounded icon="post_add" label="New Post" class="q-mb-sm" @click="$router.push({ name: 'feed-create' })" />
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
                    <img

                      :src="
                        $axios.defaults.baseURL + item.postedBy.profileImage
                      "
                    />
                  </q-avatar>
                </q-item-section>

                <q-item-section>
                  <router-link
                    tag="span"
                    class="cursor-pointer"
                    :to="{
                      name: 'user-profile',
                      params: { id: item.postedBy.id }
                    }"
                  >
                    <q-item-label class="text-subtitle2" v-if="item.postedBy">{{
                      item.postedBy.name
                    }}</q-item-label>
                  </router-link>
                  <q-item-label caption lines="1">{{
                    item.date | fromNow
                  }}</q-item-label>
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
                      <q-list dense>
                        <q-item
                          :clickable="
                            item.postedBy.id === getCurrentUser.userId
                          "
                          @click="handleRemovePost(item.id, index)"
                        >
                          <q-item-section>Remove Post</q-item-section>
                        </q-item>
                        <q-item
                          :clickable="
                            item.postedBy.id === getCurrentUser.userId
                          "
                          @click="handleUpdatePost(item, index)"
                        >
                          <q-item-section>Edit Post</q-item-section>
                        </q-item>
                      </q-list>
                    </q-menu>
                  </q-btn>
                </q-item-section>
              </q-item>
              <q-item
                style="padding: 5px"
                clickable
                @click="handleDetailPost(item.id)"
              >
                <q-item-section v-html="item.content"> </q-item-section>
              </q-item>
                <div class="q-gutter-sm row items-start">
                  <q-img
                    v-for="(file, index) in item.files"
                    :key="index"
                    :src="file"
                    spinner-color="red"
                    style="height: 140px; max-width: 150px;object-fit: cover;"
                  />
                </div>
              <q-item dense>
                <q-item-section avatar>
                  <q-btn
                    size="sm"
                    flat
                    round
                    color="primary"
                    icon="fas fa-thumbs-up"
                  >
                    <q-badge color="orange" floating>{{
                      item.totalLike
                    }}</q-badge>
                    <q-tooltip anchor="bottom left" self="center left"
                      >Here I am!</q-tooltip
                    >
                  </q-btn>
                </q-item-section>

                <q-item-section></q-item-section>

                <q-item-section side>
                  <q-btn
                    size="sm"
                    flat
                    round
                    color="secondary"
                    icon="fas fa-comments"
                  >
                    <q-badge color="orange" floating>{{
                      item.totalComments
                    }}</q-badge>
                    <q-tooltip anchor="bottom left" self="center left"
                      >Here I am!</q-tooltip
                    >
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
                      @click="
                        item.liked
                          ? handlePostUnlike(item.id)
                          : handlePostLike(item.id)
                      "
                      :text-color="item.liked ? 'primary' : ''"
                      label="Like"
                    />
                    <q-btn
                      size="sm"
                      flat
                      icon="fas fa-comments"
                      color="grey-7"
                      label="Comment"
                    />
                  </q-btn-group>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card>
          <template v-slot:loading>
            <div class="row justify-center q-my-md">
              <q-spinner-dots
                color="primary"
                size="40px"
                v-if="items.length < post_params.count"
              />
              <q-card v-else> -- End of post -- </q-card>
            </div>
          </template>
        </q-infinite-scroll>
      </div>
    </div>
  </q-page>
</template>
<script>
import jwtDecode from "jwt-decode";
import moment from "moment";

const offline = [
  {
    id: 5,
    name: "Brunhilde Panswick",
    email: "bpanswick4@csmonitor.com",
    avatar: "avatar2.jpg"
  }
];
export default {
  data() {
    return {
      image: "",
      post_params: {
        page: 1,
        count: 1,
        size: 5
      },
      definitions: {
        save: {
          tip: "Save your work",
          icon: "save",
          label: "Save",
          handler: this.insertImg
        },
        // bold: { label: 'Bold', icon: null, tip: 'My bold tooltip' },
        insert_img: {
          label: "image",
          icon: "photo",
          handler: this.insertImg // handler will call insertImg() method
        }
      },
      items: [],
      offline,
      drawerLeft: true,
      createPostDialog: false,
      editor: "",
      isEdit: false,
      currentPostId: ""
    };
  },
  filters: {
    fromNow: function(date) {
      return moment(date)
        .startOf("hour")
        .fromNow();
    }
  },
  computed: {
    getCurrentUser() {
      return jwtDecode(this.$q.sessionStorage.getItem("token"));
    }
  },
  created() {},
  methods: {
    insertImg() {
      // insertImg method
      const post = this.post;
      // create an input file element to open file dialog
      const input = document.createElement("input");
      input.type = "file";
      input.accept = ".png, .jpg"; // file extensions allowed
      let file;
      input.onchange = _ => {
        const files = Array.from(input.files);
        file = files[0];

        // lets load the file as dataUrl
        const reader = new FileReader();
        let dataUrl = "";
        reader.onloadend = function() {
          dataUrl = reader.result;
          // append result to the body of your post
          post.body += '<div><img src="' + dataUrl + '" /></div>';
        };
        reader.readAsDataURL(file);
      };
      input.click();
    },
    saveWork() {
      this.$q.notify({
        message: "Saved your text to local storage",
        color: "green-4",
        textColor: "white",
        icon: "fas fa-check-circle"
      });
    },
    uploadIt() {
      this.$q.notify({
        message: "Server unavailable. Check connectivity",
        color: "red-5",
        textColor: "white",
        icon: "fas fa-exclamation-triangle"
      });
    },
    factoryFn(files) {
      let fd = new FormData();
      fd.append("image", files[0]);
      fd.append("content", this.editor);
      this.$axios.post("/api/v1/createPost", fd).then(response => {
        console.log(response.data);
        this.$q.loading.hide();
        this.createPostDialog = false;
        this.items.unshift({
          id: response.data.post._id,
          content: response.data.post.content,
          files: this.$axios.defaults
                .baseURL + response.data.post.imageUrl,
          postedBy: { name: "sagar", id: response.data.post.postedBy },
          date: response.data.post.updatedAt
        });
        this.$refs["upload"].reset();
        this.editor = "";
      });
    },
    handleDetailPost(postId) {
      this.$router.push({ name: "feed-detail", params: { id: postId } });
    },
    handleUpdatePost(post, postIndex) {
      this.currentPostId = post.id;
      this.isEdit = true;
      this.createPostDialog = true;
      this.editor = post.content;
    },
    handleRemovePost(postId, postIndex) {
      this.$axios.delete(`/api/v1/post/${postId}`).then(response => {
        this.items.splice(postIndex, 1);
        this.post_params.count = this.post_params.count - 1;
        this.$q.notify({
          message: "Post Deleted",
          color: "green"
        });
      });
    },
    savePost() {
      // this.$q.loading.show()
      console.log(this.$refs);
      this.$refs["upload"].upload();
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
    updatePost() {
      this.$q.loading.show();
      console.log(this.$refs);
      this.$refs["upload"].upload();
      // this.$axios.put(`/api/v1/post/${this.currentPostId}`, { content: this.editor })
      //   .then(response => {
      //     console.log(response.data)
      //     this.$q.loading.hide()
      //     this.createPostDialog = false
      //     this.items.unshift({
      //       id: response.data.post._id,
      //       // liked: post.liked,
      //       totalComments: response.data.post.totalComments,
      //       totalLike: response.data.post.totalLike,
      //       content: response.data.post.content,
      //       postedBy: { name: 'sagar', id: response.data.post.postedBy },
      //       date: response.data.post.updatedAt
      //     })
      //     this.editor = ''
      //   })
      this.isEdit = false;
    },
    handlePostLike(postId) {
      this.$axios.put(`/api/v1/like/${postId}`).then(response => {
        const index = this.items.findIndex(
          item => item.id === response.data.post._id
        );
        this.items[index]["liked"] = true;
        this.items[index]["totalLike"] = response.data.post.totalLike;
      });
    },
    handlePostUnlike(postId) {
      this.$axios.put(`/api/v1/unlike/${postId}`).then(response => {
        const index = this.items.findIndex(
          item => item.id === response.data.post._id
        );
        this.items[index]["liked"] = false;
        this.items[index]["totalLike"] = response.data.post.totalLike;
      });
    },
    onLoad(index, done) {
      console.log(this.items.length, this.post_params.count);
      if (this.items.length < this.post_params.count) {
        this.post_params.page = index;
        this.$axios
          .get("/api/v1/getPosts", { params: this.post_params })
          .then(response => {
            this.post_params.count = response.data.totalPosts;
            var temp = response.data.posts.map(post => {
              return {
                id: post._id,
                content: post.content,
                files: post.imageUrl.map(file => this.$axios.defaults.baseURL +file ),
                postedBy: {
                  id: post.postedBy._id,
                  name: post.postedBy.name,
                  profileImage: post.postedBy.profileImage
                },
                date: post.updatedAt,
                liked: post.liked,
                totalComments: post.totalComments,
                totalLike: post.totalLike
              };
            });
            this.items.push(...temp);
            done();
          });
      }
    }
  }
};
</script>

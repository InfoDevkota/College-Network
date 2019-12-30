<template>
  <q-page padding>
    <div class="row justify-center">
      <div class="col-12 col-md-6">
        <h6 class="q-my-sm">Posts</h6>
        <q-card
          v-for="(item, index) in posts"
          :key="index"
          class="caption"
          style="margin-bottom: 10px"
          bordered
          flat
        >
          <q-list>
            <q-item>
              <q-item-section avatar>
                <q-avatar>
                  <img
                    :src="$axios.defaults.baseURL + item.postedBy.profileImage"
                  />
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <router-link
                  tag="span"
                  class="cursor-pointer"
                  :to="{
                    name: 'user-profile',
                    params: { id: item.postedBy._id }
                  }"
                >
                  <q-item-label class="text-subtitle2">
                    {{ item.postedBy.name }}
                  </q-item-label>
                </router-link>
                <q-item-label caption lines="1">
                  date
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
          <q-card-section v-html="item.content"> </q-card-section>
          <q-card-section>
            <q-img
              transition="fade"
              :src="$axios.defaults.baseURL + item.images"
              style="width: 50px"
              ratio="1"
              spinner-color="white"
              class="rounded-borders"
            >
              <template v-slot:error>
                <div
                  class="absolute-full flex flex-center bg-negative text-white"
                >
                  N/A
                </div>
              </template>
            </q-img>
          </q-card-section>
        </q-card>
        <q-banner v-show="!posts.length" dense class="bg-grey-3">
          <template v-slot:avatar>
            <q-icon name="post_add" color="primary" />
          </template>
          <i>no posts found.</i>
        </q-banner>
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-12 col-md-6">
        <h6 class="q-my-sm">Users</h6>
        <q-card
          v-for="(item, index) in users"
          :key="index"
          class="caption"
          style="margin-bottom: 10px"
          bordered
          flat
        >
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-avatar>
                <img :src="$axios.defaults.baseURL + item.profileImage" />
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label>
                {{ item.name }}
                <q-chip
                  v-if="item.isTeacher"
                  size="sm"
                  class="glossy"
                  color="orange"
                  text-color="white"
                  icon-right="star"
                >
                  Teacher
                </q-chip>
                <q-chip
                  v-if="item.isHod"
                  size="sm"
                  class="glossy"
                  color="orange"
                  text-color="white"
                  icon-right="star"
                >
                  HOD
                </q-chip>
                <q-chip
                  v-if="item.isStudent"
                  size="sm"
                  class="glossy"
                  color="orange"
                  text-color="white"
                  icon-right="star"
                >
                  Student
                </q-chip>
              </q-item-label>
              <q-item-label caption lines="1">{{ item.email }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-card>
        <q-banner v-show="!users.length" dense class="bg-grey-3">
          <template v-slot:avatar>
            <q-icon name="person_pin" color="primary" />
          </template>
          <i>no users found.</i>
        </q-banner>
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-12 col-md-6">
        <h6 class="q-my-sm">Notes</h6>
        <q-card
          v-for="(item, index) in notes"
          :key="index"
          class="caption"
          style="margin-bottom: 10px"
          bordered
          flat
        >
          <q-card-section>
            <q-list>
              <q-item>
                <q-item-section avatar>
                  <q-avatar>
                    <img
                      :src="
                        $axios.defaults.baseURL + item.uploadedBy.profileImage
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
                      params: { id: item.uploadedBy._id }
                    }"
                  >
                    <q-item-label class="text-subtitle2">
                      {{ item.uploadedBy.name }}
                    </q-item-label>
                  </router-link>
                  <q-item-label caption lines="1">
                    date
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
            <q-list bordered>
              {{ item.title }}
              <q-item-label header>Files</q-item-label>

              <q-item
                border
                clickable
                @click="handleDownloadNote(file)"
                v-for="(file, index) in item.files"
                :key="index"
              >
                <q-item-section avatar>
                  <q-avatar
                    icon="cloud_download"
                    color="primary"
                    text-color="white"
                  />
                </q-item-section>

                <q-item-section>
                  <q-item-label lines="1">{{
                    file.substring(file.lastIndexOf("/") + 1)
                  }}</q-item-label>
                  <q-item-label caption>date</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
        <q-banner v-show="!notes.length" dense class="bg-grey-3">
          <template v-slot:avatar>
            <q-icon name="note" color="primary" />
          </template>
          <i>no notes found.</i>
        </q-banner>
      </div>
    </div>
  </q-page>
</template>
<script>
import jwtDecode from "jwt-decode";
export default {
  name: "search",
  data() {
    return {
      posts: [],
      users: [],
      notes: []
    };
  },
  watch: {
    '$route.query.search': {
      immediate: true,
      handler(value) {
        if (value) {
          this.getSearchNotesAndPosts();
        }
      }
    }
  },
  methods: {
    handleDownloadNote(file) {
      //   var blob = new Blob([data], {type: 'text/csv'});
      // if(window.navigator.msSaveOrOpenBlob) {
      //     window.navigator.msSaveBlob(blob, filename);
      // }
      // else{
      //     var elem = window.document.createElement('a');
      //     elem.href = window.URL.createObjectURL(blob);
      //     elem.download = filename;
      //     document.body.appendChild(elem);
      //     elem.click();
      //     document.body.removeChild(elem);
      // }
      // const blob = new Blob([file])
      const link = document.createElement("a");
      // link.href = URL.createObjectURL(blob)
      link.href = file;
      link.setAttribute("target", "_blank");
      link.setAttribute("download", file.substring(file.lastIndexOf("/") + 1));
      link.click();
      URL.revokeObjectURL(link.href);
    },
    getSearchNotesAndPosts() {
      this.$axios
        .get("/api/v1/search", { params: { term: this.$route.query.search } })
        .then(response => {
          this.notes = response.data.results.notes.map(note => ({
            files: note.files,
            id: note._id,
            title: note.title,
            uploadedBy: note.uploadedby
          }));
          this.users = response.data.results.users.map(user => ({
            name: user.name,
            email: user.email,
            profileImage: user.profileImage,
            id: user._id,
            isHod: user.ishod,
            isTeacher: user.isTeacher,
            isStudent: user.isStudent
          }));
          this.posts = response.data.results.posts.map(post => ({
            id: post.id,
            content: post.content,
            updatedAt: post.updatedAt,
            images: post.imageUrl,
            likes: post.totalLike,
            comment: post.totalComments,
            postedBy: post.postedBy
          }));
        })
        .catch(error => {
          console.log(error.message);
        });
    }
  }
};
</script>

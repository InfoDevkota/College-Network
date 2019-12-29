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
          <q-card-section v-html="item.content">
          </q-card-section>
          <q-card-section>
            <q-img
              transition="fade"
              :src="$axios.defaults.baseURL+item.images"
              style="width: 50px"
              ratio="1"
              spinner-color="white"
              class="rounded-borders"
            >
            <template v-slot:error>
              <div class="absolute-full flex flex-center bg-negative text-white">
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
                    <img :src="$axios.defaults.baseURL+item.profileImage">
                </q-avatar>
                </q-item-section>
                <q-item-section>
                    <q-item-label>
                        {{ item.name }} 
                        <q-chip v-if="item.isTeacher" size="sm" class="glossy" color="orange" text-color="white" icon-right="star">
                            Teacher
                        </q-chip>
                        <q-chip v-if="item.isHod" size="sm" class="glossy" color="orange" text-color="white" icon-right="star">
                            HOD
                        </q-chip>
                        <q-chip v-if="item.isStudent" size="sm" class="glossy" color="orange" text-color="white" icon-right="star">
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
          {{ item.name }}
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
import jwtDecode from 'jwt-decode'
export default {
  name: "search",
  props: ["query"],
  data() {
    return {
      posts: [],
      users: [],
      notes: []
    };
  },
  watch: {
    query(value) {
      if (value) {
        this.getSearchNotesAndPosts();
      }
    }
  },
  methods: {
    getSearchNotesAndPosts() {
      this.$axios
        .get("/api/v1/search", { params: { term: this.query } })
        .then(response => {
          this.notes = response.data.results.notes;
          this.users = response.data.results.users.map(user => ({
            name: user.name,
            email: user.email,
            profileImage: user.profileImage,
            id: user._id,
            isHod: user.ishod ,
            isTeacher: user.isTeacher,
            isStudent: user.isStudent
          }));
          this.posts = response.data.results.posts.map(post => ({
            id: post.id,
            content: post.content,
            updatedAt: post.updatedAt,
            images: post.imageUrl,
            likes: post.totalLike,
            comment: post.totalComments
          }));
        })
        .catch(error => {
          console.log(error.message);
        });
    }
  }
};
</script>

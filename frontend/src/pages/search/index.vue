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
          {{ item.content }}
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
          {{ item.name }}
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
export default {
  name: "search",
  props: ["query"],
  data() {
    return {
      posts: [],
      users: []
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
            images: user.profileImage,
            id: user._id
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

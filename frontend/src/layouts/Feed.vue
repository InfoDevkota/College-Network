<template>
  <q-page padding>
    <div class="row q-col-gutter-x-md justify-center">
      <div class="col-12 col-md-3">
        <q-card class="shadow-0">
          <q-card-section>
            <q-list padding class="rounded-borders text-black">
              <q-item
                clickable
                v-ripple
                :active="$route.name === 'feed-posts' || $route.name ==='feed-notes'"
                :to="{ name: 'feed-posts' }"
                active-class="my-menu-link"
              >
                <q-item-section avatar>
                  <q-icon name="home" />
                </q-item-section>

                <q-item-section>Home</q-item-section>
              </q-item>

              <q-item
                clickable
                v-ripple
                :active="$route.name === 'chat-message-detail'"
                :to="{ name: 'chat-message-detail' }"
                active-class="my-menu-link"
              >
                <q-item-section avatar>
                  <q-icon name="chat" />
                </q-item-section>

                <q-item-section>Chats</q-item-section>
              </q-item>
              <q-separator spaced />
              <q-item-label header>ALL Departments ({{departments.length}})</q-item-label>
              <q-item
                v-for="(department, index) in departments"
                :key="index"
                clickable
                v-ripple
                :active="link === 'settings'"
                :to="{
                  name: 'department-detail',
                  params: { department_id: department.id }
                }"
                active-class="my-menu-link"
              >
                <q-item-section>{{ department.name }}</q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-12 col-md-6">
        <q-tabs
          dense
          align="left"
          inline-label
          class="text-white shadow-1"
          style="background: rgba(0, 0, 0, 0) linear-gradient(50deg, rgb(0, 188, 212), rgb(0, 150, 136), rgb(103, 58, 183)) repeat scroll 0% 0%;"
          shrink
          stretch
        >
          <q-route-tab
            icon="post_add"
            :to="{ name: 'feed-posts' }"
            label="Posts"
            exact
          />
          <q-route-tab
            icon="note"
            label="Notes"
            :to="{ name: 'feed-notes' }"
            exact
          />
        </q-tabs>
        <q-separator />
        <router-view></router-view>
      </div>
      <div class="col-12 col-md-3">
      </div>
    </div>
  </q-page>
</template>
<script>
export default {
  data() {
    return {
      departments: []
    };
  },
  mounted() {
    this.getAllDepartments();
  },
  methods: {
    async getAllDepartments() {
      try {
        const { data } = await this.$axios.get("/api/v1/departments");
        if (data && data.hasOwnProperty("departments")) {
          this.departments = data.departments.map(department => ({
            id: department._id,
            name: department.name
          }));
        }
      } catch (error) {
      } finally {
      }
    }
  }
};
</script>

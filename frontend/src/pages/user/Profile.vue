<template>
  <q-page padding>
    <div class="row q-col-gutter-md" v-if="userDetail.user">
      <div class="col-xs-12 col-md-9">
        <q-card>
          <q-tabs
            v-model="tab"
            class="text-grey"
            active-color="primary"
            indicator-color="primary"
            align="left"
            narrow-indicator
          >
            <q-tab name="Posts" label="Posts">
              <q-badge color="red" floating>{{
                userDetail.user.posts.length
              }}</q-badge>
            </q-tab>
            <q-tab name="Comments" label="Comments">
              <q-badge color="red" floating>{{
                userDetail.user.comments.length
              }}</q-badge>
            </q-tab>
          </q-tabs>

          <q-separator />

          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="Posts">
              <div class="text-h6">Posts</div>
              <q-list bordered separator>
                <q-item
                  v-for="post in userDetail.user.posts"
                  :key="post._id"
                  clickable
                  v-ripple
                  @click="handleGotoPost(post._id)"
                >
                  <q-item-section>
                    <q-item-label v-html="post.content"></q-item-label>
                    <q-item-label caption>{{ post.date | fromNow }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-tab-panel>

            <q-tab-panel name="Comments">
              <div class="text-h6">Comments</div>
              <q-list bordered separator>
                <q-item
                  v-for="comment in userDetail.user.comments"
                  :key="comment._id"
                  clickable
                  v-ripple
                  @click="handleGotoPost(comment.commentOn)"
                >
                  <q-item-section>
                    <q-item-label>{{ comment.comment }}</q-item-label>
                    <q-item-label caption>{{ comment.createdAt | fromNow }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
      </div>
      <div class="col-xs-12 col-md-3">
        <q-card class="q-mb-md">
          <q-list dense class="rounded-borders">
            <q-item class="q-pa-none">
              <q-item-section class="text-weight-light items-center">
                <q-avatar size="110px">
                  <img
                    v-if="userDetail.user.profileImage"
                    :src="
                      $axios.defaults.baseURL + userDetail.user.profileImage
                    "
                  />
                  <q-icon v-else name="fas fa-image" />
                </q-avatar>
              </q-item-section>
            </q-item>
            <q-item class="q-pa-none">
              <q-item-section class="text-weight-bold">
                {{ userDetail.user.name }}
              </q-item-section>
            </q-item>
            <q-item class="q-pa-none">
              <q-item-section class="text-weight-bold">
                {{ userDetail.user.email }}
              </q-item-section>
            </q-item>
            <q-item
              v-if="
                userDetail.user.isTeacher ||
                  userDetail.user.ishod ||
                  userDetail.user.isStudent
              "
            >
              <q-chip
                v-if="userDetail.user && userDetail.user.isTeacher"
                size="sm"
                class="glossy q-mx-none"
                color="orange"
                text-color="white"
                icon-right="star"
              >
                Teacher
              </q-chip>
              <q-chip
                v-if="userDetail.user && userDetail.user.ishod"
                size="sm"
                class="glossy q-mx-none"
                color="orange"
                text-color="white"
                icon-right="star"
              >
                HOD
              </q-chip>
              <q-chip
                v-if="userDetail.user && userDetail.user.isStudent"
                size="sm"
                class="glossy q-mx-none"
                color="orange"
                text-color="white"
                icon-right="star"
              >
                Student
              </q-chip>
            </q-item>
            <q-item
              class="q-pa-none"
              :style="{ padding: '5px' }"
              v-if="id === getAuthUser.userId"
            >
              <q-btn
                outline
                color="primary"
                icon="edit"
                size="sm"
                class="full-width q-mt-sm"
                label="Edit Profile"
                @click="handleUpdateUserProfile"
              />
            </q-item>
          </q-list>
        </q-card>
        <q-card class="q-mb-md">
          <q-toolbar class="bg-primary text-white shadow-2">
            <q-toolbar-title class="text-weight-light"
              >Current Affiliation</q-toolbar-title
            >
          </q-toolbar>
          <q-list dense class="rounded-borders">
            <q-item v-if="userDetail.user.isStudent">
              <q-item-section class="text-weight-light">
                College {{ userDetail.user.college }}
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section class="text-weight-light">
                Department
                <router-link
                  v-if="userDetail.user.department"
                  :to="{
                    name: 'department-detail',
                    params: { department_id: userDetail.user.department._id }
                  }"
                >
                  {{ userDetail.user.department.name }}
                </router-link>
              </q-item-section>
            </q-item>
            <q-item v-if="userDetail.user.isStudent">
              <q-item-section class="text-weight-light">
                Graduation on {{ userDetail.user.graduationOn }}
              </q-item-section>
            </q-item>
            <q-item v-if="userDetail.user.isStudent">
              <q-item-section class="text-weight-light">
                Semester
                <span v-if="userDetail.user.semester">
                  {{ userDetail.user.semester.name }}
                </span>
              </q-item-section>
            </q-item>
            <q-item v-if="userDetail.user.isStudent">
              <q-item-section class="text-weight-light">
                Section
                <span v-if="userDetail.user.section">
                  {{ userDetail.user.section.name }}
                </span>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card>
        <q-card class="q-mb-md">
          <q-toolbar class="bg-primary text-white shadow-2">
            <q-toolbar-title class="text-weight-light">About</q-toolbar-title>
          </q-toolbar>
          <q-list dense class="rounded-borders">
            <q-item>
              <q-item-section class="text-weight-light">
                Born on {{ userDetail.user.bornOn }}
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section class="text-weight-light">
                Lives in {{ userDetail.user.livesIn }}
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section class="text-weight-light">
                is {{ userDetail.user.gender }}
              </q-item-section>
            </q-item>
          </q-list>
        </q-card>
        <!-- <q-card class="q-mb-md">
                <q-list class="rounded-borders">
                  <q-item-label header class="text-caption q-py-sm">Photos</q-item-label>
                  <q-separator/>
                  <q-item>
                    <div class="q-gutter-sm row items-start">
                      <q-img
                        src="https://cdn.quasar.dev/img/avatar2.jpg"
                        spinner-color="red"
                        style="height: 48px; width: 48px"
                      />
                      <q-img
                        src="https://cdn.quasar.dev/img/avatar2.jpg"
                        spinner-color="red"
                        style="height: 48px; width: 48px"
                      />
                      <q-img
                        src="https://cdn.quasar.dev/img/avatar2.jpg"
                        spinner-color="red"
                        style="height: 48px; width: 48px"
                      />
                      <q-img
                        src="https://cdn.quasar.dev/img/avatar2.jpg"
                        spinner-color="red"
                        style="height: 48px; width: 48px"
                      />
                      <q-img
                        src="https://cdn.quasar.dev/img/avatar2.jpg"
                        spinner-color="red"
                        style="height: 48px; width: 48px"
                      />
                      <q-img
                        src="https://cdn.quasar.dev/img/avatar2.jpg"
                        spinner-color="red"
                        style="height: 48px; width: 48px"
                      />
                    </div>
                  </q-item>
                </q-list>
              </q-card> -->
      </div>
    </div>
  </q-page>
</template>
<script>
import jwtDecode from "jwt-decode";
import moment from "moment";
export default {
  name: "user Profile",
  props: ["id"],
  data() {
    return {
      userDetail: "",
      tab: "Posts"
    };
  },
  filters: {
    fromNow: function(date) {
      return moment(date)
        .fromNow();
    }
  },
  watch: {
    id(value) {
      this.getUserProfileDetail(value);
    }
  },
  computed: {
    getAuthUser() {
      const decodedUser = jwtDecode(this.$q.sessionStorage.getItem("token"));
      return decodedUser;
    }
  },
  mounted() {
    this.getUserProfileDetail(this.id);
  },
  methods: {
    handleGotoPost(postId) {
      this.$router.push({ name: "feed-detail", params: { id: postId } });
    },
    handleUpdateUserProfile() {
      this.$router.push({ name: "profile-update", params: { id: this.id } });
    },
    getUserProfileDetail(userId) {
      this.$axios.get(`/api/v1/profileById/${userId}`).then(response => {
        this.userDetail = response.data;
      });
    }
  }
};
</script>

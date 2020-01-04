<template>
  <q-page padding>
    <q-infinite-scroll @load="onLoad" :offset="250">
      <div class="row q-col-gutter-x-md q-col-gutter-y-md">
        {{ departmentDetail }}
        <div class="col-md-12">
          <q-card>
            <q-card-section>
              <h4 class="q-my-none">
                {{ departmentDetail.name }}, {{ departmentDetail.id }}
              </h4>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-xs-12">
          <div class="row q-col-gutter-x-md q-col-gutter-y-md">
            <div class="col-xs-12 col-md-8">
              <q-banner
                v-if="
                  errors.responseError ||
                    errors.requestError ||
                    errors.clientError
                "
                dense
                inline-actions
                class="text-white bg-red"
              >
                <div
                  v-if="
                    Array.isArray(errors.responseError) &&
                      errors.responseError.length > 0
                  "
                >
                  Please fix following errors -
                  <ul>
                    <li
                      v-for="(error, index) in errors.responseError"
                      :key="index"
                    >
                      <b>{{ error.param }}</b> - {{ error.msg }}
                    </li>
                  </ul>
                </div>
                <div v-else v-html="errors.responseError"></div>
                <div v-if="errors.requestError">
                  {{ errors.requestError }}
                </div>
                <div v-if="errors.clientError">
                  {{ errors.clientError }}
                </div>
              </q-banner>
              <q-card style="width: 100%">
                <q-card-section class="row items-center no-wrap">
                  <q-list :style="{ width: '100%' }">
                    <q-item>
                      <q-item-section avatar top>
                        <q-avatar>
                          <img
                            :src="
                              $axios.defaults.baseURL +
                                getAuthUser.profileImage
                            "
                          />
                        </q-avatar>
                      </q-item-section>
                      <q-item-section>
                        <q-list>
                          <q-item>
                            <q-editor
                              :style="{ width: '100%' }"
                              v-model="postDetail"
                              :toolbar="[
                                ['left', 'center', 'right', 'justify'],
                                ['bold', 'italic', 'underline', 'strike'],
                                [
                                  {
                                    label: $q.lang.editor.formatting,
                                    icon: $q.iconSet.editor.formatting,
                                    list: 'no-icons',
                                    options: [
                                      'p',
                                      'h3',
                                      'h4',
                                      'h5',
                                      'h6',
                                      'code'
                                    ]
                                  }
                                ],
                                ['undo', 'redo']
                              ]"
                            />
                          </q-item>
                          <q-item>
                            <q-item-section>
                              <div>
                                <file-upload v-model="fileList">
                                  <div slot="activator">
                                    <div
                                      size="150px"
                                      class="grey lighten-3 mb-3"
                                    >
                                      <q-chip
                                        clickable
                                        square
                                        style="background: rgba(0, 0, 0, 0) linear-gradient(150deg, rgb(0, 188, 212), rgb(0, 150, 136), rgb(103, 58, 183)) repeat scroll 0% 0%;"
                                        class="shadow-2 q-ml-none"
                                        text-color="white"
                                        icon="image"
                                        label="Images/Pics"
                                      />
                                      <i>Select image files to upload..</i>
                                    </div>
                                    <!-- <pre>{{fileList}}</pre>               -->
                                  </div>
                                </file-upload>
                              </div>
                            </q-item-section>
                          </q-item>
                          <q-separator
                            v-if="
                              fileList.hasOwnProperty('files') &&
                                fileList.files.length > 0
                            "
                          />
                          <q-item
                            class="q-pa-xs"
                            v-if="
                              fileList.hasOwnProperty('files') &&
                                fileList.files.length > 0
                            "
                          >
                            <q-item-section>
                              <div class="q-gutter-xs q-px-md row items-start">
                                <q-img
                                  transition="fade"
                                  v-for="(file, index) in fileList.files"
                                  :key="index"
                                  :src="getImage(file)"
                                  style="width: 176px"
                                  ratio="1"
                                  spinner-color="white"
                                  class="rounded-borders"
                                >
                                  <div
                                    class="absolute-top-right text-center"
                                    style="padding: 8px;background: none"
                                  >
                                    <q-btn
                                      round
                                      outline
                                      color="red"
                                      size="xs"
                                      icon="clear"
                                      @click="deleteFile(index)"
                                    />
                                  </div>
                                  <div
                                    class="absolute-bottom text-center"
                                    style="padding: 8px"
                                  >
                                    {{ file.name }}
                                  </div>
                                  <template v-slot:error>
                                    <div
                                      class="absolute-full flex flex-center text-white"
                                      style="background: rgba(0, 0, 0, 0) linear-gradient(150deg, rgb(0, 188, 212), rgb(0, 150, 136), rgb(103, 58, 183)) repeat scroll 0% 0%;"
                                    >
                                      N/A
                                    </div>
                                  </template>
                                </q-img>
                              </div>
                            </q-item-section>
                          </q-item>
                        </q-list>
                      </q-item-section>
                    </q-item>
                    <q-item>
                      <q-item-section> </q-item-section>
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
                            label="Post"
                            @click="handleSavePost"
                          />
                        </q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-card-section>
              </q-card>
            </div>
            <div class="col-xs-12 col-md-4">
              <q-card class="q-mb-md" v-if="departmentDetail.hod">
                <q-toolbar class="bg-primary text-white shadow-2">
                  <q-toolbar-title class="text-weight-light"
                    >HOD Details</q-toolbar-title
                  >
                </q-toolbar>
                <q-list class="rounded-borders">
                  <q-item>
                    <q-item-section class="text-weight-light">
                      <span
                        >Name:
                        <span v-if="departmentDetail.hod.name">
                          <q-chip
                            clickable
                            @click="
                              $router.push({
                                name: 'user-profile',
                                params: { id: departmentDetail.hod._id }
                              })
                            "
                          >
                            <q-avatar>
                              <img
                                :src="
                                  $axios.defaults.baseURL +
                                    departmentDetail.hod.profileImage
                                "
                              />
                            </q-avatar>
                            {{ departmentDetail.hod.name }}
                          </q-chip>
                        </span></span
                      >
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section class="text-weight-light">
                      <span
                        >Email:
                        <span v-if="departmentDetail.hod.email">
                          <q-chip>
                            <q-avatar
                              icon="email"
                              color="primary"
                              text-color="white"
                            />
                            {{ departmentDetail.hod.email }}
                          </q-chip>
                        </span></span
                      >
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-card>
              <q-card class="q-mb-md" v-if="departmentDetail.hod">
                <q-toolbar class="bg-primary text-white shadow-2">
                  <q-toolbar-title class="text-weight-light"
                    >SMS Notice Details</q-toolbar-title
                  >
                </q-toolbar>
                <q-list class="rounded-borders">
                  <q-item dense>
                    <q-item-section class="text-weight-light">
                      <q-scroll-area style="height: 100px;">
                        <q-list>
                          <q-item>
                            SMS1
                          </q-item>
                          <q-item>
                            SMS1
                          </q-item>
                          <q-item>
                            SMS1
                          </q-item>
                          <q-item>
                            SMS1
                          </q-item>
                          <q-item>
                            SMS1
                          </q-item>
                        </q-list>
                      </q-scroll-area>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section class="text-weight-light">
                      <q-input
                        outlined
                        stack-label
                        label="Message"
                        border
                        autogrow
                        class=""
                      />
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section class="text-weight-light">
                      <q-btn color="primary" size="sm" label="Submit" />
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-card>
            </div>
          </div>
        </div>
      </div>
    </q-infinite-scroll>
  </q-page>
</template>
<script>
import jwtDecode from "jwt-decode";

import FileUpload from "../../components/FileUpload";
export default {
  name: "profile-update",
  props: ["department_id"],
  components: {
    FileUpload: FileUpload
  },
  watch: {
    fileList: {
      handler: function(files) {
        console.log(files);
      },
      deep: true
    }
  },
  data() {
    return {
      post_params: {
        page: 1,
        count: 1,
        size: 5
      },
      items: [],
      departmentDetail: [],
      university: "",
      department: "",
      graduation_on: "",
      postDetail: "",
      fileList: {},
      errors: {
        responseError: null,
        requestError: null,
        clientError: null
      },
      isEdit: "",
      born_on: "",
      lives_in: "",
      gender: "",
      accept: false,
      options: {
        university: [
          {
            label: "Google",
            value: "goog"
          },
          {
            label: "Facebook",
            value: "fb"
          },
          {
            label: "Twitter",
            value: "twt"
          },
          {
            label: "Apple",
            value: "app"
          },
          {
            label: "Oracle",
            value: "ora",
            disable: true
          }
        ],
        department: [
          {
            label: "Google",
            value: "goog"
          },
          {
            label: "Facebook",
            value: "fb"
          },
          {
            label: "Twitter",
            value: "twt"
          },
          {
            label: "Apple",
            value: "app"
          },
          {
            label: "Oracle",
            value: "ora",
            disable: true
          }
        ],
        graduation_on: [
          {
            label: "Google",
            value: "goog"
          },
          {
            label: "Facebook",
            value: "fb"
          },
          {
            label: "Twitter",
            value: "twt"
          },
          {
            label: "Apple",
            value: "app"
          },
          {
            label: "Oracle",
            value: "ora",
            disable: true
          }
        ]
      }
    };
  },
  created() {
    this.getDepartmentDetail();
    this.getDepartmentPosts()
  },
  computed: {
    getAuthUser() {
      return this.$q.sessionStorage.getItem("authUser");
    },
  },
  methods: {
    onLoad(index, done) {
      console.log(this.items.length, this.post_params.count);
      if (this.items.length < this.post_params.count) {
        this.post_params.page = index;
        this.$axios
          .get(`/api/v1/department/${this.department_id}/createPost`, { params: this.post_params })
          .then(response => {
            this.post_params.count = response.data.totalPosts;
            var temp = response.data.posts.map(post => {
              return {
                id: post._id,
                content: post.content,
                files: post.imageUrl.map(
                  file => this.$axios.defaults.baseURL + file
                ),
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
    },
    getImage(file) {
      return URL.createObjectURL(file);
    },
    deleteFile(index) {
      this.fileList.files.splice(index, 1);
    },
    deleteFiles() {
      this.fileList.files = [];
    },
    clearErrors(errors) {
      errors.responseError = null;
      errors.requestError = null;
      errors.clientError = null;
    },
    async handleSavePost() {
      try {
        this.clearErrors(this.errors);
        let payload = new FormData();
        if (
          this.fileList.hasOwnProperty("files") &&
          this.fileList.files.length > 0
        ) {
          for (let i = 0; i < this.fileList.files.length; i++) {
            payload.append("files", this.fileList.files[i]);
          }
        }
        payload.append("content", this.postDetail);
        const { data, status } = await this.$axios.post(
          `/api/v1/department/${this.department_id}/createPost`,
          payload
        );
        if (status === 201) {
          this.$q.notify({
            color: "teal",
            icon: "post_add",
            position: "bottom-right",
            message: "New Post Created."
          });
          this.$router.push({ name: "feed-posts" });
        } else {
          console.log(data);
        }
      } catch (error) {
        if (error.response) {
          if (error.response.data.hasOwnProperty("errors")) {
            this.$q.notify({
              color: "negative",
              icon: "report_problem",
              position: "top-right",
              message: "One or more fields have errors."
            });
            this.errors.responseError = error.response.data.errors;
          } else {
            this.errors.responseError = error.response.data.message;
          }
        } else if (error.request) {
          this.errors.requestError = error.request;
        } else {
          this.errors.clientError = error.message;
        }
      } finally {
      }
    },
    async getDepartmentPosts() {
      try{
        const { data } = this.$axios.get(`/api/v1/department/${this.department_id}/posts/`)
      } catch(error) {
        console.log(error)
      }
    },
    getDepartmentDetail() {
      this.$axios
        .get(`/api/v1/department/${this.department_id}`)
        .then(response => {
          this.departmentDetail = response.data.department;
        });
    }
  }
};
</script>

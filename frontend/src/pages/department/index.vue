<template>
  <q-page padding>
    <q-infinite-scroll @load="onLoad" :offset="250">
      <div class="row q-col-gutter-x-md q-col-gutter-y-md">
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
              <q-card style="width: 100%" class="q-mb-md" v-if="departmentDetail.hod && getAuthUser.depId == department_id && getAuthUser.ishod">
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
              <h6 class="q-my-md">Posts</h6>
              <q-card
                v-for="(item, index) in items"
                :key="index"
                class="caption"
                style="margin-bottom: 10px"
                bordered
                flat
                >
                <q-card-section class="q-pa-none">
                  <q-list>
                    <q-item
                      class="q-px-md text-weight-thin"
                    >
                      <i>{{item.date | fromNow}}</i>
                    </q-item>
                    <q-item
                    class="q-px-md"
                    >
                      <q-item-section v-html="item.content"> </q-item-section>
                    </q-item>
                    <q-item>
                      <div class="q-gutter-xs q-mb-sm row items-start">
                        <q-img
                          transition="fade"
                          v-for="(file, index) in item.files"
                          :key="index"
                          :src="file"
                          style="width: 150px"
                          ratio="1"
                          spinner-color="white"
                          class="rounded-borders shadow-2 cursor-pointer"
                          @click="handleDownloadNote(file)"
                        >
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
              <q-card class="q-mb-md" v-if="departmentDetail.hod && getAuthUser.depId == department_id && getAuthUser.ishod">
                <q-toolbar class="bg-primary text-white shadow-2">
                  <q-toolbar-title class="text-weight-light"
                    >SMS Notice Details</q-toolbar-title
                  >
                </q-toolbar>
                <q-form ref="smsForm" @submit="onSmsSubmit">
                  <q-list class="rounded-borders">
                    <!-- <q-item dense>
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
                    </q-item> -->
                    <q-item>
                      <q-item-section class="text-weight-light">
                        <q-select
                          size="sm"
                          outlined
                          border
                          stack-label
                          v-model="smsPost.semester"
                          :options="options.semesters"
                          label="Semester *"
                          hint="Semester is required"
                          emit-value
                          map-options
                          lazy-rules
                          :rules="[
                            val =>
                              (val && val.length > 0) || 'Select semester'
                          ]"
                        />
                        <q-select
                          outlined
                          size="sm"
                          border
                          stack-label
                          v-model="smsPost.section"
                          :options="options.sections"
                          label="Section *"
                          hint="Section is required"
                          emit-value
                          map-options
                          lazy-rules
                          :rules="[
                            val =>
                              (val && val.length > 0) || 'Select section'
                          ]"
                        />
                        <q-input
                          size="sm"
                          outlined
                          stack-label
                          label="Message"
                          border
                          counter
                          maxlength="20"
                          autogrow
                          v-model="smsPost.message"
                          lazy-rules
                          :rules="[
                            val =>
                              (val && val.length > 0) || 'Add message'
                          ]"
                          class=""
                        />
                        <q-input
                          v-model.number="smsPost.toNumber"
                          type="number"
                          size="sm"
                          outlined
                          stack-label
                          label="Phone Number"
                          border
                          lazy-rules
                          :rules="[
                            val =>
                              (val && val.length > 0) || 'Add Phone Number'
                          ]"
                        />
                      </q-item-section>
                    </q-item>
                    <q-item>
                      <q-item-section class="text-weight-light">
                        <q-btn size="sm" label="Submit" type="submit" color="primary" />
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-form>
              </q-card>
            </div>
          </div>
        </div>
      </div>
      <template v-slot:loading>
        <div class="row justify-center q-my-md">
          <q-spinner-dots
            color="primary"
            size="40px"
            v-if="items.length < post_params.count"
          />
          <span v-else class="block text-weight-thin">
            <i>You reached the end of posts.</i>
          </span>
      </div>
    </template>
    </q-infinite-scroll>
  </q-page>
</template>
<script>
import jwtDecode from "jwt-decode";
import moment from "moment";

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
  filters: {
    fromNow: function(date) {
      return moment(date)
        .fromNow();
    }
  },
  data() {
    return {
      smsPost: {
        message: "",
        semester: "",
        section: "",
        toNumber: "9779860333684"
      },
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
        sections: [],
        semesters: []
      }
    };
  },
  created() {
    this.getDepartmentDetail();
    this.getSemestersAndSections()
  },
  computed: {
    getAuthUser() {
      return this.$q.sessionStorage.getItem("authUser");
    },
  },
  methods: {
    onSmsSubmit() {
      this.clearErrors(this.errors);
      let payload = {
        semesterId: this.smsPost.semester,
        sectionId: this.smsPost.section
      }
      this.$axios
        .post(`api/v1/department/${this.department_id}/sendSMS`, { data: { message: this.smsPost.message, toNumber: this.smsPost.toNumber}}, { params: payload})
        .then(response => {
          if (response.status === 200) {
            this.$q.notify({
              color: "green-4",
              textColor: "white",
              icon: "fas fa-check-circle",
              position: "top-right",
              message: "SMS Sent."
            });
          }
          this.$refs["smsForm"].resetValidation()
          this.smsPost = {
            message: null,
            semester: null,
            section: null,
            toNumber: "9779860333684"
          }
        })
        .catch(error => {
          if (error.response) {
            if (error.response.data.hasOwnProperty("errors")) {
              this.$q.notify({
                color: "negative",
                icon: "report_problem",
                position: "top-right",
                message: "Failed to submit SMS."
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
        });
    },
    handleDownloadNote(file) {
      const link = document.createElement("a");
      // link.href = URL.createObjectURL(blob)
      link.href = file;
      link.setAttribute("target", "_blank");
      link.setAttribute("download", file.substring(file.lastIndexOf("/") + 1));
      link.click();
      URL.revokeObjectURL(link.href);
    },
    onLoad(index, done) {
      console.log(this.items.length, this.post_params.count);
      if (this.items.length < this.post_params.count) {
        this.post_params.page = index;
        this.$axios
          .get(`/api/v1/department/${this.department_id}/posts`, { params: this.post_params })
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
                date: post.createdAt,
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
    getDepartmentDetail() {
      this.$axios
        .get(`/api/v1/department/${this.department_id}`)
        .then(response => {
          this.departmentDetail = response.data.department;
        });
    },
    getSemestersAndSections() {
      this.$axios.get(`/api/v1/addInfo`).then(response => {
      const { sections, semesters } = response.data;
      this.options.sections = sections.map(section => {
        return {
          label: section.name,
          value: section._id
        };
      });
      this.options.semesters = semesters.map(semester => {
        return {
          label: semester.name,
          value: semester._id
        };
      });
    });
    }
  }
};
</script>

<template>
  <q-page padding>
    <q-form @submit="onSubmit">
      <q-banner
        v-if="errors.responseError || errors.requestError || errors.clientError"
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
            <li v-for="(error, index) in errors.responseError" :key="index">
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
      <div class="row q-col-gutter-x-md q-col-gutter-y-md q-mb-md">
        <div class="col-md-2">
          <q-card class="fit">
            <q-card-section>
              <file-upload v-model="fileList">
                <div slot="activator">
                  <q-img
                    :ratio="4 / 3"
                    spinner-color="black"
                    spinner-size="82px"
                    v-if="userDetail.profileImage"
                    :src="userDetail.profileImage"
                  >
                    <div
                      class="absolute-bottom text-center"
                      style="padding: 0px"
                    >
                      change
                    </div>
                    <template v-slot:error>
                      <div
                        class="absolute-full flex flex-center bg-negative text-white"
                      >
                        Cannot load image
                      </div>
                    </template>
                  </q-img>
                  <q-icon v-else name="fas fa-image" />
                </div>
              </file-upload>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-md-10">
          <q-card class="fit">
            <q-toolbar class="bg-primary text-white shadow-2">
              <q-toolbar-title class="text-weight-light"
                >Account Detail</q-toolbar-title
              >
            </q-toolbar>
            <q-card-section>
              <div class="row q-col-gutter-x-md q-col-gutter-y-md">
                <div class="col-md-4 col-sm-12">
                  <q-input
                    v-model="userDetail.name"
                    label="Name *"
                    filled
                    type="text"
                    lazy-rules
                    :rules="[
                      val => (val && val.length > 0) || 'Please type something'
                    ]"
                    hint="Your name"
                  />
                </div>
                <div class="col-md-4 col-sm-12">
                  <q-input
                    v-model="userDetail.email"
                    label="Email *"
                    filled
                    type="text"
                    lazy-rules
                    :rules="[
                      val => (val && val.length > 0) || 'Please type something'
                    ]"
                    hint="Your email"
                  />
                </div>
                <div class="col-md-4 col-sm-12">
                  <q-input
                    v-model="userDetail.password"
                    label="Password *"
                    filled
                    clearable
                    lazy-rules
                    :type="isPwd ? 'password' : 'text'"
                    hint="Your Password"
                  >
                    <template v-slot:prepend>
                      <q-icon name="lock" />
                    </template>
                    <template v-slot:append>
                      <q-icon
                        :name="isPwd ? 'visibility_off' : 'visibility'"
                        class="cursor-pointer"
                        @click="isPwd = !isPwd"
                      />
                    </template>
                  </q-input>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
      <div class="row q-col-gutter-x-md q-col-gutter-y-md items-center">
        <div class="col-xs-12">
          <div class="row q-col-gutter-x-md q-col-gutter-y-md">
            <div class="col-xs-12 col-md-6" v-if="userDetail.isStudent">
              <q-card class="my-card">
                <q-toolbar class="bg-primary text-white shadow-2">
                  <q-toolbar-title class="text-weight-light"
                    >Current Affiliation</q-toolbar-title
                  >
                </q-toolbar>
                <q-separator />
                <div class="row q-pa-md">
                  <div class="col-xs-12">
                    <div class="row q-col-gutter-x-md q-col-gutter-y-md">
                      <div class="col-md-6">
                        <q-select
                          filled
                          v-model="userDetail.college"
                          :options="options.college"
                          label="Your College *"
                          hint="College is required"
                          emit-value
                          map-options
                          lazy-rules
                          :rules="[
                            val =>
                              (val && val.length > 0) || 'Please type something'
                          ]"
                        />
                      </div>
                      <div class="col-md-6">
                        <q-select
                          filled
                          v-model="userDetail.department"
                          :options="options.departments"
                          label="Your Department *"
                          hint="Department is required"
                          emit-value
                          map-options
                          lazy-rules
                          :rules="[
                            val =>
                              (val && val.length > 0) || 'Please type something'
                          ]"
                        />
                      </div>
                      <div class="col-md-6">
                        <q-select
                          filled
                          v-model="userDetail.graduationOn"
                          :options="options.graduation_on"
                          label="Graduation On *"
                          hint="Graduation On is required"
                          emit-value
                          map-options
                          lazy-rules
                          :rules="[
                            val =>
                              (val && val.length > 0) || 'Please type something'
                          ]"
                        />
                      </div>
                      <div class="col-md-6">
                        <q-select
                          filled
                          v-model="userDetail.semester"
                          :options="options.semesters"
                          label="Semester On *"
                          hint="Semester On is required"
                          emit-value
                          map-options
                          lazy-rules
                          :rules="[
                            val =>
                              (val && val.length > 0) || 'Please type something'
                          ]"
                        />
                      </div>
                      <div class="col-md-6">
                        <q-select
                          filled
                          v-model="userDetail.section"
                          :options="options.sections"
                          label="Section On *"
                          hint="Section On is required"
                          emit-value
                          map-options
                          lazy-rules
                          :rules="[
                            val =>
                              (val && val.length > 0) || 'Please type something'
                          ]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </q-card>
            </div>
            <div :class="['col-xs-12', (userDetail.isStudent) ? 'col-md-6' : 'col-md-12']">
              <q-card class="my-card">
                <q-toolbar class="bg-primary text-white shadow-2">
                  <q-toolbar-title class="text-weight-light"
                    >Personal Detail</q-toolbar-title
                  >
                </q-toolbar>
                <q-separator />
                <div class="row q-pa-md">
                  <div class="col-xs-12">
                    <div class="row q-col-gutter-x-md q-col-gutter-y-md">
                      <div class="col-md-6">
                        <q-input
                          label="Your D.O.B *"
                          filled
                          v-model="userDetail.bornOn"
                          mask="date"
                          :rules="['date']"
                        >
                          <template v-slot:append>
                            <q-icon name="event" class="cursor-pointer">
                              <q-popup-proxy
                                ref="qDateProxy"
                                transition-show="scale"
                                transition-hide="scale"
                              >
                                <q-date
                                  v-model="userDetail.bornOn"
                                  @input="() => $refs.qDateProxy.hide()"
                                />
                              </q-popup-proxy>
                            </q-icon>
                          </template>
                        </q-input>
                      </div>
                      <div class="col-md-6">
                        <q-select
                          filled
                          v-model="userDetail.gender"
                          :options="options.gender"
                          label="Your Gender *"
                          hint="Gender is required"
                          emit-value
                          map-options
                          lazy-rules
                          :rules="[
                            val =>
                              (val && val.length > 0) || 'Please type something'
                          ]"
                        />
                      </div>
                      <div class="col-md-12">
                        <q-input
                          filled
                          v-model="userDetail.livesIn"
                          label="Address *"
                          hint="Address is required"
                          emit-value
                          map-options
                          lazy-rules
                          :rules="[
                            val =>
                              (val && val.length > 0) || 'Please type something'
                          ]"
                        />
                      </div>
                      <div class="col-md-12">
                        <q-input
                          v-model="userDetail.phone"
                          label="Contact Number *"
                          filled
                          type="text"
                          lazy-rules
                          :rules="[
                            val =>
                              (val && val.length > 0) || 'Please type something'
                          ]"
                          hint="Telephone number"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </q-card>
            </div>
          </div>
        </div>
        <div class="col-xs-12">
          <q-card>
            <q-card-section>
              <q-toggle
                v-model="accept"
                label="I accept above details are genuine."
              />

              <div>
                <q-btn label="Update" type="submit" color="primary" />
                <q-btn
                  label="Cancel"
                  @click="handleCancel"
                  color="primary"
                  flat
                  class="q-ml-sm"
                />
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </q-form>
  </q-page>
</template>
<script>
// import moment from 'moment'
import jwtDecode from "jwt-decode";
import FileUpload from "../../components/FileUpload";
export default {
  name: "profile-update",
  props: ["id"],
  components: {
    FileUpload: FileUpload
  },
  watch: {
    fileList: {
      deep: true,
      handler(filesObject) {
        // this.userDetail.profileImage = this.getImage(filesObject.files[0])
        if (filesObject.files) {
          this.clearErrors(this.errors);
          let payload = new FormData();
          for (let i = 0; i < filesObject.files.length; i++) {
            payload.append("files", filesObject.files[i]);
          }
          this.$axios
            .put("/api/v1/profilePic", payload)
            .then(response => {
              console.log(response);
              if (response.status === 201) {
                this.$q.notify({
                  color: "green-4",
                  textColor: "white",
                  icon: "fas fa-check-circle",
                  position: "top-right",
                  message: "Your Profile pic is successfully updated."
                });
              }
              this.userDetail.profileImage =
                this.$axios.defaults.baseURL + response.data.user.profileImage;
            })
            .catch(error => {
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
            });
          // this.userDetail.profileImage = this.getImage(filesObject.files[0]);
        }
      }
    }
  },
  data() {
    return {
      isPwd: true,
      errors: {
        responseError: null,
        requestError: null,
        clientError: null
      },
      fileList: [],
      selected_file: "",
      name: "",
      email: "",
      check_if_document_upload: false,
      accept: false,
      userDetail: {
        id: "",
        profileImage: "",
        name: "",
        email: "",
        college: "",
        semester: "",
        section: "",
        department: "",
        graduationOn: "",
        bornOn: new Date(),
        livesIn: "",
        password: "",
        gender: "",
        phone: ""
      },
      options: {
        college: [
          {
            label: "NCIT",
            value: "NCIT"
          }
        ],
        gender: [
          {
            label: "Male",
            value: "male"
          },
          {
            label: "Female",
            value: "female"
          },
          {
            label: "Other",
            value: "Other"
          }
        ],
        departments: [],
        // todo  add year from current year
        graduation_on: [
          {
            label: "2019",
            value: "2019"
          },
          {
            label: "2020",
            value: "2020"
          },
          {
            label: "2021",
            value: "2021"
          },
          {
            label: "2022",
            value: "2022"
          }
        ]
      }
    };
  },
  mounted() {
    this.$axios.get(`/api/v1/me`).then(response => {
      const {
        _id,
        profileImage,
        email,
        name,
        college,
        phone,
        department,
        isStudent,
        ishod,
        isTeacher,
        gender,
        graduationOn,
        livesIn,
        section,
        bornOn,
        semester
      } = response.data.user;
      this.userDetail = {
        id: _id,
        profileImage: this.$axios.defaults.baseURL + profileImage,
        email,
        name,
        college,
        department: (department) ? department._id : '',
        gender,
        graduationOn,
        bornOn,
        isStudent,
        ishod,
        isTeacher,
        livesIn,
        section: (section) ? section._id : '',
        semester: (semester) ? semester._id : '',
        phone
      };
    });

    this.$axios.get(`/api/v1/addInfo`).then(response => {
      const { departments, sections, semesters } = response.data;
      this.options.departments = departments.map(department => {
        return {
          label: department.name,
          value: department._id
        };
      });
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
  },
  methods: {
    clearErrors(errors) {
      errors.responseError = null;
      errors.requestError = null;
      errors.clientError = null;
    },
    getImage(file) {
      return URL.createObjectURL(file);
    },
    file_selected(file) {
      console.log(file);
      this.selected_file = file[0];
      this.check_if_document_upload = true;
    },
    uploadFile() {
      let fd = new FormData();
      console.log(this.selected_file);
      fd.append("image", this.selected_file);
      this.$axios
        .put("/api/v1/profilePic", { content: this.editor })
        .then(response => {
          this.userDetail.user.profileImage =
            this.$axios.defaults.baseURL + response.data.user.profileImage;
        });
    },
    handleCancel() {
      this.$router.push({
        name: "user-profile",
        params: { id: this.id }
      });
    },
    onSubmit() {
      if (this.accept !== true) {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'fas fa-exclamation-triangle',
          message: 'You need to accept provied details are genuine'
        })
      } else {
      this.clearErrors(this.errors);
      let payload = {}
      if(this.userDetail.isStudent) {
        payload = {
          name: this.userDetail.name,
          email: this.userDetail.email,
          college: this.userDetail.college,
          semester: this.userDetail.semester,
          section: this.userDetail.section,
          department: this.userDetail.department,
          graduationOn: this.userDetail.graduationOn,
          bornOn: this.userDetail.bornOn,
          livesIn: this.userDetail.livesIn,
          phone: this.userDetail.phone,
          gender: this.userDetail.gender,
          password: this.userDetail.password
        }
      }
      if(this.userDetail.ishod || this.userDetail.isTeacher) {
        payload = {
          name: this.userDetail.name,
          email: this.userDetail.email,
          department: this.userDetail.department,
          bornOn: this.userDetail.bornOn,
          livesIn: this.userDetail.livesIn,
          phone: this.userDetail.phone,
          gender: this.userDetail.gender,
          password: this.userDetail.password
        }
      }
      this.$axios
        .put("/api/v1/me", payload)
        .then(response => {
          if (response.status === 201) {
            this.$q.notify({
              color: "green-4",
              textColor: "white",
              icon: "fas fa-check-circle",
              position: "top-right",
              message: "Your Profile is successfully updated."
            });
          }
          let authUserDetail = Object.assign({}, this.$q.sessionStorage.getItem("authUser"));
          authUserDetail.isProfileUpdated = true
          this.$q.sessionStorage.set('authUser',authUserDetail)
          this.$router.push({
            name: "user-profile",
            params: { id: response.data.user._id }
          });
          console.log(response);
        })
        .catch(error => {
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
        });
      }
    },
    factoryFn(files) {
      let fd = new FormData();
      console.log(this.selected_file);
      fd.append("image", files[0]);
      this.$axios.put("/api/v1/profilePic", fd).then(response => {
        this.userDetail.profileImage =
          this.$axios.defaults.baseURL + response.data.user.profileImage;
      });
      // return {
      //   url: 'http://localhost:4000/api/v1/profilePic',
      //   method: 'PUT',
      //   headers: [
      //     { name: 'Authorization', value: `Bearer ${this.$q.sessionStorage.getItem('token')}` }
      //   ]
      // }
    }
  }
};
</script>

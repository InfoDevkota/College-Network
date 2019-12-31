<template>
  <q-page padding>
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
            <q-card style="width: 100%">
              <q-card-section class="row items-center no-wrap">
                <q-list :style="{ width: '100%' }">
                  <q-item>
                    <q-item-section avatar top>
                      <q-avatar>
                        <img :src="$axios.defaults.baseURL + getCurrentUser.profileImage" />
                      </q-avatar>
                    </q-item-section>
                    <q-item-section>
                      <q-editor
                        :style="{ width: '100%' }"
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
                          @click="savePost"
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
                <q-toolbar-title class="text-weight-light">HOD Details</q-toolbar-title>
              </q-toolbar>
              <q-list class="rounded-borders">
                <q-item>
                  <q-item-section class="text-weight-light">
                    <span>Name: <span v-if="departmentDetail.hod.name">
                      <q-chip clickable @click="$router.push({name: 'user-profile', params: {id: departmentDetail.hod._id }})">
                        <q-avatar>
                          <img :src="$axios.defaults.baseURL + departmentDetail.hod.profileImage">
                        </q-avatar>
                        {{departmentDetail.hod.name}}
                      </q-chip>
                      </span></span>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section class="text-weight-light">
                    <span>Email: <span v-if="departmentDetail.hod.email">
                       <q-chip>
                          <q-avatar icon="email" color="primary" text-color="white" />
                          {{departmentDetail.hod.email}}
                        </q-chip>                      
                      </span></span>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card>
            <q-card class="q-mb-md" v-if="departmentDetail.hod">
              <q-toolbar class="bg-primary text-white shadow-2">
                <q-toolbar-title class="text-weight-light">SMS Notice Details</q-toolbar-title>
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
  </q-page>
</template>
<script>
import jwtDecode from "jwt-decode";

export default {
  name: "profile-update",
  props: ["department_id"],
  data() {
    return {
      departmentDetail: [],
      university: "",
      department: "",
      graduation_on: "",
      editor: "",
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
  },
  computed: {
    getCurrentUser() {
      return jwtDecode(this.$q.sessionStorage.getItem("token"));
    }
  },
  methods: {
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

<template>
  <q-page padding>
    <div class="row q-col-gutter-x-md q-col-gutter-y-md">
      {{ departmentDetail }}kjkj
      <div class="col-md-12">
        <q-card>
          <q-card-section>
            <q-avatar size="120px">
              <q-icon name="fas fa-image" />
            </q-avatar>
            {{ departmentDetail.name }}
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
                        <img :src="`https://cdn.quasar.dev/img/avatar3.jpg`" />
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
                  <q-item dense style="padding:0 15px 10px">
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
                          label="Share"
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
            <q-card class="q-mb-md">
              <q-list class="rounded-borders">
                <q-item>
                  <q-item-section class="text-uppercase"
                    >members</q-item-section
                  >
                  <q-item-section avatar>
                    <q-btn
                      rounded
                      color="primary"
                      size="sm"
                      label="200 members"
                    />
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section class="text-weight-light">
                    <div class="row items-center">
                      <div class="col">
                        <q-btn size="md" round>
                          <q-avatar size="38px">
                            <img
                              src="https://cdn.quasar.dev/app-icons/icon-128x128.png"
                            />
                          </q-avatar>
                        </q-btn>
                      </div>
                      <div class="col">
                        <q-btn size="md" round>
                          <q-avatar size="38px">
                            <img
                              src="https://cdn.quasar.dev/app-icons/icon-128x128.png"
                            />
                          </q-avatar>
                        </q-btn>
                      </div>
                      <div class="col">
                        <q-btn size="md" round>
                          <q-avatar size="38px">
                            <img
                              src="https://cdn.quasar.dev/app-icons/icon-128x128.png"
                            />
                          </q-avatar>
                        </q-btn>
                      </div>
                      <div class="col">
                        <q-btn size="md" round>
                          <q-avatar size="38px">
                            <img
                              src="https://cdn.quasar.dev/app-icons/icon-128x128.png"
                            />
                          </q-avatar>
                        </q-btn>
                      </div>
                      <div class="col">
                        <q-btn size="md" round>
                          <q-avatar size="38px">
                            <img
                              src="https://cdn.quasar.dev/app-icons/icon-128x128.png"
                            />
                          </q-avatar>
                        </q-btn>
                      </div>
                    </div>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section class="text-uppercase"
                    >Introduction</q-item-section
                  >
                </q-item>
                <q-item>
                  <q-item-section class="text-weight-light">
                    is
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

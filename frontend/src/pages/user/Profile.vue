<template>
    <q-page padding>
        <div class="row q-col-gutter-md">
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
                    <q-badge color="red" floating>{{userDetail.user.posts.length}}</q-badge>
                  </q-tab>
                  <q-tab name="Comments" label="Comments">
                    <q-badge color="red" floating>10+</q-badge>
                  </q-tab>
                </q-tabs>

                <q-separator />

                <q-tab-panels v-model="tab" animated>
                  <q-tab-panel name="Posts">
                    <div class="text-h6">Posts</div>
                    <q-list  bordered separator>
                      <q-item v-for="(post) in userDetail.user.posts" :key="post._id">
                        <q-item-section>
                          <q-item-label v-html="post.content"></q-item-label>
                          <q-item-label caption>{{post.date}}</q-item-label>
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </q-tab-panel>

                  <q-tab-panel name="Comments">
                    <div class="text-h6">Comments</div>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
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
                        <img src="https://cdn.quasar.dev/img/boy-avatar.png">
                      </q-avatar>
                    </q-item-section>
                  </q-item>
                  <q-item class="q-pa-none">
                    <q-item-section class="text-weight-bold">
                      {{userDetail.user.name}}
                    </q-item-section>
                  </q-item>
                  <q-item class="q-pa-none">
                    <q-item-section class="text-weight-bold">
                      {{userDetail.user.email}}
                    </q-item-section>
                  </q-item>
                  <q-item class="q-pa-none" :style="{ padding: '5px' }" v-if="id === getAuthUser.userId">
                    <q-btn outline color="primary" icon="edit" size="sm" class="full-width q-mt-sm" label="Edit Profile"/>
                  </q-item>
                </q-list>
              </q-card>
              <q-card class="q-mb-md">
                <q-list dense class="rounded-borders">
                  <q-item-label header class="text-caption q-py-sm">About</q-item-label>
                  <q-separator/>
                  <q-item>
                    <q-item-section class="text-weight-light">
                      Born on
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section class="text-weight-light">
                      Lives in
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section class="text-weight-light">
                      is
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-card>
              <q-card class="q-mb-md">
                <q-list dense class="rounded-borders">
                  <q-item-label header class="text-caption q-py-sm">Current Affiliation</q-item-label>
                  <q-separator/>
                  <q-item>
                    <q-item-section class="text-weight-light">
                      University
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section class="text-weight-light">
                      Department
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section class="text-weight-light">
                      Graduation on
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-card>
              <q-card class="q-mb-md">
                <q-list dense class="rounded-borders">
                  <q-item-label header class="text-caption q-py-sm">About</q-item-label>
                  <q-separator/>
                  <q-item>
                    <q-item-section class="text-weight-light">
                      Born on
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section class="text-weight-light">
                      Lives in
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section class="text-weight-light">
                      is
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-card>
              <q-card class="q-mb-md">
                <q-list dense class="rounded-borders">
                  <q-item-label header class="text-caption q-py-sm">Contact</q-item-label>
                  <q-separator/>
                  <q-item>
                    <q-item-section class="text-weight-light">
                      fb
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section class="text-weight-light">
                      twitter
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section class="text-weight-light">
                      instagram
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-card>
              <q-card class="q-mb-md">
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
              </q-card>
            </div>
        </div>
    </q-page>
</template>
<script>
import jwtDecode from 'jwt-decode'

export default {
  name: 'user Profile',
  props: ['id'],
  data () {
    return {
      userDetail: '',
      tab: 'Posts'
    }
  },
  computed: {
    getAuthUser () {
      const decodedUser = jwtDecode(this.$q.sessionStorage.getItem('token'))
      return decodedUser
    }
  },
  mounted () {
    this.getUserProfileDetail(this.id)
  },
  methods: {
    getUserProfileDetail (userId) {
      this.$axios.get(`/api/v1/profileById/${userId}`).then(response => {
        this.userDetail = response.data
      })
    }
  }
}
</script>

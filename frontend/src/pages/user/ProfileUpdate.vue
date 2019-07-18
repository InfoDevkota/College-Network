<template>
  <q-page padding>
    {{userDetail}}
    <q-form
        @submit="onSubmit"
        @reset="onReset"
        >
    <div class="row q-col-gutter-x-md q-col-gutter-y-md">
      <div class="col-md-12">
        <q-card>
          <q-card-section>
            <q-avatar size="118px">
              <img v-if="userDetail.profileImage" :src='userDetail.profileImage'>
              <q-icon  v-else name="fas fa-image" />
            </q-avatar>
          </q-card-section>
          <q-card-section>
              <q-uploader
                field-name="image"
                :factory="factoryFn"
                no-thumbnails
                style="max-width: 300px"
              />
            </q-card-section>
        </q-card>
      </div>
      <div class="col-xs-12">
            <div class="row q-col-gutter-x-md q-col-gutter-y-md">
                <div class="col-xs-12 col-md-6">
                    <q-card class="my-card">
                        <q-item>
                            <q-item-section avatar>
                            <q-avatar>
                                <q-icon name="fas fa-university" />
                            </q-avatar>
                            </q-item-section>

                            <q-item-section>
                            <q-item-label>Current Affiliation</q-item-label>
                            </q-item-section>
                        </q-item>
                        <q-separator/>
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
                                        :rules="[ val => val && val.length > 0 || 'Please type something']"
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
                                        :rules="[ val => val && val.length > 0 || 'Please type something']"
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
                                        :rules="[ val => val && val.length > 0 || 'Please type something']"
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
                                        :rules="[ val => val && val.length > 0 || 'Please type something']"
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
                                        :rules="[ val => val && val.length > 0 || 'Please type something']"
                                    />
                                    </div>
                                  </div>
                                </div>
                            </div>
                    </q-card>
                </div>
                 <div class="col-xs-12 col-md-6">
                    <q-card class="my-card">
                        <q-item>
                            <q-item-section avatar>
                            <q-avatar>
                                <q-icon name="fas fa-university" />
                            </q-avatar>
                            </q-item-section>

                            <q-item-section>
                            <q-item-label>About</q-item-label>
                            </q-item-section>
                        </q-item>
                        <q-separator/>
                            <div class="row q-pa-md">
                                <div class="col-xs-12">
                                  <div class="row q-col-gutter-x-md q-col-gutter-y-md">
                                    <div class="col-md-6">
                                    <q-input label="Your D.O.B *" filled v-model="userDetail.bornOn " mask="date" :rules="['date']" >
                                      <template v-slot:append>
                                        <q-icon name="event" class="cursor-pointer">
                                          <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                                            <q-date v-model="userDetail.bornOn" @input="() => $refs.qDateProxy.hide()" />
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
                                        :rules="[ val => val && val.length > 0 || 'Please type something']"
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
                                          :rules="[ val => val && val.length > 0 || 'Please type something']"
                                      />
                                    </div>
                                    <div class="col-md-12">
                                      <q-input v-model="userDetail.phone" label="Contact Number *" filled type="text" lazy-rules
                                        :rules="[ val => val && val.length > 0 || 'Please type something']" hint="Telephone number" />
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
                <q-toggle v-model="accept" label="I accept above details are genuine." />

                    <div>
                        <q-btn label="Update" type="submit" color="primary"/>
                        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
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
export default {
  name: 'profile-update',
  props: ['id'],
  data () {
    return {
      selected_file: '',
      name: '',
      email: '',
      check_if_document_upload: false,
      accept: false,
      userDetail: {
        id: '',
        profileImage: '',
        name: '',
        email: '',
        college: '',
        semester: '',
        section: '',
        department: '',
        graduationOn: '',
        bornOn: new Date(),
        livesIn: '',
        gender: '',
        phone: ''
      },
      options: {
        college: [ {
          label: 'NCIT',
          value: 'NCIT'
        }],
        gender: [ {
          label: 'Male',
          value: 'male'
        },
        {
          label: 'Female',
          value: 'female'
        },
        {
          label: 'Other',
          value: 'Other'
        }],
        departments: [],
        // todo  add year from current year
        graduation_on: [ {
          label: '2019',
          value: '2019'
        },
        {
          label: '2020',
          value: '2020'
        },
        {
          label: '2021',
          value: '2021'
        },
        {
          label: '2022',
          value: '2022'
        }]
      }
    }
  },
  mounted () {
    this.$axios.get(`/api/v1/me`)
      .then(response => {
        const { _id, profileImage, email, name, college, phone, department, gender, graduationOn, livesIn, section, bornOn, semester } = response.data.user
        this.userDetail = {
          id: _id,
          profileImage: this.$axios.defaults.baseURL + profileImage,
          email,
          name,
          college,
          department,
          gender,
          graduationOn,
          bornOn,
          livesIn,
          section,
          semester,
          phone
        }
      })

    this.$axios.get(`/api/v1/addInfo`)
      .then(response => {
        const { departments, sections, semesters } = response.data
        this.options.departments = departments.map(department => {
          return {
            label: department.name,
            value: department._id
          }
        })
        this.options.sections = sections.map(section => {
          return {
            label: section.name,
            value: section._id
          }
        })
        this.options.semesters = semesters.map(semester => {
          return {
            label: semester.name,
            value: semester._id
          }
        })
      })
  },
  methods: {
    file_selected (file) {
      console.log(file)
      this.selected_file = file[0]
      this.check_if_document_upload = true
    },
    uploadFile () {
      let fd = new FormData()
      console.log(this.selected_file)
      fd.append('image', this.selected_file)
      this.$axios.put('/api/v1/profilePic', { content: this.editor })
        .then(response => {
          this.userDetail.user.profileImage = this.$axios.defaults.baseURL + response.data.user.profileImage
        })
    },
    onSubmit () {
      this.$axios.put('/api/v1/me', {
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
        gender: this.userDetail.gender
      })
        .then(response => {
          this.$router.push({ name: 'user-profile', params: { id: response.data.user._id } })
          console.log(response)
        })
    },
    factoryFn (files) {
      let fd = new FormData()
      console.log(this.selected_file)
      fd.append('image', files[0])
      this.$axios.put('/api/v1/profilePic', fd)
        .then(response => {
          this.userDetail.profileImage = this.$axios.defaults.baseURL + response.data.user.profileImage
        })
      // return {
      //   url: 'http://localhost:4000/api/v1/profilePic',
      //   method: 'PUT',
      //   headers: [
      //     { name: 'Authorization', value: `Bearer ${this.$q.sessionStorage.getItem('token')}` }
      //   ]
      // }
    }
  }
}
</script>

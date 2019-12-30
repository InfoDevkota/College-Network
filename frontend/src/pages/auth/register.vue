<template>
  <div
    class="col-12 col-sm-6 col-md-4 column self-stretch items-center"
    :style="{ flexDirection: 'row', background: 'linear-gradient(150deg,#00bcd4,#009688,#673ab7)' }"
  >
    <div class="q-pa-xl" :style="{ width: 100 + '%' }">
      <q-form dense @submit="onSubmit" @reset="onReset" >
        <q-input dense dark :disable="isLogin" rounded standout bottom-slots v-model="name" label="Name" type="text" counter>          <template v-slot:prepend>
            <q-icon name="person" />
          </template>
          <template v-slot:append>
            <q-icon name="close" @click="text = ''" class="cursor-pointer" />
          </template>
        </q-input>
        <div class="q-gutter-sm q-mb-sm">
          <span class="text-white q-mr-sm">Are you - </span>
          <q-radio dark left-label v-model="userType" color="white" class="text-white q-ma-none" val="student" label="Student" />
          <q-radio dark left-label v-model="userType" color="white" class="text-white q-ma-none" val="teacher" label="Teacher" />
        </div>
        <q-input dense dark :disable="isLogin" rounded standout bottom-slots v-model="email" label="Email" type="email" counter>          <template v-slot:prepend>
            <q-icon name="email" />
          </template>
          <template v-slot:append>
            <q-icon name="close" @click="text = ''" class="cursor-pointer" />
          </template>
        </q-input>
        <q-input
          dark
          dense
          rounded
          :disable="isLogin"
          style="bg-color: 'black'"
          standout
          v-model="password"
          label="password"
          :type="isPwd ? 'password' : 'text'"
          counter
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
        <q-input
          @input="val => { documentsForVerification = val }"
          multiple
          dark
          standout
          dense
          rounded
          type="file"
          hint="Native file (multiple)"
        />
        <q-toggle v-model="accept" label="I accept the license and terms" />

        <div>
          <q-btn size="sm" label="Register"  :loading="isLogin"  type="submit" color="primary">
             <template v-slot:loading>
                <q-spinner-facebook />
              </template>
          </q-btn>
          <router-link :to="{name: 'signin'}">
          <q-btn size="sm" flat color="white q-mx-md" label="Already a Member ?" />
          </router-link>
        </div>
      </q-form>
    </div>
  </div>
</template>

<script>
// import jwtDecode from 'jwt-decode'
export default {
  data () {
    return {
      name: '',
      email: '',
      password: '',
      documentsForVerification: null,
      accept: false,
      isPwd: true,
      isLogin: false,
      userType: "student",
    }
  },
  methods: {
    onSubmit () {
      if (this.accept !== true) {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'fas fa-exclamation-triangle',
          message: 'You need to accept the license and terms first'
        })
      } else {
        this.isLogin = true
        let payload = new FormData()
        payload.append('name', this.name)
        payload.append('email', this.email)
        payload.append('password', this.password)
        console.log(this.documentsForVerification)
        if(this.documentsForVerification && this.documentsForVerification.length > 0) {          
          for(let i=0; i<this.documentsForVerification.length; i++) {
            payload.append('files', this.documentsForVerification[i])  
          }
        }
        if(this.userType === 'teacher') {
          payload.append('isTeacher', true)
        }
        if(this.userType ===  'student') {
          payload.append('isStudent', true)
        }        
        this.$axios.post('/api/v1/signup', payload)
          .then(response => {
            this.$router.push({ name: 'signin' })
            // this.$q.sessionStorage.set('token', response.data.token)
            // // const decodedUser = jwtDecode(response.data.token)
            // this.$q.notify({
            //   color: 'green-4',
            //   textColor: 'white',
            //   icon: 'fas fa-check-circle',
            //   message: `Welcome ${response.data.name}`
            // })
            // setTimeout(() => {
            //   this.isLogin = false
            //   this.$router.push({ name: 'feed' })
            // }, 1000)
          })
          .catch(error => {
            let mssg = error.response.data.data.map(error => error.msg + ", ")
            this.$q.notify({
              color: 'red-5',
              textColor: 'white',
              icon: 'fas fa-exclamation-triangle',
              message: mssg
            })
            // this.isLogin = false
          })
          .finally(() => {
            this.isLogin = false
          })
      }
    },

    onReset () {
      this.name = null
      this.age = null
      this.accept = false
    }
  }
}
</script>

<template>
  <div
    class="col-12 col-sm-6 col-md-4 column self-stretch items-center"
    :style="{ flexDirection: 'row', background: 'linear-gradient(150deg,#00bcd4,#009688,#673ab7)' }"
  >
    <div class="q-pa-xl" :style="{ width: 100 + '%' }">
      <q-form dense @submit="onSubmit" @reset="onReset" >
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
        <q-toggle v-model="accept" label="I accept the license and terms" />

        <div>
          <q-btn size="sm" label="Login"  :loading="isLogin"  type="submit" color="primary">
             <template v-slot:loading>
                <q-spinner-facebook />
              </template>
          </q-btn>
          <router-link :to="{name: 'register'}">
             <q-btn size="sm" flat color="white q-mx-md" label="Not a Member ?" />
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
      email: '',
      password: '',
      accept: false,
      isPwd: true,
      isLogin: false
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
        this.$axios.post('/api/v1/login', {
          email: this.email,
          password: this.password
        })
          .then(response => {
            let {token, ...authUserDetail} = response.data
            this.$q.sessionStorage.set('token', token)            
            this.$q.sessionStorage.set('authUser',authUserDetail)
            // const decodedUser = jwtDecode(response.data.token)
            this.$q.notify({
              color: 'green-4',
              textColor: 'white',
              icon: 'fas fa-check-circle',
              message: `Welcome ${response.data.name}`
            })
            setTimeout(() => {
              this.isLogin = false
              this.$router.push({ name: 'feed-posts' })
            }, 1000)
          })
          .catch(error => {
            if(error.response.status === 401) {
              this.$q.notify({
                color: 'red-5',
                textColor: 'white',
                icon: 'fas fa-exclamation-triangle',
                message: error.response.data.message
              })
            }
            let mssg = error.response.data.data.map(error => error.msg + ", ")
            this.$q.notify({
              color: 'red-5',
              textColor: 'white',
              icon: 'fas fa-exclamation-triangle',
              message: mssg
            })
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

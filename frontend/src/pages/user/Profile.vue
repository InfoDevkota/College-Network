<template>
    <q-page>
        user Profile {{id}}
        {{userDetail}}
    </q-page>
</template>
<script>
export default {
  name: 'user Profile',
  props: ['id'],
  data () {
    return {
      userDetail: ''
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

<template>
  <q-page padding>
    <div class="row justify-center">
      <div class="col-12 col-md-6">
        <q-banner v-if="errors.responseError || errors.requestError || errors.clientError" dense inline-actions class="text-white bg-red">
          <div v-if="Array.isArray(errors.responseError) && errors.responseError.length > 0">
            Please fix following errors - 
            <ul>
              <li v-for="(error, index) in errors.responseError" :key="index">
                <b>{{error.param}}</b> - {{error.msg}}
              </li>
            </ul>
          </div>
          <div v-else v-html="errors.responseError">
          </div>
          <div v-if="errors.requestError">
            {{errors.requestError}}
          </div>
          <div v-if="errors.clientError">
            {{errors.clientError}}
          </div>
        </q-banner>
        <q-card class="caption" style="margin-bottom: 10px" bordered flat>
          <q-list bordered>
            <q-item>
              <q-item-section avatar>
                <q-avatar>
                  <img :src="$axios.defaults.baseURL + getAuthUser.profileImage" />
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <router-link
                  tag="span"
                  class="cursor-pointer"
                  :to="{
                    name: 'user-profile',
                    params: { id: getAuthUser.userId }
                  }"
                >
                  <q-item-label class="text-subtitle2">
                    {{getAuthUser.name}}
                  </q-item-label>
                </router-link>
              </q-item-section>

              <q-item-section side> </q-item-section>
            </q-item>
            <q-item class="q-pa-md">
              <q-item-section>
                <q-editor
                  v-model="post"
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
            <q-separator />
             <q-item class="q-pa-xs">
              <q-item-section>
                  <div>
                    <file-upload v-model="fileList">
                      <div slot="activator">
                        <div size="150px" class="grey lighten-3 mb-3">
                          <q-chip clickable square style="background: rgba(0, 0, 0, 0) linear-gradient(150deg, rgb(0, 188, 212), rgb(0, 150, 136), rgb(103, 58, 183)) repeat scroll 0% 0%;" class="shadow-2" text-color="white" icon="image" label="Images/Pics" />
                          <i>Select image files to upload..</i>
                        </div>
                        <!-- <pre>{{fileList}}</pre>               -->
                      </div>
                    </file-upload>
                  </div>
              </q-item-section>
            </q-item>
            <q-separator v-if="fileList.hasOwnProperty('files') && fileList.files.length > 0" />
             <q-item class="q-pa-xs" v-if="fileList.hasOwnProperty('files') && fileList.files.length > 0">
              <q-item-section>
                  <div>
                    <q-chip removable v-for="(file, index) in fileList.files" :key="index" class="shadow-2" size="sm" text-color="white"  @remove="deleteFile(index)" color="primary">
                      <q-avatar>
                        <img :src="getImage(file)">>
                      </q-avatar>
                      {{file.name}}
                    </q-chip>
                    <!-- <q-list dense bordered separator>
                      <q-item-label header>Choosen Files <q-btn size="xs" unelevated rounded color="red" @click="deleteFiles()" label="Remove All" /></q-item-label>
                          <q-item v-for="(file, index) in fileList.files" :key="index">
                            <q-item-section avatar>
                              <q-avatar>
                                <img :src="getImage(file)">
                              </q-avatar>
                            </q-item-section>
                            <q-item-section>
                              <q-item-label>{{file.name}}</q-item-label>
                              <q-item-label caption lines="1">{{file.type}}</q-item-label>
                            </q-item-section>
                            <q-item-section side >
                              <q-btn size="xs" unelevated round color="red" @click="deleteFile(index)" icon="delete" />
                            </q-item-section>
                          </q-item>
                        </q-list>      -->
                  </div>
              </q-item-section>
            </q-item>
            <q-separator />
            <q-checkbox v-model="isPublic" label="Make this post as public" />
            <q-separator />
             <q-item class="q-pa-xs">
                <q-chip clickable @click="handleCreatePost" square style="background: rgba(0, 0, 0, 0) linear-gradient(150deg, rgb(0, 188, 212), rgb(0, 150, 136), rgb(103, 58, 183)) repeat scroll 0% 0%;" class="shadow-2" text-color="white" icon="post_add" label="Post" />
                <q-chip clickable @click="$router.push({ name: 'feed-posts' })" square class="shadow-2" color="red" text-color="white" icon="cancel" label="Cancel" />
             </q-item>
          </q-list>
        </q-card>
      </div>
    </div>
  </q-page>
</template>
<script>
import jwtDecode from 'jwt-decode'
import socket from '../../util/socket/socket'
import FileUpload from '../../components/FileUpload'
export default {
  name: "post-create",
  components: {
    FileUpload: FileUpload
  },
  watch:{
    fileList: {
      handler: function(files) {
        console.log(files)
      },
      deep: true
    }
  },
  computed: {
    getAuthUser() {
      return this.$q.sessionStorage.getItem("authUser");
    },
  },
  data() {
    return {
      errors: {
        responseError: null,
        requestError: null,
        clientError: null
      },
      fileList: {},
      post: "",
      isPublic: false,
      uploadFieldName: 'file',
      maxSize: 1024
    };
  },
  methods: {
    removeUploadFile() {

    },
    getImage(file) {
      return URL.createObjectURL(file)
    },
    deleteFile(index) {
      this.fileList.files.splice(index, 1);
    },
    deleteFiles() {
      this.fileList.files = []
    },
    clearErrors (errors) {
      errors.responseError = null
      errors.requestError = null
      errors.clientError = null
    },
    async handleCreatePost() {
      try {
        this.clearErrors(this.errors)
        let payload = new FormData()
        if(this.fileList.hasOwnProperty("files") && this.fileList.files.length > 0) {
          
          for(let i=0; i<this.fileList.files.length; i++) {
            payload.append('files', this.fileList.files[i])  
          }
        }
        payload.append('content', this.post )
        payload.append('isPublic', this.isPublic)
        const {data, status} = await this.$axios.post('/api/v1/createPost', payload)
        if(status === 201) {
          this.$q.notify({
            color: 'teal',
            icon: 'post_add',
            position: 'bottom-right',
            message: 'New Post Created.'
          })
          socket.emit('createFeed', {
            user: this.getAuthUser,
            message: "added new post."
          })
          this.$router.push({ name: "feed-posts" })
        } else {
          console.log(data)
        }
      } catch (error) {
        if(error.response) {
          if(error.response.data.hasOwnProperty("errors")) {
            this.$q.notify({
            color: 'negative',
            icon: 'report_problem',
            position: 'top-right',
            message: 'One or more fields have errors.'
          })
            this.errors.responseError = error.response.data.errors
          } else {
            this.errors.responseError = error.response.data.message
          }
        } else if(error.request) {
            this.errors.requestError = error.request;
        } else {
          this.errors.clientError = error.message
        }
      } finally {
      }
      
    }
  }
};
</script>

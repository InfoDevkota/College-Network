<template>
  <q-infinite-scroll @load="onLoad" :offset="250">
    <q-banner
      v-if="errors.responseError || errors.requestError || errors.clientError"
      dense
      inline-actions
      class="text-white bg-red"
    >
      <div v-if="Array.isArray(errors.responseError) && errors.responseError.length > 0">
        Please fix following errors -
        <ul>
          <li v-for="(error, index) in errors.responseError" :key="index">
            <b>{{ error.param }}</b>
            - {{ error.msg }}
          </li>
        </ul>
      </div>
      <div v-else v-html="errors.responseError">
          </div>
      <div v-if="errors.requestError">{{ errors.requestError }}</div>
      <div v-if="errors.clientError">{{ errors.clientError }}</div>
    </q-banner>
    <q-card class="caption" style="margin-bottom: 10px" bordered flat>
      <q-card-section class="q-pa-none">
        <file-upload v-if="getCurrentUser.isProfileUpdated" v-model="noteList">
          <div slot="activator">
            <q-chip
              clickable
              square
              style="background: rgba(0, 0, 0, 0) linear-gradient(150deg, rgb(0, 188, 212), rgb(0, 150, 136), rgb(103, 58, 183)) repeat scroll 0% 0%;"
              class="shadow-2"
              text-color="white"
              icon="cloud_upload"
              label="Select Files ......."
            />
          </div>
        </file-upload>
        <q-banner v-else inline-actions class="text-white" style="background: rgba(0, 0, 0, 0) linear-gradient(150deg, rgb(0, 188, 212), rgb(0, 150, 136), rgb(103, 58, 183)) repeat scroll 0% 0%;">
          You have to update your profile first.
          <template v-slot:action>
            <q-btn outline size="sm" color="white" :to="{name: 'profile-update',params: {id: getCurrentUser.userId}}" label="Take me to profile" />
          </template>
        </q-banner>
      </q-card-section>
      <q-card-section v-show="noteList.files">
        <div>
          <label for class="caption">Selected files:</label>
          <q-chip
            removable
            square
            v-for="(file, index) in noteList.files"
            :key="index"
            class="shadow-2"
            size="sm"
            text-color="white"
            @remove="deleteFile(index)"
            color="primary"
            >{{ file.name }}</q-chip
          >
        </div>
        <div>
          <q-input
            outlined
            class="q-mt-sm"
            dense
            v-model="noteTitle"
            label="Title *"
            emit-value
            map-options
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'Please type something']"
          />
        </div>
        <q-chip
          clickable
          square
          @click="hanldeCreateNewNote"
          style="background: rgba(0, 0, 0, 0) linear-gradient(150deg, rgb(0, 188, 212), rgb(0, 150, 136), rgb(103, 58, 183)) repeat scroll 0% 0%;"
          class="shadow-2"
          text-color="white"
          icon="note"
          label="Save"
        />
      </q-card-section>
    </q-card>
    
    <q-card
          v-for="(item, index) in items"
          :key="index"
          class="caption"
          style="margin-bottom: 10px"
        >
          <q-card-section class="q-pa-none">
            <q-list>
              <q-item>
                <q-item-section avatar>
                  <q-avatar>
                    <img
                      :src="
                        $axios.defaults.baseURL + item.uploadedBy.profileImage
                      "
                    />
                  </q-avatar> 
                </q-item-section>

                <q-item-section>
                  <router-link
                    tag="span"
                    class="cursor-pointer"
                    :to="{
                      name: 'user-profile',
                      params: { id: item.uploadedBy._id }
                    }"
                  >
                    <q-item-label class="text-subtitle2">
                      {{ item.uploadedBy.name }}
                    </q-item-label>
                  </router-link>
                  <q-item-label caption lines="1">
                    date
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
            <q-list>
              <q-item>
                {{ item.title }}
              </q-item>
            </q-list>
            <q-list>
              <q-item-label header class="q-py-xs">Notes</q-item-label>

              <q-item
                border
                clickable
                @click="handleDownloadNote(file)"
                v-for="(file, index) in item.files"
                :key="index"
              >
                <q-item-section avatar>
                  <q-avatar
                    icon="cloud_download"
                    color="primary"
                    text-color="white"
                  />
                </q-item-section>

                <q-item-section>
                  <q-item-label lines="1">{{
                    file.substring(file.lastIndexOf("/") + 1)
                  }}</q-item-label>
                  <q-item-label caption>date</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
    <template v-slot:loading>
      <div class="row justify-center q-my-md">
        <q-spinner-dots
          color="primary"
          size="40px"
          v-if="items.length < post_params.count"
        />
        <span v-else class="block text-weight-thin">
          <i>You reached the end of notes.</i>
        </span>
      </div>
    </template>
  </q-infinite-scroll>
</template>
<script>
import jwtDecode from "jwt-decode";
import moment from "moment";

const offline = [
  {
    id: 5,
    name: "Brunhilde Panswick",
    email: "bpanswick4@csmonitor.com",
    avatar: "avatar2.jpg"
  }
];
export default {
  data() {
    return {
      errors: {
        responseError: null,
        requestError: null,
        clientError: null
      },
      noteTitle: "",
      noteList: {},
      image: "",
      post_params: {
        page: 1,
        count: 1,
        size: 5
      },
      definitions: {
        save: {
          tip: "Save your work",
          icon: "save",
          label: "Save",
          handler: this.insertImg
        },
        // bold: { label: 'Bold', icon: null, tip: 'My bold tooltip' },
        insert_img: {
          label: "image",
          icon: "photo",
          handler: this.insertImg // handler will call insertImg() method
        }
      },
      items: [],
      offline,
      drawerLeft: true,
      createPostDialog: false,
      editor: "",
      isEdit: false,
      currentPostId: ""
    };
  },
  components: {
    FileUpload: () => import("../../components/FileUpload")
  },
  filters: {
    fromNow: function(date) {
      return moment(date)
        .startOf("hour")
        .fromNow();
    }
  },
  computed: {
    getCurrentUser() {
      return jwtDecode(this.$q.sessionStorage.getItem("token"));
    }
  },
  created() {},
  methods: {
    resetNoteForm() {
      this.noteTitle = ""
      this.noteList = {}
    },
    handleDownloadNote(file) {
      //   var blob = new Blob([data], {type: 'text/csv'});
      // if(window.navigator.msSaveOrOpenBlob) {
      //     window.navigator.msSaveBlob(blob, filename);
      // }
      // else{
      //     var elem = window.document.createElement('a');
      //     elem.href = window.URL.createObjectURL(blob);
      //     elem.download = filename;
      //     document.body.appendChild(elem);
      //     elem.click();
      //     document.body.removeChild(elem);
      // }
      // const blob = new Blob([file])
      const link = document.createElement("a");
      // link.href = URL.createObjectURL(blob)
      link.href = file;
      link.setAttribute("target", "_blank");
      link.setAttribute("download", file.substring(file.lastIndexOf("/") + 1));
      link.click();
      URL.revokeObjectURL(link.href);
    },
    clearErrors(errors) {
      errors.responseError = null;
      errors.requestError = null;
      errors.clientError = null;
    },
    async hanldeCreateNewNote() {
      try {
        this.clearErrors(this.errors);
        let payload = new FormData();
        if (
          this.noteList.hasOwnProperty("files") &&
          this.noteList.files.length > 0
        ) {
          for (let i = 0; i < this.noteList.files.length; i++) {
            payload.append("files", this.noteList.files[i]);
          }
        }
        payload.append("title", this.noteTitle);
        payload.append("description", this.noteTitle);
        const { data, status } = await this.$axios.post(
          "/api/v1/createNote",
          payload
        );
        if (status === 201) {
          this.$q.notify({
            color: "teal",
            icon: "post_add",
            position: "bottom-right",
            message: "New Note Uploaded."
          });
          this.resetNoteForm()
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
            this.errors.responseError = error.response.data.message
          }
        } else if (error.request) {
          this.errors.requestError = error.request;
        } else {
          this.errors.clientError = error.message;
        }
      } finally {
      }
    },
    deleteFile(index) {
      this.noteList.files.splice(index, 1);
    },
    insertImg() {
      // insertImg method
      const post = this.post;
      // create an input file element to open file dialog
      const input = document.createElement("input");
      input.type = "file";
      input.accept = ".png, .jpg"; // file extensions allowed
      let file;
      input.onchange = _ => {
        const files = Array.from(input.files);
        file = files[0];

        // lets load the file as dataUrl
        const reader = new FileReader();
        let dataUrl = "";
        reader.onloadend = function() {
          dataUrl = reader.result;
          // append result to the body of your post
          post.body += '<div><img src="' + dataUrl + '" /></div>';
        };
        reader.readAsDataURL(file);
      };
      input.click();
    },
    onLoad(index, done) {
      if (this.items.length < this.post_params.count) {
        this.post_params.page = index;
        this.$axios
          .get("/api/v1/notes", { params: this.post_params })
          .then(response => {
            this.post_params.count = response.data.totalNotes;
            var temp = response.data.notes.map(post => {
              return {
                id: post._id,
                title: post.title,
                files: post.files.map(
                  file => this.$axios.defaults.baseURL + file
                ),
                uploadedBy: post.uploadedby
                // postedBy: {
                //   id: post.postedBy._id,
                //   name: post.postedBy.name,
                //   profileImage: post.postedBy.profileImage
                // },
                // date: post.updatedAt,
                // liked: post.liked,
                // totalComments: post.totalComments,
                // totalLike: post.totalLike
              };
            });
            console.log(temp);
            this.items.push(...temp);
            done();
          });
      }
    }
  }
};
</script>

<template>
  <div>
    <!-- slot for parent component to activate the file changer -->
    <div @click="launchFilePicker()">
      <slot name="activator"></slot>
    </div>
    <!-- image input: style is set to hidden and assigned a ref so that it can be triggered -->
    <input type="file"
       ref="file"
       :name="uploadFieldName"
       :multiple="multiple"
       @change="onFileChange(
          $event.target.name, $event.target.files)"
       style="display:none">
    <!-- error dialog displays any potential error messages -->
    <!-- {{errorText}} -->
    <!-- <v-dialog v-model="errorDialog" max-width="300">
      <v-card>
        <v-card-text class="subheading">{{errorText}}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="errorDialog = false" flat>Got it!</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog> -->
  </div>
</template>

<script>
  export default {
    name: 'image-input',
    data: ()=> ({
      errorDialog: null,
      errorText: '',
      uploadFieldName: 'file',
      maxSize: 1024,
      files: [],
      formData: new FormData(),
      imageURLs: []
    }),
    props: {
    // Use "value" to enable using v-model
      value: Array,
      multiple: Boolean
    },
    methods: {
      launchFilePicker(){
        this.$refs.file.click();
      },
      onFileChange(fieldName, files) {
        const { maxSize } = this
        let imageFile = files[0]
        if (files.length>0) {
            for(let i=0; i<files.length; i++) {
                if(!this.multiple) {
                  this.files = []
                }
                this.files.push(files[i])   
                let size = files[i].size / maxSize / maxSize
                if (!files[i].type.match('image.*')) {
                   this.errorText = 'Please choose an image file' 
                } else if (size>1) {
                    this.errorText = 'Your file is too big! Please select an image under 1MB'
                } else {
                    // this.imageURLs.push(URL.createObjectURL(file[i]))
                    // this.formData.append('files[' + i + ']', file[i])                    
                }
            }
        }
        // Emit the FormData and image URL to the parent component
        this.$emit('input', { files: this.files })
        // this.$emit('input', { formData: this.formData, imageURLs: this.imageURLs })

        // if (file.length>0) {
        //   let size = imageFile.size / maxSize / maxSize
        //   if (!imageFile.type.match('image.*')) {
        //     // check whether the upload is an image
        //     this.errorDialog = true
        //     this.errorText = 'Please choose an image file'
        //   } else if (size>1) {
        //     // check whether the size is greater than the size limit
        //     this.errorDialog = true
        //     this.errorText = 'Your file is too big! Please select an image under 1MB'
        //   } else {
        //     // Append file into FormData and turn file into image URL
        //     let formData = new FormData()
        //     let imageURL = URL.createObjectURL(imageFile)
        //     formData.append(fieldName, imageFile)
        //     // Emit the FormData and image URL to the parent component
        //     this.$emit('input', { formData, imageURL })
        //   }
        // }
      }
    }
  }
</script>
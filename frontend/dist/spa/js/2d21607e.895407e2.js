(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["2d21607e"],{c171:function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("q-page",{attrs:{padding:""}},[e._v("\n  "+e._s(e.userDetail)+"\n  "),a("q-form",{on:{submit:e.onSubmit,reset:e.onReset}},[a("div",{staticClass:"row q-col-gutter-x-md q-col-gutter-y-md"},[a("div",{staticClass:"col-md-12"},[a("q-card",[a("q-card-section",[a("q-avatar",{attrs:{size:"118px"}},[e.userDetail.profileImage?a("img",{attrs:{src:e.userDetail.profileImage}}):a("q-icon",{attrs:{name:"fas fa-image"}})],1)],1),a("q-card-section",[a("q-uploader",{staticStyle:{"max-width":"300px"},attrs:{"field-name":"image",factory:e.factoryFn,"no-thumbnails":""}})],1)],1)],1),a("div",{staticClass:"col-xs-12"},[a("div",{staticClass:"row q-col-gutter-x-md q-col-gutter-y-md"},[a("div",{staticClass:"col-xs-12 col-md-6"},[a("q-card",{staticClass:"my-card"},[a("q-item",[a("q-item-section",{attrs:{avatar:""}},[a("q-avatar",[a("q-icon",{attrs:{name:"fas fa-university"}})],1)],1),a("q-item-section",[a("q-item-label",[e._v("Current Affiliation")])],1)],1),a("q-separator"),a("div",{staticClass:"row q-pa-md"},[a("div",{staticClass:"col-xs-12"},[a("div",{staticClass:"row q-col-gutter-x-md q-col-gutter-y-md"},[a("div",{staticClass:"col-md-6"},[a("q-select",{attrs:{filled:"",options:e.options.college,label:"Your College *",hint:"College is required","emit-value":"","map-options":"","lazy-rules":"",rules:[function(e){return e&&e.length>0||"Please type something"}]},model:{value:e.userDetail.college,callback:function(t){e.$set(e.userDetail,"college",t)},expression:"userDetail.college"}})],1),a("div",{staticClass:"col-md-6"},[a("q-select",{attrs:{filled:"",options:e.options.departments,label:"Your Department *",hint:"Department is required","emit-value":"","map-options":"","lazy-rules":"",rules:[function(e){return e&&e.length>0||"Please type something"}]},model:{value:e.userDetail.department,callback:function(t){e.$set(e.userDetail,"department",t)},expression:"userDetail.department"}})],1),a("div",{staticClass:"col-md-6"},[a("q-select",{attrs:{filled:"",options:e.options.graduation_on,label:"Graduation On *",hint:"Graduation On is required","emit-value":"","map-options":"","lazy-rules":"",rules:[function(e){return e&&e.length>0||"Please type something"}]},model:{value:e.userDetail.graduationOn,callback:function(t){e.$set(e.userDetail,"graduationOn",t)},expression:"userDetail.graduationOn"}})],1),a("div",{staticClass:"col-md-6"},[a("q-select",{attrs:{filled:"",options:e.options.semesters,label:"Semester On *",hint:"Semester On is required","emit-value":"","map-options":"","lazy-rules":"",rules:[function(e){return e&&e.length>0||"Please type something"}]},model:{value:e.userDetail.semester,callback:function(t){e.$set(e.userDetail,"semester",t)},expression:"userDetail.semester"}})],1),a("div",{staticClass:"col-md-6"},[a("q-select",{attrs:{filled:"",options:e.options.sections,label:"Section On *",hint:"Section On is required","emit-value":"","map-options":"","lazy-rules":"",rules:[function(e){return e&&e.length>0||"Please type something"}]},model:{value:e.userDetail.section,callback:function(t){e.$set(e.userDetail,"section",t)},expression:"userDetail.section"}})],1)])])])],1)],1),a("div",{staticClass:"col-xs-12 col-md-6"},[a("q-card",{staticClass:"my-card"},[a("q-item",[a("q-item-section",{attrs:{avatar:""}},[a("q-avatar",[a("q-icon",{attrs:{name:"fas fa-university"}})],1)],1),a("q-item-section",[a("q-item-label",[e._v("About")])],1)],1),a("q-separator"),a("div",{staticClass:"row q-pa-md"},[a("div",{staticClass:"col-xs-12"},[a("div",{staticClass:"row q-col-gutter-x-md q-col-gutter-y-md"},[a("div",{staticClass:"col-md-6"},[a("q-input",{attrs:{label:"Your D.O.B *",filled:"",mask:"date",rules:["date"]},scopedSlots:e._u([{key:"append",fn:function(){return[a("q-icon",{staticClass:"cursor-pointer",attrs:{name:"event"}},[a("q-popup-proxy",{ref:"qDateProxy",attrs:{"transition-show":"scale","transition-hide":"scale"}},[a("q-date",{on:{input:function(){return e.$refs.qDateProxy.hide()}},model:{value:e.userDetail.bornOn,callback:function(t){e.$set(e.userDetail,"bornOn",t)},expression:"userDetail.bornOn"}})],1)],1)]},proxy:!0}]),model:{value:e.userDetail.bornOn,callback:function(t){e.$set(e.userDetail,"bornOn",t)},expression:"userDetail.bornOn "}})],1),a("div",{staticClass:"col-md-6"},[a("q-select",{attrs:{filled:"",options:e.options.gender,label:"Your Gender *",hint:"Gender is required","emit-value":"","map-options":"","lazy-rules":"",rules:[function(e){return e&&e.length>0||"Please type something"}]},model:{value:e.userDetail.gender,callback:function(t){e.$set(e.userDetail,"gender",t)},expression:"userDetail.gender"}})],1),a("div",{staticClass:"col-md-12"},[a("q-input",{attrs:{filled:"",label:"Address *",hint:"Address is required","emit-value":"","map-options":"","lazy-rules":"",rules:[function(e){return e&&e.length>0||"Please type something"}]},model:{value:e.userDetail.livesIn,callback:function(t){e.$set(e.userDetail,"livesIn",t)},expression:"userDetail.livesIn"}})],1),a("div",{staticClass:"col-md-12"},[a("q-input",{attrs:{label:"Contact Number *",filled:"",type:"text","lazy-rules":"",rules:[function(e){return e&&e.length>0||"Please type something"}],hint:"Telephone number"},model:{value:e.userDetail.phone,callback:function(t){e.$set(e.userDetail,"phone",t)},expression:"userDetail.phone"}})],1)])])])],1)],1)])]),a("div",{staticClass:"col-xs-12"},[a("q-card",[a("q-card-section",[a("q-toggle",{attrs:{label:"I accept above details are genuine."},model:{value:e.accept,callback:function(t){e.accept=t},expression:"accept"}}),a("div",[a("q-btn",{attrs:{label:"Update",type:"submit",color:"primary"}}),a("q-btn",{staticClass:"q-ml-sm",attrs:{label:"Reset",type:"reset",color:"primary",flat:""}})],1)],1)],1)],1)])])],1)},i=[],l=(a("7f7f"),{name:"profile-update",props:["id"],data:function(){return{selected_file:"",name:"",email:"",check_if_document_upload:!1,accept:!1,userDetail:{id:"",profileImage:"",name:"",email:"",college:"",semester:"",section:"",department:"",graduationOn:"",bornOn:new Date,livesIn:"",gender:"",phone:""},options:{college:[{label:"NCIT",value:"NCIT"}],gender:[{label:"Male",value:"male"},{label:"Female",value:"female"},{label:"Other",value:"Other"}],departments:[],graduation_on:[{label:"2019",value:"2019"},{label:"2020",value:"2020"},{label:"2021",value:"2021"},{label:"2022",value:"2022"}]}}},mounted:function(){var e=this;this.$axios.get("/api/v1/me").then(function(t){var a=t.data.user,s=a._id,i=a.profileImage,l=a.email,n=a.name,r=a.college,o=a.phone,u=a.department,c=a.gender,d=a.graduationOn,m=a.livesIn,p=a.section,f=a.bornOn,v=a.semester;e.userDetail={id:s,profileImage:e.$axios.defaults.baseURL+i,email:l,name:n,college:r,department:u,gender:c,graduationOn:d,bornOn:f,livesIn:m,section:p,semester:v,phone:o}}),this.$axios.get("/api/v1/addInfo").then(function(t){var a=t.data,s=a.departments,i=a.sections,l=a.semesters;e.options.departments=s.map(function(e){return{label:e.name,value:e._id}}),e.options.sections=i.map(function(e){return{label:e.name,value:e._id}}),e.options.semesters=l.map(function(e){return{label:e.name,value:e._id}})})},methods:{file_selected:function(e){console.log(e),this.selected_file=e[0],this.check_if_document_upload=!0},uploadFile:function(){var e=this,t=new FormData;console.log(this.selected_file),t.append("image",this.selected_file),this.$axios.put("/api/v1/profilePic",{content:this.editor}).then(function(t){e.userDetail.user.profileImage=e.$axios.defaults.baseURL+t.data.user.profileImage})},onSubmit:function(){var e=this;this.$axios.put("/api/v1/me",{name:this.userDetail.name,email:this.userDetail.email,college:this.userDetail.college,semester:this.userDetail.semester,section:this.userDetail.section,department:this.userDetail.department,graduationOn:this.userDetail.graduationOn,bornOn:this.userDetail.bornOn,livesIn:this.userDetail.livesIn,phone:this.userDetail.phone,gender:this.userDetail.gender}).then(function(t){e.$router.push({name:"user-profile",params:{id:t.data.user._id}}),console.log(t)})},factoryFn:function(e){var t=this,a=new FormData;console.log(this.selected_file),a.append("image",e[0]),this.$axios.put("/api/v1/profilePic",a).then(function(e){t.userDetail.profileImage=t.$axios.defaults.baseURL+e.data.user.profileImage})}}}),n=l,r=a("2877"),o=Object(r["a"])(n,s,i,!1,null,null,null);t["default"]=o.exports}}]);
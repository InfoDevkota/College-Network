(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["2d0deed0"],{8871:function(t,e,n){"use strict";n.r(e);var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"col-12 col-sm-6 col-md-4 column self-stretch items-center",style:{flexDirection:"row",background:"linear-gradient(150deg,#00bcd4,#009688,#673ab7)"}},[n("div",{staticClass:"q-pa-xl",style:{width:"100%"}},[n("q-form",{on:{submit:t.onSubmit,reset:t.onReset}},[n("q-input",{attrs:{dark:"",disable:t.isLogin,rounded:"",standout:"","bottom-slots":"",label:"Name",type:"text",counter:""},scopedSlots:t._u([{key:"prepend",fn:function(){return[n("q-icon",{attrs:{name:"person"}})]},proxy:!0},{key:"append",fn:function(){return[n("q-icon",{staticClass:"cursor-pointer",attrs:{name:"close"},on:{click:function(e){t.text=""}}})]},proxy:!0}]),model:{value:t.name,callback:function(e){t.name=e},expression:"name"}}),n("q-input",{attrs:{dark:"",disable:t.isLogin,rounded:"",standout:"","bottom-slots":"",label:"Email",type:"email",counter:""},scopedSlots:t._u([{key:"prepend",fn:function(){return[n("q-icon",{attrs:{name:"email"}})]},proxy:!0},{key:"append",fn:function(){return[n("q-icon",{staticClass:"cursor-pointer",attrs:{name:"close"},on:{click:function(e){t.text=""}}})]},proxy:!0}]),model:{value:t.email,callback:function(e){t.email=e},expression:"email"}}),n("q-input",{staticStyle:{"bg-color":"'black'"},attrs:{dark:"",rounded:"",disable:t.isLogin,standout:"",label:"password",type:t.isPwd?"password":"text",counter:""},scopedSlots:t._u([{key:"prepend",fn:function(){return[n("q-icon",{attrs:{name:"lock"}})]},proxy:!0},{key:"append",fn:function(){return[n("q-icon",{staticClass:"cursor-pointer",attrs:{name:t.isPwd?"visibility_off":"visibility"},on:{click:function(e){t.isPwd=!t.isPwd}}})]},proxy:!0}]),model:{value:t.password,callback:function(e){t.password=e},expression:"password"}}),n("q-toggle",{attrs:{label:"I accept the license and terms"},model:{value:t.accept,callback:function(e){t.accept=e},expression:"accept"}}),n("div",[n("q-btn",{attrs:{label:"Register",loading:t.isLogin,type:"submit",color:"primary"},scopedSlots:t._u([{key:"loading",fn:function(){return[n("q-spinner-facebook")]},proxy:!0}])}),n("router-link",{attrs:{to:{name:"signin"}}},[n("q-btn",{attrs:{flat:"",color:"white q-mx-md",label:"Already a Member ?"}})],1)],1)],1)],1)])},a=[],s=(n("7f7f"),{data:function(){return{name:"",email:"",password:"",accept:!1,isPwd:!0,isLogin:!1}},methods:{onSubmit:function(){var t=this;!0!==this.accept?this.$q.notify({color:"red-5",textColor:"white",icon:"fas fa-exclamation-triangle",message:"You need to accept the license and terms first"}):(this.isLogin=!0,this.$axios.post("/api/v1/signup",{name:this.name,email:this.email,password:this.password}).then(function(e){t.$router.push({name:"signin"})}).catch(function(e){var n="";e.response.data.data.map(function(t){n=n+" "+t.param}),t.$q.notify({color:"red-5",textColor:"white",icon:"fas fa-exclamation-triangle",message:n+" is required."}),t.isLogin=!1}))},onReset:function(){this.name=null,this.age=null,this.accept=!1}}}),i=s,r=n("2877"),c=Object(r["a"])(i,o,a,!1,null,null,null);e["default"]=c.exports}}]);
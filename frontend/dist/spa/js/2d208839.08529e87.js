(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["2d208839"],{a4b2:function(t,a,e){"use strict";e.r(a);var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("q-layout",{staticClass:"shadow-2 rounded-borders",attrs:{view:"lHh Lpr fFr"}},[e("q-header",[e("q-toolbar",[t.$q.screen.lt.md?e("q-btn",{staticClass:"q-mr-sm",attrs:{flat:"",rounded:"",dense:"",icon:"menu"},on:{click:function(a){t.drawer=!t.drawer}}}):t._e(),e("q-avatar",[e("img",{attrs:{src:"https://cdn.quasar.dev/logo/svg/quasar-logo.svg"}})]),e("q-input",{staticClass:"q-ml-md",attrs:{dark:"",dense:"",rounded:"",standout:"","input-class":"text-right"},scopedSlots:t._u([{key:"append",fn:function(){return[""===t.text?e("q-icon",{attrs:{name:"search"}}):e("q-icon",{staticClass:"cursor-pointer",attrs:{name:"clear"},on:{click:function(a){t.text=""}}})]},proxy:!0}]),model:{value:t.text,callback:function(a){t.text=a},expression:"text"}}),e("q-space"),e("q-chip",[e("q-avatar",[e("img",{attrs:{src:"https://cdn.quasar.dev/img/boy-avatar.png"}})]),t._v("\n        John\n      ")],1),e("q-btn",{attrs:{dense:"",round:"",flat:"",icon:"email"}},[e("q-badge",{attrs:{color:"red",floating:""}},[t._v("\n        4\n      ")])],1),e("q-btn",{attrs:{flat:"",round:"",dense:"",icon:"whatshot"},on:{click:function(a){t.leftDrawerOpen=!t.leftDrawerOpen}}}),e("q-btn",{attrs:{flat:"",round:"",dense:"",icon:"more_vert"}},[e("q-menu",{attrs:{"transition-show":"scale","transition-hide":"scale"}},[e("q-list",{staticStyle:{"min-width":"100px"}},[e("q-item",{attrs:{clickable:""}},[e("q-item-section",[t._v("Profile")])],1),e("q-item",{attrs:{clickable:""}},[e("q-item-section",[t._v("Setting")])],1),e("q-separator"),e("q-item",{attrs:{clickable:""},on:{click:function(a){return t.$router.push({name:"signin"})}}},[e("q-item-section",[t._v("Log out")])],1)],1)],1)],1)],1)],1),e("q-drawer",{attrs:{bordered:"","content-class":"bg-white"},model:{value:t.drawer,callback:function(a){t.drawer=a},expression:"drawer"}},[e("q-scroll-area",{staticStyle:{height:"calc(100% - 150px)","margin-top":"150px","border-right":"1px solid #ddd"}},[e("q-list",[e("q-item",{directives:[{name:"ripple",rawName:"v-ripple"}],attrs:{clickable:"",active:t.active}},[e("q-item-section",{attrs:{avatar:""}},[e("q-avatar",[e("img",{attrs:{src:"https://cdn.quasar.dev/img/avatar2.jpg"}})])],1),e("q-item-section",[t._v("Sagar Samal")]),e("q-item-section",{attrs:{side:""}})],1),e("q-item",{directives:[{name:"ripple",rawName:"v-ripple"}],attrs:{clickable:""}},[e("q-item-section",{attrs:{avatar:""}},[e("q-icon",{attrs:{name:"drafts"}})],1),e("q-item-section",[t._v("\n                News Feed\n              ")])],1),e("q-item",{directives:[{name:"ripple",rawName:"v-ripple"}],attrs:{clickable:""}},[e("q-item-section",{attrs:{avatar:""}},[e("q-icon",{attrs:{name:"drafts"}})],1),e("q-item-section",[t._v("\n                Chat\n              ")])],1),e("q-separator",{attrs:{spaced:""}}),e("q-item-label",{attrs:{header:""}},[t._v("Explore")]),e("q-item",{directives:[{name:"ripple",rawName:"v-ripple"}],attrs:{clickable:""}},[e("q-item-section",{attrs:{avatar:""}},[e("q-icon",{attrs:{name:"drafts"}})],1),e("q-item-section",[t._v("\n                Groups\n              ")])],1),e("q-item",{directives:[{name:"ripple",rawName:"v-ripple"}],attrs:{clickable:""}},[e("q-item-section",{attrs:{avatar:""}},[e("q-icon",{attrs:{name:"drafts"}})],1),e("q-item-section",[t._v("\n                Events\n              ")])],1)],1)],1),e("q-img",{staticClass:"absolute-top",staticStyle:{height:"150px"},attrs:{src:"https://cdn.quasar.dev/img/material.png"}},[e("div",{staticClass:"absolute-bottom bg-transparent"},[e("q-avatar",{staticClass:"q-mb-sm",attrs:{size:"56px"}},[e("img",{attrs:{src:"https://cdn.quasar.dev/img/boy-avatar.png"}})]),e("div",{staticClass:"text-weight-bold"},[t._v("Razvan Stoenescu")]),e("div",[t._v("@rstoenescu")])],1)])],1),e("q-dialog",{attrs:{seamless:"","transition-show":"flip-down",position:"bottom","transition-hide":"flip-up"},model:{value:t.seamless,callback:function(a){t.seamless=a},expression:"seamless"}},[e("q-card",{staticClass:"bg-orange text-white",staticStyle:{width:"350px"}},[e("q-card-section",{staticStyle:{padding:"0"}},[e("q-bar",[e("q-avatar",[e("img",{attrs:{src:"https://cdn.quasar.dev/img/avatar3.jpg"}})]),e("div",[t._v("Google Chrome")]),e("q-space"),e("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{dense:"",flat:"",icon:"close"}},[e("q-tooltip",{attrs:{"content-class":"bg-white text-primary"}},[t._v("Close")])],1)],1)],1),e("q-card-section",{staticClass:"scroll",staticStyle:{"max-height":"30vh"}},[e("div",[e("q-chat-message",{attrs:{name:"me",avatar:"https://cdn.quasar.dev/img/avatar3.jpg",text:["hey, how are you?"],stamp:"7 minutes ago",sent:"","bg-color":"amber-7"}}),e("q-chat-message",{attrs:{name:"Jane",avatar:"https://cdn.quasar.dev/img/avatar5.jpg",text:["doing fine, how r you?","I just feel like typing a really, really, REALY long message to annoy you..."],size:"6",stamp:"4 minutes ago","text-color":"white","bg-color":"primary"}}),e("q-chat-message",{attrs:{name:"Jane",avatar:"https://cdn.quasar.dev/img/avatar5.jpg",text:["Did it work?"],stamp:"1 minutes ago",size:"8","text-color":"white","bg-color":"primary"}})],1)]),e("q-card-section",{staticStyle:{padding:"0"}},[e("q-input",{attrs:{filled:"",autogrow:"",standout:"",dense:""},scopedSlots:t._u([{key:"append",fn:function(){return[e("q-icon",{staticClass:"cursor-pointer",attrs:{name:"close"},on:{click:function(a){t.text=""}}})]},proxy:!0}]),model:{value:t.text,callback:function(a){t.text=a},expression:"text"}})],1)],1)],1),e("q-drawer",{attrs:{overlay:"",elevated:"",behavior:"mobile",breakpoint:700,"show-if-above":"","content-class":"bg-black text-white",side:"right"},model:{value:t.leftDrawerOpen,callback:function(a){t.leftDrawerOpen=a},expression:"leftDrawerOpen"}},[e("q-scroll-area",{staticClass:"fit"},[e("q-list",{attrs:{separator:"",dark:""}},[e("q-item",[e("q-item-section",[e("q-item-label",[t._v("Friends Online (2/4)")])],1)],1),e("q-item",{attrs:{clickable:""},on:{click:function(a){t.seamless=!0}}},[e("q-item-section",{attrs:{avatar:""}},[e("q-icon",{staticClass:"text-red",staticStyle:{"font-size":"0.7em"},attrs:{name:"fas fa-circle"}})],1),e("q-item-section",[e("q-item-label",[t._v("Sagar Samal")]),e("q-item-label",{attrs:{caption:""}},[t._v("Offline")])],1),e("q-item-section",{attrs:{side:""}},[e("q-avatar",[e("img",{attrs:{src:"https://cdn.quasar.dev/img/avatar2.jpg"}})])],1)],1),e("q-item",{attrs:{clickable:""},on:{click:function(a){t.seamless=!0}}},[e("q-item-section",{attrs:{avatar:""}},[e("q-icon",{staticClass:"text-green",staticStyle:{"font-size":"0.7em"},attrs:{name:"fas fa-circle"}})],1),e("q-item-section",[e("q-item-label",[t._v("Sagar Samal")]),e("q-item-label",{attrs:{caption:""}},[t._v("Online")])],1),e("q-item-section",{attrs:{side:""}},[e("q-avatar",[e("img",{attrs:{src:"https://cdn.quasar.dev/img/avatar2.jpg"}})])],1)],1),e("q-separator",{attrs:{dark:""}})],1)],1)],1),e("q-page-container",{staticStyle:{"background-color":"#e9ebee"}},[e("div",{staticClass:"row"},[e("div",{staticClass:"col-xs-12 col-md-9"},[e("router-view")],1)])])],1)},r=[],i={data:function(){return{leftDrawerOpen:!0,seamless:!1,search:"",drawer:!0,lazy:[{label:"Node 1",children:[{label:"Node 1.1",lazy:!0},{label:"Node 1.2",lazy:!0}]},{label:"Node 2",lazy:!0},{label:"Lazy load empty",lazy:!0},{label:"Node is not expandable",expandable:!1,children:[{label:"Some node"}]}]}},methods:{onLazyLoad:function(t){var a=t.node,e=t.key,s=t.done;t.fail;setTimeout(function(){if(e.indexOf("Lazy load empty")>-1)s([]);else{var t=a.label;s([{label:"".concat(t,".1")},{label:"".concat(t,".2"),lazy:!0},{label:"".concat(t,".3"),children:[{label:"".concat(t,".3.1"),lazy:!0},{label:"".concat(t,".3.2"),lazy:!0}]}])}},1e3)}}},n=i,l=e("2877"),o=Object(l["a"])(n,s,r,!1,null,null,null);a["default"]=o.exports}}]);
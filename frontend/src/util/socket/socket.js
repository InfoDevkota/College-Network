import io from 'socket.io-client'
import { SessionStorage } from 'quasar'
import vue from 'vue'
// const socketIO = io(vue.prototype.$axios.defaults.baseURL + '?token=' + SessionStorage.getItem('token'),
//   {
//     path: '/api/v1/socket',
//     transport: ['websocket']
//   }
// )
const socketIO = io(vue.prototype.$axios.defaults.baseURL)
export default socketIO

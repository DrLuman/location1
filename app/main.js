import Vue from 'nativescript-vue'
import App from './components/App'
import VueDevtools from 'nativescript-vue-devtools'
//import geolocation from '../node_modules/nativescript-geolocation'
//import Moment from '../node_modules/vue-moment'
// import moment from '../node_modules/moment';
// const Moment = require('moment');
// Vue.use(Moment);

//var isToday = require('date-fns/is_today');
//import format from 'date-fns/format'
//import { format } from 'date-fns'

if(TNS_ENV !== 'production') {
  Vue.use(VueDevtools)
}
// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production')


new Vue({
  render: h => h('frame', [h(App)])
}).$start()

 import { AdminApi } from '@/services/api';

 function getCookie(name) {
     let match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
     if(match) return match[2];
 }

 export default (App) => {
     let authToken = getCookie('adminsid')
     if(!authToken) {
         App.$router.push({ name: 'SignIn' })
     } else {
         App.$http.get(AdminApi.getProfile).catch((err) => {
             if(err.status === 403) App.$router.push({ name: 'SignIn' })
         })
     }
 }

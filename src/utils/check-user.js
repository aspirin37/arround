 import { AdminApi } from '@/services/api';

 export default (App) => {
     App.$http.get(AdminApi.getProfile).catch((err) => {
         if(err.status === 403) App.$router.push('sign-in')
     })
 }

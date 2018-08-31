 import { AdminApi } from '@/services/api';

 export default async (App) => {
     AdminApi.getProfile().catch((err) => {
         if(err.status === 403) App.$router.push('sign-in')
     })
 }

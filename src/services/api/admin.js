import { _r, _e, genRes } from './_utils';

const resourse = genRes();

export default {
    signIn: (data) => resourse('v1/admin/session').post(data).then(_r).catch(_e),
    signOut: (data) => resourse('v1/admin/session').delete().then(_r).catch(_e),
    getProfile: () => resourse('v1/admin/profile').get().then(_r).catch(_e),
};

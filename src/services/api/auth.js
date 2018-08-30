import { _r, _e, genRes } from './_utils';

const resourse = genRes();

export default {
    login: (data) => resourse('v1/admin/session').post(data).then(_r).catch(_e),
};

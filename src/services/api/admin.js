import API_BASE from './_api-base';

export default {
    signIn: API_BASE + 'v1/admin/session',
    signOut: API_BASE + 'v1/admin/session',
    getProfile: API_BASE + 'v1/admin/profile',
};

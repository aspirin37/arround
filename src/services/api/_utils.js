import Vue from 'vue'

export function genRes() {
    let API_BASE;

    switch (process.env.NODE_ENV) {
        case 'development':
            API_BASE = `https://devarapi.a3technology.ru/`;
            break;
        case 'staging':
            API_BASE = `https://arapi.a3technology.ru/`;
            break;
        default:
            API_BASE = `https://arapi.a3technology.ru/`;
            break;
    }

    let methodArr = ['GET', 'PUT', 'POST', 'DELETE']

    let mObj = {};
    methodArr.forEach((method) => {
        mObj[method.toLowerCase()] = { method };
    });

    return (addUrl) => {
        let url = !addUrl ? API_BASE : API_BASE + addUrl
        return Vue.resource(url, null, mObj);
    };
}
export function _r(r) {
    return new Vue.Promise.resolve(r.data);
}
export function _e(e) {
    console.error(e);
    return new Vue.Promise.reject(e);
}

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

export default API_BASE

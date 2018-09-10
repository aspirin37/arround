import API_BASE from './_api-base';

export default {
    getModels: API_BASE + 'v1/admin/modelList',
    getModel: API_BASE + 'v1/admin/model',
    updateModification: API_BASE + 'v1/admin/modif',
    addModification: API_BASE + 'v1/admin/modif',
};

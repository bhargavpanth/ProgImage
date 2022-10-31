"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const progImage_1 = require("../entity/progImage");
const model_1 = require("../entity/progImage/model");
class PersistantProgImage extends progImage_1.ProgImage {
    updateVerified() {
        return Promise.resolve();
    }
}
// const TABLE_NAME = 'ProgImage'
const gateway = {
    createEntry: async (model) => {
        // const res = await DynamoDBClient(TABLE_NAME).create(model)
        return Promise.resolve(new PersistantProgImage(model));
    },
    getEntry: async (fileSHA) => {
        const model = {
            fileSHA: fileSHA,
            path: '',
            fileName: '',
            mimeType: model_1.MimeType.jpeg,
            verified: false,
            id: '',
            createdAt: new Date()
        };
        return Promise.resolve(new PersistantProgImage(model));
    },
    createNewFile: async (fileSHA, fileName) => {
        const model = {
            fileSHA: fileSHA,
            path: '',
            fileName: fileName,
            mimeType: model_1.MimeType.jpeg,
            verified: false,
            id: '',
            createdAt: new Date()
        };
        return Promise.resolve(new PersistantProgImage(model));
    }
};
exports.default = gateway;

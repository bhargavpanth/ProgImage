"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const progImage_1 = require("../entity/progImage");
const model_1 = require("../entity/progImage/model");
const dynamoDBClient_1 = require("./dynamoDBClient");
class PersistantProgImage extends progImage_1.ProgImage {
    updateVerified() {
        return Promise.resolve();
    }
}
const TABLE_NAME = 'ProgImage';
const gateway = {
    createEntry: async (model) => {
        const res = await (0, dynamoDBClient_1.DynamoDBClient)(TABLE_NAME).create(model);
        console.log(res);
        return Promise.resolve(new PersistantProgImage(model));
    },
    getEntry: async (fileSHA) => {
        const model = {
            fileSHA: fileSHA,
            path: '',
            fileName: 'abc.jpg',
            mimeType: model_1.MimeType.jpeg,
            verified: false,
            id: '',
            createdAt: new Date()
        };
        const res = await (0, dynamoDBClient_1.DynamoDBClient)(TABLE_NAME).read(fileSHA).catch(err => {
            console.log({
                err
            });
            console.log('-----');
        });
        console.log({ res });
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

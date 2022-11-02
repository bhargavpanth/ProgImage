"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
const progImage_1 = require("../entity/progImage");
const dynamoDBClient_1 = require("./dynamoDBClient");
class PersistantProgImage extends progImage_1.ProgImage {
    updateVerified() {
        return Promise.resolve();
    }
}
const TABLE_NAME = 'ProgImage';
const gateway = {
    createEntry: async (model) => {
        return Promise.resolve(new PersistantProgImage(model));
    },
    getEntry: async (fileSHA) => {
        const res = await (0, dynamoDBClient_1.DynamoDBClient)(TABLE_NAME).read(fileSHA);
        if (res && res.Item) {
            const progImageModel = {
                fileSHA: res.Item.fileSHA,
                path: res.Item.path,
                fileName: res.Item.fileName,
                mimeType: res.Item.mimeType,
                verified: res.Item.verified,
                id: res.Item.id,
                createdAt: res.Item.createdAt
            };
            return new PersistantProgImage(progImageModel);
        }
    },
    createNewFile: async (fileSHA, fileName) => {
        const model = {
            fileSHA: fileSHA,
            fileName: fileName,
            verified: false,
            id: (0, crypto_1.randomUUID)(),
            createdAt: new Date()
        };
        await (0, dynamoDBClient_1.DynamoDBClient)(TABLE_NAME).create(model);
        return new PersistantProgImage(model);
    }
};
exports.default = gateway;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const progImage_1 = require("../entity/progImage");
const model_1 = require("../entity/progImage/model");
class PersistantProgImage extends progImage_1.ProgImage {
    updateVerified() {
        return Promise.resolve();
    }
}
const gateway = {
    createEntry: function (model) {
        return Promise.resolve(new PersistantProgImage(model));
    },
    getEntry: function (fileSHA) {
        const model = {
            fileSHA: '',
            path: '',
            fileName: '',
            mimeType: model_1.MimeType.jpeg,
            verified: false,
            id: '',
            createdAt: new Date()
        };
        return Promise.resolve(new PersistantProgImage(model));
    },
    createNewFile: function (fileSHA, fileName) {
        const model = {
            fileSHA: '',
            path: '',
            fileName: '',
            mimeType: model_1.MimeType.jpeg,
            verified: false,
            id: '',
            createdAt: new Date()
        };
        return Promise.resolve(new PersistantProgImage(model));
    }
};
exports.default = gateway;

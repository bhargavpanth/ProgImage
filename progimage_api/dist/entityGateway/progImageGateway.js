"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// class PersistantProgImage extends ProgImage {
//     public updateVerified(): Promise<void> {
//         return Promise.resolve()
//     }
// }
const gateway = {
    createEntry: function (model) {
        throw new Error('Not implemented');
    },
    getEntry: function (fileSHA) {
        throw new Error('Not implemented');
    },
    createNewFile: function (fileSHA, fileName) {
        throw new Error('Not implemented');
    }
};
exports.default = gateway;

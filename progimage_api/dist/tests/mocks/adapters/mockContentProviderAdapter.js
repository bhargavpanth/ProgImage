"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMockContentProviderAdapter = void 0;
const utils_1 = require("../utils");
const defaultMock = {
    generatePreSignedURLForUpload: async (fileName) => {
        return Promise.resolve('http://pre-signed-url/upload');
    },
    generatePreSignedURLForDownload: async (fileName) => {
        return Promise.resolve(`http://pre-signed-url/download/${fileName}`);
    }
};
exports.getMockContentProviderAdapter = (0, utils_1.makeMockDependencyFactory)(defaultMock);

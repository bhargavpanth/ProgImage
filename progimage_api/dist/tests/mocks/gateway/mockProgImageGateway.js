"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMockProgImageGateway = exports.MockPersistantProgImage = void 0;
const progImage_1 = require("../../../entity/progImage");
const model_1 = require("../../../entity/progImage/model");
const utils_1 = require("../utils");
const defaultModel = {
    fileSHA: 'SHA256fileName',
    path: '',
    fileName: 'fileName',
    mimeType: model_1.MimeType.jpeg,
    verified: false,
    id: 'UUID',
    createdAt: undefined
};
class MockPersistantProgImage extends progImage_1.ProgImage {
    constructor(overrides) {
        super({ ...defaultModel, createdAt: new Date(), ...overrides });
    }
    updateVerified() {
        return Promise.resolve();
    }
}
exports.MockPersistantProgImage = MockPersistantProgImage;
const defaultMock = {
    createEntry: async () => {
        return new MockPersistantProgImage();
    },
    getEntry: async (fileSHA) => {
        return new MockPersistantProgImage();
    },
    createNewFile: async (fileSHA, fileName) => {
        return new MockPersistantProgImage();
    }
};
exports.getMockProgImageGateway = (0, utils_1.makeMockDependencyFactory)(defaultMock);

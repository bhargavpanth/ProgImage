"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const expect_js_1 = __importDefault(require("expect.js"));
const RequestFileUpload_1 = __importDefault(require("../../useCases/RequestFileUpload"));
const mockContentProviderAdapter_1 = require("../mocks/adapters/mockContentProviderAdapter");
const mockProgImageGateway_1 = require("../mocks/gateway/mockProgImageGateway");
describe('File upload', () => {
    describe('Requesting to upload a new file', () => {
        let response;
        const mockFileSHA = 'mockFileSHA', mockFilename = 'mockFileName';
        before(async () => {
            const mockDependencies = {
                progImageGateway: (0, mockProgImageGateway_1.getMockProgImageGateway)({
                    getEntry: async (fileSHA) => {
                        return Promise.resolve(null);
                    }
                }),
                contentProviderAdapter: (0, mockContentProviderAdapter_1.getMockContentProviderAdapter)()
            };
            const useCase = (0, RequestFileUpload_1.default)(mockDependencies);
            response = await useCase(mockFileSHA, mockFilename);
        });
        it('creates a presigned URL to upload', () => {
            (0, expect_js_1.default)(response).to.equal('http://pre-signed-url/upload');
        });
    });
    describe('Requesting to upload an already uploaded file', () => {
        let error;
        const mockFileSHA = 'mockFileSHA', mockFilename = 'mockFileName';
        before(async () => {
            const mockDependencies = {
                progImageGateway: (0, mockProgImageGateway_1.getMockProgImageGateway)({
                    getEntry: async (fileSHA) => {
                        return new mockProgImageGateway_1.MockPersistantProgImage();
                    },
                }),
                contentProviderAdapter: (0, mockContentProviderAdapter_1.getMockContentProviderAdapter)()
            };
            const useCase = (0, RequestFileUpload_1.default)(mockDependencies);
            await useCase(mockFileSHA, mockFilename).catch(err => error = err);
        });
        it('throws an error', () => {
            (0, expect_js_1.default)(error.message).to.equal('Trying to re-upload an existing file');
        });
    });
});

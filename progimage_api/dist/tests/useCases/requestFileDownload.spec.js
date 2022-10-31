"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const expect_js_1 = __importDefault(require("expect.js"));
const RequestFileDownload_1 = __importDefault(require("../../useCases/RequestFileDownload"));
const mockContentProviderAdapter_1 = require("../mocks/adapters/mockContentProviderAdapter");
const mockProgImageGateway_1 = require("../mocks/gateway/mockProgImageGateway");
describe('File download', () => {
    describe('Requesting to download an existing file', () => {
        let response;
        const mockFileSHA = 'mockFileSHA';
        before(async () => {
            const mockDependencies = {
                progImageGateway: (0, mockProgImageGateway_1.getMockProgImageGateway)({
                    getEntry: async (fileSHA) => {
                        return new mockProgImageGateway_1.MockPersistantProgImage();
                    }
                }),
                contentProviderAdapter: (0, mockContentProviderAdapter_1.getMockContentProviderAdapter)()
            };
            const useCase = (0, RequestFileDownload_1.default)(mockDependencies);
            response = await useCase(mockFileSHA);
        });
        it('creates a presigned URL to download', () => {
            (0, expect_js_1.default)(response).to.equal('http://pre-signed-url/download/fileName');
        });
    });
    describe('Requesting to download a non-existing file', () => {
        let error;
        const mockFileSHA = 'mockFileSHA';
        before(async () => {
            const mockDependencies = {
                progImageGateway: (0, mockProgImageGateway_1.getMockProgImageGateway)({
                    getEntry: async (fileSHA) => {
                        return Promise.resolve(null);
                    }
                }),
                contentProviderAdapter: (0, mockContentProviderAdapter_1.getMockContentProviderAdapter)()
            };
            const useCase = (0, RequestFileDownload_1.default)(mockDependencies);
            await useCase(mockFileSHA).catch(err => error = err);
        });
        it('throws an error', () => {
            (0, expect_js_1.default)(error.message).to.equal('Trying to download a file that doesnt exist');
        });
    });
});

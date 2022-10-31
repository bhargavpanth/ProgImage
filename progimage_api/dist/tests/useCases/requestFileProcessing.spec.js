"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const expect_js_1 = __importDefault(require("expect.js"));
const RequestFileProcessing_1 = __importDefault(require("../../useCases/RequestFileProcessing"));
const mockContentProviderAdapter_1 = require("../mocks/adapters/mockContentProviderAdapter");
const mockImageProcesorAdapter_1 = require("../mocks/adapters/mockImageProcesorAdapter");
const mockProgImageGateway_1 = require("../mocks/gateway/mockProgImageGateway");
describe('File processing', () => {
    describe('Requesting to process an existig file', () => {
        let response;
        const mockFileSHA = 'mockFileSHA';
        before(async () => {
            const mockDependencies = {
                progImageGateway: (0, mockProgImageGateway_1.getMockProgImageGateway)({
                    getEntry: async (fileSHA) => {
                        return new mockProgImageGateway_1.MockPersistantProgImage({
                            verified: true
                        });
                    }
                }),
                contentProviderAdapter: (0, mockContentProviderAdapter_1.getMockContentProviderAdapter)(),
                imageProcessorAdapter: (0, mockImageProcesorAdapter_1.getMockImageProcessorAdapter)()
            };
            const useCase = (0, RequestFileProcessing_1.default)(mockDependencies);
            response = await useCase(mockFileSHA);
        });
        it('creates a presigned URL to download the processed image', () => {
            (0, expect_js_1.default)(response).to.equal('http://pre-signed-url/download/fileName');
        });
    });
    describe('Requesting to process a non existing file', () => {
        let error;
        const mockFileSHA = 'mockFileSHA';
        before(async () => {
            const mockDependencies = {
                progImageGateway: (0, mockProgImageGateway_1.getMockProgImageGateway)({
                    getEntry: async (fileSHA) => {
                        return Promise.resolve(null);
                    }
                }),
                contentProviderAdapter: (0, mockContentProviderAdapter_1.getMockContentProviderAdapter)(),
                imageProcessorAdapter: (0, mockImageProcesorAdapter_1.getMockImageProcessorAdapter)()
            };
            const useCase = (0, RequestFileProcessing_1.default)(mockDependencies);
            await useCase(mockFileSHA).catch(err => error = err);
        });
        it('throws an error', () => {
            (0, expect_js_1.default)(error.message).to.equal('Trying to process a file that doesnt exist. Upload file to repository before you can request for processing');
        });
    });
});

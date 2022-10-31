import expect from 'expect.js'
import requestFileProcessingFactory from '../../useCases/RequestFileProcessing'
import { getMockContentProviderAdapter } from '../mocks/adapters/mockContentProviderAdapter'
import { getMockImageProcessorAdapter } from '../mocks/adapters/mockImageProcesorAdapter'
import { getMockProgImageGateway, MockPersistantProgImage } from '../mocks/gateway/mockProgImageGateway'

describe('File processing', () => {
    describe('Requesting to process an existig file', () => {
        let response
        const mockFileSHA = 'mockFileSHA'
        before(async () => {
            const mockDependencies = {
                progImageGateway: getMockProgImageGateway({
                    getEntry: async (fileSHA: string) => {
                        return new MockPersistantProgImage({
                            verified: true
                        })
                    }
                }),
                contentProviderAdapter: getMockContentProviderAdapter(),
                imageProcessorAdapter: getMockImageProcessorAdapter()
            }
            const useCase = requestFileProcessingFactory(mockDependencies)
			response = await useCase(mockFileSHA)
        })
        it('creates a presigned URL to download the processed image', () => {
            expect(response).to.equal('http://pre-signed-url/download/fileName')
        })
    })
    describe('Requesting to process a non existing file', () => {
        let error
        const mockFileSHA = 'mockFileSHA'
        before(async () => {
            const mockDependencies = {
                progImageGateway: getMockProgImageGateway({
                    getEntry: async (fileSHA: string) => {
                        return Promise.resolve(null)
                    }
                }),
                contentProviderAdapter: getMockContentProviderAdapter(),
                imageProcessorAdapter: getMockImageProcessorAdapter()
            }
            const useCase = requestFileProcessingFactory(mockDependencies)
			await useCase(mockFileSHA).catch(err => error = err)
        })
        it('throws an error', () => {
            expect(error.message).to.equal('Trying to process a file that doesnt exist. Upload file to repository before you can request for processing')
        })
    })
})

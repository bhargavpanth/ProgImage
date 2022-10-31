import expect from 'expect.js'
import requestFileDownloadFactory from '../../useCases/RequestFileDownload'
import { getMockContentProviderAdapter } from '../mocks/adapters/mockContentProviderAdapter'
import { getMockProgImageGateway, MockPersistantProgImage } from '../mocks/gateway/mockProgImageGateway'

describe('File download', () => {
    describe('Requesting to download an existing file', () => {
        let response
        const mockFileSHA = 'mockFileSHA'
        before(async () => {
            const mockDependencies = {
                progImageGateway: getMockProgImageGateway({
                    getEntry: async (fileSHA: string) => {
                        return new MockPersistantProgImage()
                    }
                }),
                contentProviderAdapter: getMockContentProviderAdapter()
            }
            const useCase = requestFileDownloadFactory(mockDependencies)
			response = await useCase(mockFileSHA)
        })
        it('creates a presigned URL to download', () => {
            expect(response).to.equal('http://pre-signed-url/download/fileName')
        })
    })
    describe('Requesting to download a non-existing file', () => {
        let error
        const mockFileSHA = 'mockFileSHA'
        before(async () => {
            const mockDependencies = {
                progImageGateway: getMockProgImageGateway({
                    getEntry: async (fileSHA: string) => {
                        return Promise.resolve(null)
                    }
                }),
                contentProviderAdapter: getMockContentProviderAdapter()
            }
            const useCase = requestFileDownloadFactory(mockDependencies)
			await useCase(mockFileSHA).catch(err => error = err)
        })
        it('throws an error', () => {
            expect(error.message).to.equal('Trying to download a file that doesnt exist')
        })
    })
})

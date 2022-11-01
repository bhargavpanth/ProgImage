import expect from 'expect.js'
import requestFileUploadFactory from '../../useCases/RequestFileUpload'
import { getMockContentProviderAdapter } from '../mocks/adapters/mockContentProviderAdapter'
import { getMockProgImageGateway, MockPersistantProgImage } from '../mocks/gateway/mockProgImageGateway'

describe('File upload', () => {
    describe('Requesting to upload a new file' , () => {
        let response
        const mockFileSHA = 'mockFileSHA', mockFilename = 'mockFileName'
        before(async () => {
            const mockDependencies = {
                progImageGateway: getMockProgImageGateway({
                    getEntry: async (fileSHA: string) => {
                        return Promise.resolve(null)
                    }
                }),
                contentProviderAdapter: getMockContentProviderAdapter()
            }
			const useCase = requestFileUploadFactory(mockDependencies)
			response = await useCase(mockFileSHA, mockFilename)
		})
        it('creates a presigned URL to upload', () => {
            expect(response).to.equal('http://pre-signed-url/upload')
        })
    })
    describe('Requesting to upload an already uploaded file', () => {
        let error
        const mockFileSHA = 'mockFileSHA', mockFilename = 'mockFileName'
        before(async () => {
            const mockDependencies = {
                progImageGateway: getMockProgImageGateway({
                    getEntry: async (fileSHA: string) => {
                        return new MockPersistantProgImage({
                            verified: true
                        })
                    }, 
                }),
                contentProviderAdapter: getMockContentProviderAdapter()
            }
			const useCase = requestFileUploadFactory(mockDependencies)
			await useCase(mockFileSHA, mockFilename).catch(err => error = err)
		})
        it('throws an error', () => {
			expect(error.message).to.equal('Trying to re-upload an existing file')
		})
    })
    describe('Requesting to upload an already uploaded file that is not yet verified', () => {
        let response
        const mockFileSHA = 'mockFileSHA', mockFilename = 'mockFileName'
        before(async () => {
            const mockDependencies = {
                progImageGateway: getMockProgImageGateway({
                    getEntry: async (fileSHA: string) => {
                        return new MockPersistantProgImage({
                            verified: false
                        })
                    }, 
                }),
                contentProviderAdapter: getMockContentProviderAdapter()
            }
			const useCase = requestFileUploadFactory(mockDependencies)
			response = await useCase(mockFileSHA, mockFilename)
		})
        it('creates a presigned URL to upload', () => {
            expect(response).to.equal('http://pre-signed-url/upload')
        })
    })
})

import requestFileUploadFactory from '../../useCases/RequestFileUpload'
import { getMockImageProcessorAdapter } from '../mocks/adapters/mockImageProcesorAdapter'
import { getMockContentProviderAdapter } from '../mocks/adapters/mockContentProviderAdapter'
import { getMockProgImageGateway } from '../mocks/gateway/mockProgImageGateway'

describe('Request to upload a file', () => {
    describe('Requesting to upload a new file' , () => {
        let response
        const mockFileSHA = 'mockFileSHA', mockFilename = 'mockFileName'
        before(async () => {
			const useCase = requestFileUploadFactory({
                imageProcessorAdapter: getMockImageProcessorAdapter(),
                progImageGateway: getMockProgImageGateway(),
                contentProviderAdapter: getMockContentProviderAdapter()
            })
			response = await useCase(mockFileSHA, mockFilename)
		})

    })
    describe('Requesting for an existing file', () => {

    })
    describe('Requesting to upload a valid file but the registration fails', () => {

    })
})

import { ContentProviderAdapter } from '../../../adapters/interfaces/contentProviderAdapter'
import { makeMockDependencyFactory } from '../utils'

const defaultMock: ContentProviderAdapter = {
    generatePreSignedURLForUpload: async (fileName: string, fileSHA: string): Promise<string> => {
        return Promise.resolve('http://pre-signed-url/upload')
    },
    generatePreSignedURLForDownload: async (fileName: string): Promise<string> => {
        return Promise.resolve(`http://pre-signed-url/download/${fileName}`)
    }
}

export const getMockContentProviderAdapter = makeMockDependencyFactory(defaultMock)

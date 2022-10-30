import { ImageProcessingAdapter } from '../../../adapters/interfaces/imageProcessingAdapter'
import { makeMockDependencyFactory } from '../utils'

const defaultMock: ImageProcessingAdapter = {
    async processImage (): Promise<string> {
        return Promise.resolve('fileName')
    }
}

export const getMockImageProcessorAdapter = makeMockDependencyFactory(defaultMock)

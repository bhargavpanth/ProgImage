
import { ContentProviderAdapter } from '../../adapters/interfaces/contentProviderAdapter'
import { ImageProcessingAdapter } from '../../adapters/interfaces/imageProcessingAdapter'
import ProgImageGateway from '../../entityGateway/interfaces/progImageGateway'

interface Dependencies {
    imageProcessorAdapter: ImageProcessingAdapter
    progImageGateway: ProgImageGateway
    contentProviderAdapter: ContentProviderAdapter
}

const factory = (dependencies: Dependencies) => async (fileSHA: string, fileName: string) => {
    const {
        progImageGateway,
        contentProviderAdapter,
    } = dependencies
    
    const existingFileEntry = await progImageGateway.getEntry(fileSHA)
    if (existingFileEntry && existingFileEntry.getVerificationStatus()) 
        throw new Error('Trying to re-upload an existing file')

    return contentProviderAdapter.generatePreSignedURLForUpload(fileName)
}

export default factory

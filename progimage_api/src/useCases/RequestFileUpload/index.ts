
import { ContentProviderAdapter } from '../../adapters/interfaces/contentProviderAdapter'
import ProgImageGateway from '../../entityGateway/interfaces/progImageGateway'

interface Dependencies {
    progImageGateway: ProgImageGateway
    contentProviderAdapter: ContentProviderAdapter
}

const factory = (dependencies: Dependencies) => async (fileSHA: string, fileName: string) => {
    const {
        progImageGateway,
        contentProviderAdapter,
    } = dependencies
    
    const existingFileEntry = await progImageGateway.getEntry(fileSHA)
    if (existingFileEntry || existingFileEntry?.getVerificationStatus()) 
        throw new Error('Trying to re-upload an existing file')

    const presignedURL = await contentProviderAdapter.generatePreSignedURLForUpload(fileName)

    await progImageGateway.createNewFile(fileSHA, fileName).catch(err => {
        throw new Error('Unable to register file')
    })

    return presignedURL
}

export default factory

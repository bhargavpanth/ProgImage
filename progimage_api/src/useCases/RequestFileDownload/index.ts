
import { ContentProviderAdapter } from '../../adapters/interfaces/contentProviderAdapter'
import ProgImageGateway from '../../entityGateway/interfaces/progImageGateway'

interface Dependencies {
    progImageGateway: ProgImageGateway
    contentProviderAdapter: ContentProviderAdapter
}

const factory = (dependencies: Dependencies) => async (fileSHA) => {
    const {
        progImageGateway,
        contentProviderAdapter
    } = dependencies
    
    const existingFileEntry = await progImageGateway.getEntry(fileSHA)
    if (!existingFileEntry) 
        throw new Error('Trying to download a file that doesnt exist')
    
    const fileName = existingFileEntry.model.fileName

    return contentProviderAdapter.generatePreSignedURLForDownload(fileName, fileSHA)
}

export default factory


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

    if (existingFileEntry) throw new Error('Trying to re-upload an existing file')

    const presignedURL = await contentProviderAdapter.generatePreSignedURLForUpload(fileName, fileSHA)

    if (!existingFileEntry) {
        await progImageGateway.createNewFile(fileSHA, fileName)
    }

    return presignedURL
}

export default factory


import { ContentProviderAdapter } from '../../adapters/interfaces/contentProviderAdapter'
import { FormatOption, ImageProcessingAdapter, ProcessOptions } from '../../adapters/interfaces/imageProcessingAdapter'
import ProgImageGateway from '../../entityGateway/interfaces/progImageGateway'

interface Dependencies {
    imageProcessorAdapter: ImageProcessingAdapter
    progImageGateway: ProgImageGateway
    contentProviderAdapter: ContentProviderAdapter
}

const factory = (dependencies: Dependencies) => async (fileSHA: string, processOptions?: Array<ProcessOptions>, formatOption?: FormatOption) => {
    const {
        progImageGateway,
        contentProviderAdapter,
        imageProcessorAdapter
    } = dependencies

    console.log({
        fileSHA,
        processOptions,
        formatOption
    })
    
    const existingFileEntry = await progImageGateway.getEntry(fileSHA)
    // if (!existingFileEntry || !existingFileEntry.getVerificationStatus())

    if (!existingFileEntry)
        throw new Error('Trying to process a file that doesnt exist. Upload file to repository before you can request for processing')

    const fileName = await imageProcessorAdapter.processImage(
        fileSHA,
        processOptions,
        formatOption
    ).catch(err => {
        throw new Error("Unable to process image")
    })

    return contentProviderAdapter.generatePreSignedURLForDownload(fileName, fileSHA)
}

export default factory

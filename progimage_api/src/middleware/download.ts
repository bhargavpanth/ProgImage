import { progImageGateway } from '../entityGateway'
import { contentProviderAdapter } from '../adapters/contentProviderAdapter'
import { imageProcessingAdapter } from '../adapters/imageProcessingAdapter'
import useCases from '../useCases'

export function download (req, res, next) {
    const fileSHA = req.params.file_SHA
    
    if (!fileSHA) res.sendStatus(400)
    
    const useCase = useCases({
        progImageGateway,
        contentProviderAdapter,
        imageProcessingAdapter
    })

    return useCase.requestFileDownload(fileSHA)
        .then(preSignedURL => 
            res.send({ url: preSignedURL })
        )
        .catch(err => 
            res.send({ message: `Something went wrong. ${err}` })
        )
}

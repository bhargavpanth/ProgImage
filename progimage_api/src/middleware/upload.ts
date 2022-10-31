import { progImageGateway } from '../entityGateway'
import { contentProviderAdapter } from '../adapters/contentProviderAdapter'
import { imageProcessingAdapter } from '../adapters/imageProcessingAdapter'
import useCases from '../useCases'

export function upload (req, res, next) {
    const fileSHA = req.params.file_SHA
    const fileName = req.params.file_name
    
    if (!fileSHA || !fileName) res.sendStatus(400)
    
    const useCase = useCases({
        progImageGateway,
        contentProviderAdapter,
        imageProcessingAdapter
    })

    return useCase.requestFileUpload(fileSHA, fileName)
        .then(preSignedURL => 
            res.sendStatus(200).send({ url: preSignedURL })
        )
        .catch(err => 
            res.sendStatus(500).send({ message: `Something went wrong. ${err}` })
        )
}

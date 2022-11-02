import { progImageGateway } from '../entityGateway'
import { contentProviderAdapter } from '../adapters/contentProviderAdapter'
import { imageProcessingAdapter as imageProcessorAdapter } from '../adapters/imageProcessingAdapter'
import useCases from '../useCases'

export function process(req, res, next) {
    const fileSHA = req.params.file_SHA
    if (!fileSHA) res.sendStatus(400)

    const processOptions = req.query.process
    const formatOptions = req.query.format

    if (!processOptions && !formatOptions) res.sendStatus(400)

    const useCase = useCases({
        progImageGateway,
        contentProviderAdapter,
        imageProcessorAdapter
    })

    return useCase.requestFileProcessing(fileSHA, processOptions, formatOptions)
        .then(preSignedURL => 
            res.send({ url: preSignedURL })
        )
        .catch(err => res.sendStatus(400))
}

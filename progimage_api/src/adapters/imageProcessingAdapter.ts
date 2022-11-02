import axios from 'axios'
import { FormatOption, ImageProcessingAdapter, ProcessOptions } from './interfaces/imageProcessingAdapter'

export const imageProcessingAdapter: ImageProcessingAdapter = {
    processImage: async (fileId: string, processOptions?: Array<ProcessOptions>, formatOption?: FormatOption) => {
        const imageProcessingServiceURL = process.env.IMAGE_PROCESSING_SERVICE_URL
        if (!imageProcessingServiceURL) throw new Error("image processing micro service is down")
        const processingOptions = processOptions.map(option => `options=${option}&`).reduce((acc, val) => acc + val, '')
        const serviceRequest = `${imageProcessingServiceURL}/transform/${fileId}?${processingOptions}format=${formatOption}`
        return axios.get(serviceRequest).then(res => res.data)
    }
}

import requestFileUpload from './RequestFileUpload'
import requestFileDownload from './RequestFileDownload'
import requestFileProcessing from './RequestFileProcessing'

export default (dependencies) => {
    return {
        requestFileUpload: requestFileUpload(dependencies),
        requestFileDownload: requestFileDownload(dependencies),
        requestFileProcessing: requestFileProcessing(dependencies)
    }
}

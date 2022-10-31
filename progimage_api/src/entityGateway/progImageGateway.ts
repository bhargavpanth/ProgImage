import { ProgImage } from '../entity/progImage'
import { ProgImageModel } from '../entity/progImage/model'
import ProgImageGateway from './interfaces/progImageGateway'

// class PersistantProgImage extends ProgImage {
//     public updateVerified(): Promise<void> {
//         return Promise.resolve()
//     }
// }


const gateway: ProgImageGateway = {
    createEntry: function (model: ProgImageModel): Promise<ProgImage> {
        throw new Error('Not implemented')
    },

    getEntry: function (fileSHA: string): Promise<ProgImage> {
        throw new Error('Not implemented')
    },
    
    createNewFile: function (fileSHA: string, fileName: string): Promise<ProgImage> {
        throw new Error('Not implemented')
    }
}

export default gateway

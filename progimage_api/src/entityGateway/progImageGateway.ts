import { ProgImage } from '../entity/progImage'
import { MimeType, ProgImageModel } from '../entity/progImage/model'
import ProgImageGateway from './interfaces/progImageGateway'

class PersistantProgImage extends ProgImage {
    public updateVerified(): Promise<void> {
        return Promise.resolve()
    }
}

const gateway: ProgImageGateway = {
    createEntry: function (model: ProgImageModel): Promise<ProgImage> {
        return Promise.resolve(new PersistantProgImage(model))
    },

    getEntry: function (fileSHA: string): Promise<ProgImage> {
        const model: ProgImageModel = {
            fileSHA: fileSHA,
            path: '',
            fileName: '',
            mimeType: MimeType.jpeg,
            verified: false,
            id: '',
            createdAt: new Date()
        }
        return Promise.resolve(new PersistantProgImage(model))
    },
    
    createNewFile: function (fileSHA: string, fileName: string): Promise<ProgImage> {
        const model: ProgImageModel = {
            fileSHA: '',
            path: '',
            fileName: '',
            mimeType: MimeType.jpeg,
            verified: false,
            id: '',
            createdAt: new Date()
        }
        return Promise.resolve(new PersistantProgImage(model))
    }
}

export default gateway

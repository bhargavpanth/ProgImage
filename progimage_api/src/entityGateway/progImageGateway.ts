import { ProgImage } from '../entity/progImage'
import { MimeType, ProgImageModel } from '../entity/progImage/model'
// import { DynamoDBClient } from './dynamoDBClient'
import ProgImageGateway from './interfaces/progImageGateway'

class PersistantProgImage extends ProgImage {
    public updateVerified(): Promise<void> {
        return Promise.resolve()
    }
}

// const TABLE_NAME = 'ProgImage'

const gateway: ProgImageGateway = {
    createEntry: async (model: ProgImageModel): Promise<ProgImage> => {
        // const res = await DynamoDBClient(TABLE_NAME).create(model)
        return Promise.resolve(new PersistantProgImage(model))
    },

    getEntry: async (fileSHA: string): Promise<ProgImage> => {
        const model: ProgImageModel = {
            fileSHA: fileSHA,
            path: '',
            fileName: 'abc.jpg',
            mimeType: MimeType.jpeg,
            verified: false,
            id: '',
            createdAt: new Date()
        }
        return Promise.resolve(new PersistantProgImage(model))
    },
    
    createNewFile: async (fileSHA: string, fileName: string): Promise<ProgImage> => {
        const model: ProgImageModel = {
            fileSHA: fileSHA,
            path: '',
            fileName: fileName,
            mimeType: MimeType.jpeg,
            verified: false,
            id: '',
            createdAt: new Date()
        }
        return Promise.resolve(new PersistantProgImage(model))
    }
}

export default gateway

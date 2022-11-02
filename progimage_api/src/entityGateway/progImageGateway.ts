import { randomUUID } from 'crypto'
import { ProgImage } from '../entity/progImage'
import { ProgImageModel } from '../entity/progImage/model'
import { DynamoDBClient } from './dynamoDBClient'
import ProgImageGateway from './interfaces/progImageGateway'

class PersistantProgImage extends ProgImage {
    public updateVerified(): Promise<void> {
        return Promise.resolve()
    }
}

const TABLE_NAME = 'ProgImage'

const gateway: ProgImageGateway = {
    createEntry: async (model: ProgImageModel): Promise<ProgImage> => {
        await DynamoDBClient(TABLE_NAME).create(model)
        return new PersistantProgImage(model)
    },

    getEntry: async (fileSHA: string): Promise<ProgImage | void> => {
        const res = await DynamoDBClient(TABLE_NAME).read(fileSHA)
        if (res && res.Item) {
            const progImageModel = {
                fileSHA: res.Item.fileSHA,
                path: res.Item.path,
                fileName: res.Item.fileName,
                mimeType: res.Item.mimeType,
                verified: res.Item.verified,
                id: res.Item.id,
                createdAt: res.Item.createdAt
            }
            return new PersistantProgImage(progImageModel)
        }
    },
    
    createNewFile: async (fileSHA: string, fileName: string): Promise<ProgImage | void> => {
        const model: ProgImageModel = {
            fileSHA: fileSHA,
            fileName: fileName,
            verified: false,
            id: randomUUID(),
            createdAt: new Date()
        }

        await DynamoDBClient(TABLE_NAME).create(model)
        
        return new PersistantProgImage(model)
    }
}

export default gateway

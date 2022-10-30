import { ProgImage } from '../entity/progImage'
import { MimeType } from '../entity/progImage/model'
import ProgImageGateway from './interfaces/progImageGateway'

const gateway: ProgImageGateway = {
    createEntry: function (model: { fileSHA: string; path: string; bucket: string; fileName: string; mimeType: MimeType; verified: boolean; }): Promise<ProgImage> {
        throw new Error('Function not implemented.')
    },
    getEntry: function (fileSHA: string): Promise<ProgImage> {
        throw new Error('Function not implemented.');
    },
    createNewFile: function (fileSHA: string, fileName: string): Promise<ProgImage> {
        throw new Error('Function not implemented.');
    }
}

export default gateway

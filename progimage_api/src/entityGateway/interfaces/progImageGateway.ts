import { BaseDomainModel } from '../../entity/domainEntity'
import { ProgImage } from '../../entity/progImage'
import { ProgImageModel } from '../../entity/progImage/model'

export default interface ProgImageGateway {
    createEntry (model: CreateModel): Promise<ProgImage>
    getEntry(fileSHA: string): Promise<ProgImage>
    createNewFile(fileSHA: string, fileName: string): Promise<ProgImage>
}

type CreateModel = Omit<ProgImageModel, keyof BaseDomainModel>

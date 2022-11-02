import { BaseDomainModel } from '../../entity/domainEntity'
import { ProgImage } from '../../entity/progImage'
import { ProgImageModel } from '../../entity/progImage/model'

export default interface ProgImageGateway {
    createEntry (model: CreateModel): Promise<ProgImage | void>
    getEntry(fileSHA: string): Promise<ProgImage | void>
    createNewFile(fileSHA: string, fileName: string): Promise<ProgImage | void>
}

type CreateModel = Omit<ProgImageModel, keyof BaseDomainModel>

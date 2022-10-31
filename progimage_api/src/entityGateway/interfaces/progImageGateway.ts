import { BaseDomainModel } from '../../entity/domainEntity'
import { ProgImage } from '../../entity/progImage'
import { ProgImageModel } from '../../entity/progImage/model'

export default interface ProgImageGateway {
    createEntry (model: CreateModel): Promise<ProgImage | null>
    getEntry(fileSHA: string): Promise<ProgImage | null>
    createNewFile(fileSHA: string, fileName: string): Promise<ProgImage | null>
}

type CreateModel = Omit<ProgImageModel, keyof BaseDomainModel>

import { DomainEntity } from '../domainEntity'
import { ProgImageModel } from './model'

export abstract class ProgImage extends DomainEntity<ProgImageModel> {
    public abstract updateVerified (): Promise<void>

    getVerificationStatus() {
        return this.model.verified
    }

    getId() {
        return this.model.id
    }
}

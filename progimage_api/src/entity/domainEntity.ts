import { cloneDeep } from 'lodash'

export interface BaseDomainModel {
	id: string
	createdAt: Date
	updatedAt?: Date
}

export abstract class DomainEntity<T extends BaseDomainModel> {
	public model: T
	constructor (model: T) {
		this.model = cloneDeep(model)
	}
}

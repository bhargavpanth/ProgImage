import sinon, { SinonSpy } from 'sinon'
import { ProgImage } from '../../entity/progImage'

export function makeSpiableGateway (mock) {
	Object.keys(mock).forEach(key => {
		sinon.spy(mock, key)
	})
	return mock
}

export function makeSpiableProgImage (mock) {
	Object.getOwnPropertyNames(ProgImage.prototype).forEach(key => {
		sinon.spy(mock, key)
	})
	return mock
}

export type Spiable<T extends object> = {
	[K in keyof T]: T[K] & SinonSpy
}
export const makeMockDependencyFactory = <T extends object>(defaultMock: T) =>
	(overrides?: Partial<T>): Spiable<T> =>
	makeSpiableGateway({ ...defaultMock, ...overrides })
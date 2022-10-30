import { ProgImage } from '../../../entity/progImage'
import { MimeType, ProgImageModel } from '../../../entity/progImage/model'
import ProgImageGateway from '../../../entityGateway/interfaces/progImageGateway'
import { makeMockDependencyFactory } from '../utils'

const defaultModel: ProgImageModel = {
    fileSHA: 'SHA256fileName',
    path: '',
    fileName: 'fileName',
    mimeType: MimeType.jpeg,
    verified: false,
    id: 'UUID',
    createdAt: undefined
}

export class MockProgImage extends ProgImage {
    constructor(overrides?: Partial<ProgImageModel>) {
        super({ ...defaultModel, createdAt: new Date(), ...overrides })
    }
    public updateVerified(): Promise<void> {
        return Promise.resolve()
    }
}

const defaultMock: ProgImageGateway = {
    createEntry: async () => {
        throw new Error('Function not implemented.')
    },
    getEntry: async (fileSHA: string) => {
        throw new Error('Function not implemented.')
    },
    createNewFile: async (fileSHA: string, fileName: string) => {
        throw new Error('Function not implemented.')
    }
}

export const getMockProgImageGateway = makeMockDependencyFactory(defaultMock)

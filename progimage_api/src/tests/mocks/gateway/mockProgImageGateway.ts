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

export class MockPersistantProgImage extends ProgImage {
    constructor(overrides?: Partial<ProgImageModel>) {
        super({ ...defaultModel, createdAt: new Date(), ...overrides })
    }
    public updateVerified(): Promise<void> {
        return Promise.resolve()
    }
}


const defaultMock: ProgImageGateway = {
    createEntry: async (): Promise<ProgImage | null> => {
        return new MockPersistantProgImage()
    },
    getEntry: async (fileSHA: string): Promise<ProgImage | null> => {
        return new MockPersistantProgImage()
    },
    createNewFile: async (fileSHA: string, fileName: string): Promise<ProgImage | null> => {
        return new MockPersistantProgImage()
    }
}

export const getMockProgImageGateway = makeMockDependencyFactory(defaultMock)

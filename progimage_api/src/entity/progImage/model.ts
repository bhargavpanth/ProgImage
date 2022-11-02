import { BaseDomainModel } from '../domainEntity'

export interface ProgImageModel extends BaseDomainModel {
	fileSHA: string
    path?: string
    fileName: string
    mimeType?: MimeType
    verified: boolean
}

export enum MimeType {
    jpeg = "JPEG",
    png = "PNG",
    webp = "WEBP"
}

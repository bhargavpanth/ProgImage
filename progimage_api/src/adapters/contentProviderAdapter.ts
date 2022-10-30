import { S3Client, PutObjectCommand, GetObjectCommand} from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { ContentProviderAdapter } from './interfaces/contentProviderAdapter'

export const contentProviderAdapter: ContentProviderAdapter = {
    generatePreSignedURLForUpload: async (fileName: string) => {
        const config = {
            credentials: {
                accessKeyId: process.env.ACCESS_KEY_ID,
                secretAccessKey: process.env.SECRET_ACCESS_KEY
            },
            region: process.env.REGION,
        }
        const client = new S3Client(config)
        const command = new PutObjectCommand({
            Bucket: process.env.BUCKET,
            Key: fileName
        })
        return getSignedUrl(client, command, { expiresIn: 3500 })
    },
    generatePreSignedURLForDownload: async (fileName: string) => {
        const config = {
            credentials: {
                accessKeyId: process.env.ACCESS_KEY_ID,
                secretAccessKey: process.env.SECRET_ACCESS_KEY
            },
            region: process.env.REGION,
        }
        const client = new S3Client(config)
        const command = new GetObjectCommand({
            Bucket: process.env.BUCKET,
            Key: fileName
        })
        return getSignedUrl(client, command, { expiresIn: 3500 })
    }
}

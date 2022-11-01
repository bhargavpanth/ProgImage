import { S3Client, PutObjectCommand, GetObjectCommand} from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { ContentProviderAdapter } from './interfaces/contentProviderAdapter'

export const contentProviderAdapter: ContentProviderAdapter = {
    generatePreSignedURLForUpload: async (fileName: string, fileSHA: string) => {
        const config = {
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
            },
            region: process.env.AWS_DEFAULT_REGION,
        }
        const client = new S3Client(config)
        const command = new PutObjectCommand({
            Bucket: process.env.BUCKET,
            Key: `${fileSHA}${fileName}`
        })
        return getSignedUrl(client, command, { expiresIn: 3500 })
    },
    generatePreSignedURLForDownload: async (fileName: string, fileSHA: string) => {
        const config = {
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
            },
            region: process.env.AWS_DEFAULT_REGION,
        }
        const client = new S3Client(config)
        const command = new GetObjectCommand({
            Bucket: process.env.BUCKET,
            Key: `${fileSHA}${fileName}`
        })
        return getSignedUrl(client, command, { expiresIn: 3500 })
    }
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contentProviderAdapter = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
exports.contentProviderAdapter = {
    generatePreSignedURLForUpload: async (fileName, fileSHA) => {
        const config = {
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
            },
            region: process.env.AWS_DEFAULT_REGION,
        };
        const client = new client_s3_1.S3Client(config);
        const command = new client_s3_1.PutObjectCommand({
            Bucket: process.env.BUCKET,
            Key: `${fileSHA}${fileName}`
        });
        return (0, s3_request_presigner_1.getSignedUrl)(client, command, { expiresIn: 3500 });
    },
    generatePreSignedURLForDownload: async (fileName, fileSHA) => {
        const config = {
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
            },
            region: process.env.AWS_DEFAULT_REGION,
        };
        const client = new client_s3_1.S3Client(config);
        const command = new client_s3_1.GetObjectCommand({
            Bucket: process.env.BUCKET,
            Key: `${fileSHA}${fileName}`
        });
        return (0, s3_request_presigner_1.getSignedUrl)(client, command, { expiresIn: 3500 });
    }
};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contentProviderAdapter = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
exports.contentProviderAdapter = {
    generatePreSignedURLForUpload: async (fileName) => {
        const config = {
            credentials: {
                accessKeyId: process.env.ACCESS_KEY_ID,
                secretAccessKey: process.env.SECRET_ACCESS_KEY
            },
            region: process.env.REGION,
        };
        const client = new client_s3_1.S3Client(config);
        const command = new client_s3_1.PutObjectCommand({
            Bucket: process.env.BUCKET,
            Key: fileName
        });
        return (0, s3_request_presigner_1.getSignedUrl)(client, command, { expiresIn: 3500 });
    },
    generatePreSignedURLForDownload: async (fileName) => {
        const config = {
            credentials: {
                accessKeyId: process.env.ACCESS_KEY_ID,
                secretAccessKey: process.env.SECRET_ACCESS_KEY
            },
            region: process.env.REGION,
        };
        const client = new client_s3_1.S3Client(config);
        const command = new client_s3_1.GetObjectCommand({
            Bucket: process.env.BUCKET,
            Key: fileName
        });
        return (0, s3_request_presigner_1.getSignedUrl)(client, command, { expiresIn: 3500 });
    }
};

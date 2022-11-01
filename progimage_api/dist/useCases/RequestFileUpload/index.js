"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const factory = (dependencies) => async (fileSHA, fileName) => {
    const { progImageGateway, contentProviderAdapter, } = dependencies;
    const existingFileEntry = await progImageGateway.getEntry(fileSHA);
    if (existingFileEntry && existingFileEntry.getVerificationStatus())
        throw new Error('Trying to re-upload an existing file');
    const presignedURL = await contentProviderAdapter.generatePreSignedURLForUpload(fileName, fileSHA);
    if (!existingFileEntry) {
        await progImageGateway.createNewFile(fileSHA, fileName).catch(err => {
            throw new Error('Unable to register file');
        });
    }
    return presignedURL;
};
exports.default = factory;

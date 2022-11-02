"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const factory = (dependencies) => async (fileSHA, fileName) => {
    const { progImageGateway, contentProviderAdapter, } = dependencies;
    const existingFileEntry = await progImageGateway.getEntry(fileSHA);
    if (existingFileEntry)
        throw new Error('Trying to re-upload an existing file');
    const presignedURL = await contentProviderAdapter.generatePreSignedURLForUpload(fileName, fileSHA);
    if (!existingFileEntry) {
        await progImageGateway.createNewFile(fileSHA, fileName);
    }
    return presignedURL;
};
exports.default = factory;

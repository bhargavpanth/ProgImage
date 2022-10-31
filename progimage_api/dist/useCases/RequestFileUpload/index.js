"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const factory = (dependencies) => async (fileSHA, fileName) => {
    const { progImageGateway, contentProviderAdapter, } = dependencies;
    console.log('File upload use case');
    const existingFileEntry = await progImageGateway.getEntry(fileSHA);
    console.log({ existingFileEntry });
    if (existingFileEntry || existingFileEntry?.getVerificationStatus())
        throw new Error('Trying to re-upload an existing file');
    const presignedURL = await contentProviderAdapter.generatePreSignedURLForUpload(fileName);
    await progImageGateway.createNewFile(fileSHA, fileName).catch(err => {
        throw new Error('Unable to register file');
    });
    return presignedURL;
};
exports.default = factory;

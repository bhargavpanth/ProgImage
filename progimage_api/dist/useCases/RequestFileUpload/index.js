"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const factory = (dependencies) => async (fileSHA, fileName) => {
    const { progImageGateway, contentProviderAdapter, } = dependencies;
    const existingFileEntry = await progImageGateway.getEntry(fileSHA);
    if (existingFileEntry && existingFileEntry.getVerificationStatus())
        throw new Error('Trying to re-upload an existing file');
    return contentProviderAdapter.generatePreSignedURLForUpload(fileName);
};
exports.default = factory;

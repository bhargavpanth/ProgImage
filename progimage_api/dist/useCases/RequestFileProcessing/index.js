"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const factory = (dependencies) => async (fileSHA, processOptions, formatOption) => {
    const { progImageGateway, contentProviderAdapter, imageProcessorAdapter } = dependencies;
    const existingFileEntry = await progImageGateway.getEntry(fileSHA);
    // if (!existingFileEntry || !existingFileEntry.getVerificationStatus())
    if (!existingFileEntry)
        throw new Error('Trying to process a file that doesnt exist. Upload file to repository before you can request for processing');
    const fileName = await imageProcessorAdapter.processImage(fileSHA, processOptions, formatOption).catch(err => {
        throw new Error("Unable to process image");
    });
    return contentProviderAdapter.generatePreSignedURLForDownload(fileName, fileSHA);
};
exports.default = factory;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const factory = (dependencies) => async (fileSHA) => {
    const { progImageGateway, contentProviderAdapter } = dependencies;
    const existingFileEntry = await progImageGateway.getEntry(fileSHA);
    if (!existingFileEntry)
        throw new Error('Trying to download a file that doesnt exist');
    const fileName = existingFileEntry.model.fileName;
    return contentProviderAdapter.generatePreSignedURLForDownload(fileName);
};
exports.default = factory;

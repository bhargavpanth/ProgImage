export interface ContentProviderAdapter {
    generatePreSignedURLForUpload(fileName: string, fileSHA: string): Promise<string>
    generatePreSignedURLForDownload(fileName: string, fileSHA: string): Promise<string>
}

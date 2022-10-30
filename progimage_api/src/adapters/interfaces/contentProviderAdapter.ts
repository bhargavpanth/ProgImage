export interface ContentProviderAdapter {
    generatePreSignedURLForUpload(fileName: string): Promise<string>
    generatePreSignedURLForDownload(fileName: string): Promise<string>
}

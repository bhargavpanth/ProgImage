export interface ImageProcessingAdapter {
	processImage(
        fileId: string,
        processOptions: Array<ProcessOptions>,
        formatOption: FormatOption 
    ): Promise<string>
}

export enum ProcessOptions {
    grayscale = "grayscale",
    thumbnail = "thumbnail"
}

export enum FormatOption {
    png = "PNG",
    jpeg = "JPEG"
}

export type ImageProcessorResponse = {
    fileId: string
}

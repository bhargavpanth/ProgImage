"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageProcessingAdapter = void 0;
const axios_1 = __importDefault(require("axios"));
exports.imageProcessingAdapter = {
    processImage: async (fileId, processOptions, formatOption) => {
        const imageProcessingServiceURL = process.env.IMAGE_PROCESSING_SERVICE_URL;
        if (!imageProcessingServiceURL)
            throw new Error("image processing micro service is down");
        const processingOptions = processOptions.map(option => `options=${option}&`).reduce((acc, val) => acc + val, '');
        const serviceRequest = `${imageProcessingServiceURL}/transform/${fileId}?${processingOptions}format=${formatOption}`;
        return axios_1.default.get(serviceRequest).then(res => res.data);
    }
};

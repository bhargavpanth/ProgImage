"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const entityGateway_1 = require("../entityGateway");
const contentProviderAdapter_1 = require("../adapters/contentProviderAdapter");
const imageProcessingAdapter_1 = require("../adapters/imageProcessingAdapter");
const useCases_1 = __importDefault(require("../useCases"));
function upload(req, res, next) {
    const fileSHA = req.params.file_SHA;
    const fileName = req.params.file_name;
    if (!fileSHA || !fileName)
        res.sendStatus(400);
    const useCase = (0, useCases_1.default)({
        progImageGateway: entityGateway_1.progImageGateway,
        contentProviderAdapter: contentProviderAdapter_1.contentProviderAdapter,
        imageProcessingAdapter: imageProcessingAdapter_1.imageProcessingAdapter
    });
    return useCase.requestFileUpload(fileSHA, fileName)
        .then(preSignedURL => res.send({ url: preSignedURL }))
        .catch(err => res.sendStatus(500));
}
exports.upload = upload;

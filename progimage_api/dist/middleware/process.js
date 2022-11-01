"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.process = void 0;
const entityGateway_1 = require("../entityGateway");
const contentProviderAdapter_1 = require("../adapters/contentProviderAdapter");
const imageProcessingAdapter_1 = require("../adapters/imageProcessingAdapter");
const useCases_1 = __importDefault(require("../useCases"));
function process(req, res, next) {
    const fileSHA = req.params.file_SHA;
    if (!fileSHA)
        res.sendStatus(400);
    const processOptions = req.query.process;
    const formatOptions = req.query.format;
    if (!processOptions && !formatOptions)
        res.sendStatus(400);
    const useCase = (0, useCases_1.default)({
        progImageGateway: entityGateway_1.progImageGateway,
        contentProviderAdapter: contentProviderAdapter_1.contentProviderAdapter,
        imageProcessingAdapter: imageProcessingAdapter_1.imageProcessingAdapter
    });
    return useCase.requestFileProcessing(fileSHA, processOptions, formatOptions)
        .then(preSignedURL => res.send({ url: preSignedURL }))
        .catch(err => res.sendStatus(500));
}
exports.process = process;

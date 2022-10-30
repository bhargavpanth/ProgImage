"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RequestFileUpload_1 = __importDefault(require("./RequestFileUpload"));
const RequestFileDownload_1 = __importDefault(require("./RequestFileDownload"));
const RequestFileProcessing_1 = __importDefault(require("./RequestFileProcessing"));
exports.default = (dependencies) => {
    return {
        requestFileUpload: (0, RequestFileUpload_1.default)(dependencies),
        requestFileDownload: (0, RequestFileDownload_1.default)(dependencies),
        requestFileProcessing: (0, RequestFileProcessing_1.default)(dependencies)
    };
};

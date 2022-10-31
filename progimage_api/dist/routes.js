"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authentication_1 = require("./middleware/authentication");
const authorization_1 = require("./middleware/authorization");
const download_1 = require("./middleware/download");
const upload_1 = require("./middleware/upload");
const process_1 = require("./middleware/process");
const router = express_1.default.Router();
router.get('/upload/:file_SHA/name/:file_name', authentication_1.authenticate, authorization_1.authorize, upload_1.upload);
router.get('/download/:file_SHA', authentication_1.authenticate, authorization_1.authorize, download_1.download);
router.get('/process/:file_SHA', authentication_1.authenticate, authorization_1.authorize, process_1.process);
exports.default = router;

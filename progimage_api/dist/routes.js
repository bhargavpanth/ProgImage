"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authentication_1 = require("./middleware/authentication");
const authorization_1 = require("./middleware/authorization");
const router = express_1.default.Router();
router.post('/upload', authentication_1.authenticate, authorization_1.authorize);
router.get('/customer/:customerId/slow', authentication_1.authenticate, authorization_1.authorize);
exports.default = router;

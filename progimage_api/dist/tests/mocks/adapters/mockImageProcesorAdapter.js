"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMockImageProcessorAdapter = void 0;
const utils_1 = require("../utils");
const defaultMock = {
    async processImage() {
        return Promise.resolve('fileName');
    }
};
exports.getMockImageProcessorAdapter = (0, utils_1.makeMockDependencyFactory)(defaultMock);

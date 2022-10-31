"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeMockDependencyFactory = exports.makeSpiableProgImage = exports.makeSpiableGateway = void 0;
const sinon_1 = __importDefault(require("sinon"));
const progImage_1 = require("../../entity/progImage");
function makeSpiableGateway(mock) {
    Object.keys(mock).forEach(key => {
        sinon_1.default.spy(mock, key);
    });
    return mock;
}
exports.makeSpiableGateway = makeSpiableGateway;
function makeSpiableProgImage(mock) {
    Object.getOwnPropertyNames(progImage_1.ProgImage.prototype).forEach(key => {
        sinon_1.default.spy(mock, key);
    });
    return mock;
}
exports.makeSpiableProgImage = makeSpiableProgImage;
const makeMockDependencyFactory = (defaultMock) => (overrides) => makeSpiableGateway({ ...defaultMock, ...overrides });
exports.makeMockDependencyFactory = makeMockDependencyFactory;

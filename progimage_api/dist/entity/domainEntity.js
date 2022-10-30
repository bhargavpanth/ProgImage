"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainEntity = void 0;
const lodash_1 = require("lodash");
class DomainEntity {
    model;
    constructor(model) {
        this.model = (0, lodash_1.cloneDeep)(model);
    }
}
exports.DomainEntity = DomainEntity;

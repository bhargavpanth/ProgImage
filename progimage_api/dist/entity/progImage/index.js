"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgImage = void 0;
const domainEntity_1 = require("../domainEntity");
class ProgImage extends domainEntity_1.DomainEntity {
    getVerificationStatus() {
        return this.model.verified;
    }
    getId() {
        return this.model.id;
    }
}
exports.ProgImage = ProgImage;

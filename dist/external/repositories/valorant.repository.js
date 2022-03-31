"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValorantRepository = void 0;
const tslib_1 = require("tslib");
const valorant_1 = (0, tslib_1.__importDefault)(require("../api/valorant"));
class ValorantRepository {
    api;
    actId;
    constructor() {
        this.api = valorant_1.default;
        this.actId = 'd929bc38-4ab6-7da4-94f0-ee84f8ac141e';
    }
    getLeaderboards(leaderParams) {
        const defaultParams = { size: 10, startIndex: 0 };
        const params = {
            params: leaderParams || defaultParams,
        };
        return this.api.get(`/ranked/v1/leaderboards/by-act/${this.actId}`, params);
    }
}
exports.ValorantRepository = ValorantRepository;

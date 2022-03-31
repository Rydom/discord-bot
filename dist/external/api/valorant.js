"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const axios_1 = (0, tslib_1.__importDefault)(require("axios"));
const api = axios_1.default.create({
    baseURL: process.env.VALORANT_API_HOST,
    headers: {
        'X-Riot-Token': process.env.VALORANT_API_TOKEN,
    },
});
exports.default = api;

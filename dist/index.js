"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
require('dotenv').config();
const client_1 = require("./structures/client");
exports.client = new client_1.ExtendedClient();
exports.client.start();

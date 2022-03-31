"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const event_1 = require("../structures/event");
const __1 = require("..");
//@ts-ignore
exports.default = new event_1.Event('raw', (packet) => {
    __1.client.manager.updateVoiceState(packet);
});

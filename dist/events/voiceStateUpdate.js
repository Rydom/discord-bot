"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const event_1 = require("../structures/event");
const __1 = require("..");
exports.default = new event_1.Event('voiceStateUpdate', (oldState, newState) => {
    // Verifica se algúem se conectou ou desconectou
    if (oldState.channelId === null || typeof oldState.channelId == 'undefined')
        return;
    // Verifica se é o bot que foi disconectado
    if (newState.id !== __1.client.user.id)
        return;
    const player = __1.client.manager.get(newState.guild.id);
    if (!player)
        return;
    const queue = player.queue;
    queue.clear();
    player.stop();
});

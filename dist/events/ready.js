"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const event_1 = require("../structures/event");
exports.default = new event_1.Event('ready', (client) => {
    console.log(`Bot ${client.user.username} logado com sucesso em ${client.guilds.cache.size} servidores`);
    client.manager.init(client.user.id);
});

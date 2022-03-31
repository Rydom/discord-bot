"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const erela_js_1 = require("erela.js");
exports.default = (client) => {
    return new erela_js_1.Manager({
        nodes: [
            {
                host: process.env.LAVALINK_HOST ?? 'localhost',
                password: process.env.LAVALINK_PASS ?? 'lavalink1234',
                port: 443,
                secure: true,
                // retryDelay: 5000,
            },
        ],
        send: (id, payload) => {
            const guild = client.guilds.cache.get(id);
            if (guild)
                guild.shard.send(payload);
        },
    })
        .on('nodeConnect', node => console.log(`Node "${node.options.identifier}" conectado.`))
        .on('nodeError', (node, error) => console.log(`Node "${node.options.identifier}" encountered an error: ${error.message}.`))
        .on('trackStart', (player, track) => {
        const channel = client.channels.cache.get(player.textChannel);
        const requester = track.requester;
        channel.send(`Tocando agora: \`${track.title}\`, solicitado por \`${requester.tag.toString()}\`.`);
    })
        .on('queueEnd', player => {
        const channel = client.channels.cache.get(player.textChannel);
        channel.send('A fila acabou.');
        player.destroy();
    });
};

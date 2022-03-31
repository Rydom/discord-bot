"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("../../structures/command");
exports.default = new command_1.Command({
    name: 'ping',
    description: 'replies with pong',
    run: async ({ interaction }) => {
        interaction.followUp('Pong');
    },
});

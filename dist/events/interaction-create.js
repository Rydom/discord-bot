"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const event_1 = require("../structures/event");
exports.default = new event_1.Event('interactionCreate', async (interaction) => {
    // Chat Input Commands
    if (interaction.isCommand()) {
        await interaction.deferReply();
        const command = __1.client.commands.get(interaction.commandName);
        if (!command)
            return interaction.followUp('You have used a non existent command');
        command.run({
            args: interaction.options,
            client: __1.client,
            interaction: interaction,
        });
    }
});

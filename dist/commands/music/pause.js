"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("../../structures/command");
exports.default = new command_1.Command({
    name: 'pause',
    description: 'Pausa a música que está tocando',
    run: async ({ interaction, client }) => {
        const player = client.manager.get(interaction.guild.id);
        if (!player) {
            return interaction.followUp({
                content: 'Não estou tocando nenhuma música neste servidor',
                ephemeral: true,
            });
        }
        const memberVoiceChannel = interaction.member.voice.channel;
        if (!memberVoiceChannel) {
            return interaction.followUp({
                content: 'Você precisa estar em um canal de voz para usar este comando',
                ephemeral: true,
            });
        }
        if (memberVoiceChannel.id !== player.voiceChannel) {
            return interaction.followUp({
                content: 'Você precisa estar no mesmo canal de voz que eu',
                ephemeral: true,
            });
        }
        if (player.paused) {
            return interaction.followUp({
                content: 'A música já está pausada!',
                ephemeral: true,
            });
        }
        player.pause(true);
        return interaction.followUp({ content: 'Música pausada!' });
    },
});

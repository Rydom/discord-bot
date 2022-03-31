"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const command_1 = require("../../structures/command");
const format_1 = require("../../utils/format");
exports.default = new command_1.Command({
    name: 'queue',
    description: 'Exibe a fila de músicas atual',
    run: async ({ interaction, client }) => {
        const player = client.manager.get(interaction.guild.id);
        if (!player) {
            return interaction.followUp({
                content: 'Não estou tocando nenhuma música neste servidor',
                ephemeral: true,
            });
        }
        const queue = player.queue;
        const embed = new discord_js_1.MessageEmbed()
            .setTitle(`Fila de músicas do servidor`)
            .setColor('BLUE');
        const tracks = queue.slice(0, 10);
        if (queue.current)
            embed.addField(`Tocando agora:`, `[${queue.current.title}](${queue.current.uri}) (\`${(0, format_1.formatDuration)(queue.current.duration)}\`)`);
        if (!tracks.length) {
            embed.setDescription('Não há nenhuma música na fila');
        }
        else {
            embed.setDescription(tracks
                .map((t, idx) => {
                // return `\`${t.title}\``
                return `[${idx + 1}) ${t.title}](${t.uri}) (\`${(0, format_1.formatDuration)(t.duration)}\`)`;
            })
                .join('\n'));
        }
        return interaction.followUp({ embeds: [embed] });
    },
});

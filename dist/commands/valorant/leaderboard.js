"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const valorant_repository_1 = require("../../external/repositories/valorant.repository");
const command_1 = require("../../structures/command");
exports.default = new command_1.Command({
    name: 'leaderboard',
    description: 'replies with leaderboard of valorant players',
    run: async ({ interaction, client }) => {
        const description = await createLeaderList();
        const embed = new discord_js_1.MessageEmbed()
            .setTitle('Melhores jogadores de valorant')
            .setDescription(description);
        interaction.followUp({ embeds: [embed] });
        async function createLeaderList() {
            const leaderList = [];
            const leaderboard = await getLeaderboard();
            for (const player of leaderboard.players) {
                const item = {
                    rank: player.leaderboardRank,
                    name: player.gameName || 'Sem nome',
                };
                const rankPlayer = `${item.rank}) ${item.name}`;
                leaderList.push(rankPlayer);
            }
            return leaderList.join('\n');
        }
        async function getLeaderboard() {
            const valorantRepo = new valorant_repository_1.ValorantRepository();
            const leaderboard = await valorantRepo
                .getLeaderboards({ size: 15, startIndex: 0 })
                .then(res => res.data);
            return leaderboard;
        }
    },
});

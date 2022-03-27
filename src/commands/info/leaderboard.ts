import { MessageEmbed } from 'discord.js'
import { Command } from '../../structures/command'
import rankedPlayers from '../../utils/valorant'

type LeaderBoardItem = {
  rank: number
  name: string
}
export default new Command({
  name: 'leaderboard',
  description: 'replies with leaderboard of valorant players',
  run: async ({ interaction, client }) => {
    const embed = new MessageEmbed()
      .setTitle('Melhores jogadores de valorant')
      .setDescription(createLeaderList())

    interaction.followUp({ embeds: [embed] })

    function createLeaderList() {
      const leaderboard: string[] = []
      for (const player of rankedPlayers.players) {
        const item = {
          rank: player.leaderboardRank,
          name: player.gameName || 'Sem nome',
        }

        const rankPlayer = `${item.rank}) ${item.name}`
        leaderboard.push(rankPlayer)
      }

      return leaderboard.join('\n')
    }
  },
})

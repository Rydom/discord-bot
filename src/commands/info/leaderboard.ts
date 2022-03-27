import { MessageEmbed } from 'discord.js'
import {
  LeaderBoard,
  ValorantRepository,
} from '../../external/repositories/valorant.repository'
import { Command } from '../../structures/command'

type LeaderBoardItem = {
  rank: number
  name: string
}
export default new Command({
  name: 'leaderboard',
  description: 'replies with leaderboard of valorant players',
  run: async ({ interaction, client }) => {
    const description = await createLeaderList()
    const embed = new MessageEmbed()
      .setTitle('Melhores jogadores de valorant')
      .setDescription(description)

    interaction.followUp({ embeds: [embed] })

    async function createLeaderList() {
      const leaderList: string[] = []
      const leaderboard = await getLeaderboard()

      for (const player of leaderboard.players) {
        const item = {
          rank: player.leaderboardRank,
          name: player.gameName || 'Sem nome',
        }

        const rankPlayer = `${item.rank}) ${item.name}`
        leaderList.push(rankPlayer)
      }

      return leaderList.join('\n')
    }

    async function getLeaderboard() {
      const valorantRepo = new ValorantRepository()
      const leaderboard = await valorantRepo
        .getLeaderboards({ size: 15, startIndex: 0 })
        .then(res => res.data)

      return leaderboard
    }
  },
})

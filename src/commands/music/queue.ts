import { MessageEmbed } from 'discord.js'
import { Command } from '../../structures/command'
import { formatDuration } from '../../utils/format'

export default new Command({
  name: 'queue',
  description: 'Exibe a fila de músicas atual',
  run: async ({ interaction, client }) => {
    const player = client.manager.get(interaction.guild.id)
    if (!player) {
      return interaction.followUp({
        content: 'Não estou tocando nenhuma música neste servidor',
        ephemeral: true,
      })
    }

    const queue = player.queue
    const embed = new MessageEmbed()
      .setTitle(`Fila de músicas do servidor`)
      .setColor('BLUE')

    const tracks = queue.slice(0, 10)
    if (queue.current)
      embed.addField(
        `Tocando agora:`,
        `[${queue.current.title}](${queue.current.uri}) (\`${formatDuration(queue.current.duration)}\`)`
      )
    if (!tracks.length) {
      embed.setDescription('Não há nenhuma música na fila')
    } else {
      embed.setDescription(
        tracks
          .map((t, idx) => {
            // return `\`${t.title}\``
            return `[${idx + 1}) ${t.title}](${t.uri}) (\`${formatDuration(t.duration)}\`)`
          })
          .join('\n')
      )
    }

    return interaction.followUp({ embeds: [embed] })
  },
})

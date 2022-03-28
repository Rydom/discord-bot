import { Command } from '../../structures/command'

export default new Command({
  name: 'skip',
  description: 'Pula a música que está tocando',
  run: async ({ interaction, client }) => {
    const player = client.manager.get(interaction.guild.id)
    if (!player) {
      return interaction.followUp({
        content: 'Não estou tocando nenhuma música neste servidor',
        ephemeral: true,
      })
    }

    const memberVoiceChannel = interaction.member.voice.channel
    if (!memberVoiceChannel) {
      return interaction.followUp({
        content: 'Você precisa estar em um canal de voz para usar este comando',
        ephemeral: true,
      })
    }
    if (memberVoiceChannel.id !== player.voiceChannel) {
      return interaction.followUp({
        content: 'Você precisa estar no mesmo canal de voz que eu',
        ephemeral: true,
      })
    }
    if (!player.queue.current) {
      return interaction.followUp({
        content: 'Não tem nenhuma música tocando',
        ephemeral: true,
      })
    }

    const title = player.queue.current.title
    player.stop()

    return interaction.followUp({
      content: `Música \`${title}\` pulada por ${interaction.user.toString()}`,
    })
  },
})

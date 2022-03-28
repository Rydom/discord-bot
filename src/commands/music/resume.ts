import { Command } from '../../structures/command'

export default new Command({
  name: 'resume',
  description: 'Retorna a música pausada',
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
    if (!player.paused) {
      return interaction.followUp({
        content: 'A música não está pausada!',
        ephemeral: true,
      })
    }

    player.pause(false)
    return interaction.followUp({ content: 'Música resumida!' })
  },
})

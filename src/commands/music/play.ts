import { SearchResult } from 'erela.js'
import { Command } from '../../structures/command'

export default new Command({
  name: 'play',
  description: 'Faz com que o bot toque uma música no canal em que você está',
  options: [
    {
      name: 'música',
      description: 'Música que você deseja que o bot toque',
      type: 'STRING',
      required: true,
    },
  ],
  run: async ({ interaction, client }) => {
    if (!interaction.member.voice.channel) {
      return interaction.followUp({
        content:
          'Você precisa estar em um canal de voz para utilizar este comando!',
        ephemeral: true,
      })
    }

    if (
      interaction.guild.me.voice.channel &&
      interaction.guild.me.voice.channel.id !==
        interaction.member.voice.channel.id
    ) {
      return interaction.followUp({
        content:
          'Você precisa estar no mesmo canal de voz que eu para utilizar este comando!',
        ephemeral: true,
      })
    }

    const search = interaction.options.getString('música')
    let res: SearchResult

    try {
      res = await client.manager.search(search, interaction.user)
      if (res.loadType === 'LOAD_FAILED') throw res.exception
      else if (res.loadType === 'PLAYLIST_LOADED')
        throw { message: 'Playlist não são suportadas neste comando' }
    } catch (err) {
      return interaction.followUp({
        content: `Aconteceu um erro ao tentar buscar a música: ${err.message}`,
        ephemeral: true,
      })
    }

    const [firstMusic] = res?.tracks
    if (!firstMusic) {
      return interaction.followUp({
        content: 'Música não encontrada',
        ephemeral: true,
      })
    }

    const player = client.manager.create({
      guild: interaction.guild.id,
      voiceChannel: interaction.member.voice.channel.id,
      textChannel: interaction.channel.id,
    })
    if (player.state !== 'CONNECTED') player.connect()
    player.queue.add(firstMusic)

    if (!player.playing && !player.paused) player.play()

    return interaction.followUp({
      content: `\`${firstMusic.title}\` adicionada à fila`,
    })
  },
})

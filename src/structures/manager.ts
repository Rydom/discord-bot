import { TextChannel } from 'discord.js'
import { Manager } from 'erela.js'
import { ExtendedClient } from './client'

type Requester = {
  tag: string
}

export default (client: ExtendedClient) => {
  return new Manager({
    nodes: [
      {
        host: process.env.LAVALINK_HOST ?? 'localhost',
        password: process.env.LAVALINK_PASS ?? 'lavalink1234',
        port: 443,
        secure: true,
        // retryDelay: 5000,
      },
    ],
    send: (id, payload) => {
      const guild = client.guilds.cache.get(id)
      if (guild) guild.shard.send(payload)
    },
  })
    .on('nodeConnect', node =>
      console.log(`Node "${node.options.identifier}" conectado.`)
    )
    .on('nodeError', (node, error) =>
      console.log(
        `Node "${node.options.identifier}" encountered an error: ${error.message}.`
      )
    )
    .on('trackStart', (player, track) => {
      const channel = client.channels.cache.get(
        player.textChannel
      ) as TextChannel
      const requester = track.requester as Requester
      channel.send(
        `Tocando agora: \`${
          track.title
        }\`, solicitado por \`${requester.tag.toString()}\`.`
      )
    })
    .on('queueEnd', player => {
      const channel = client.channels.cache.get(
        player.textChannel
      ) as TextChannel
      channel.send('A fila acabou.')
      player.destroy()
    })
}

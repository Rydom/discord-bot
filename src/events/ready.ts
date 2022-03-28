import { ExtendedClient } from '../structures/client'
import { Event } from '../structures/event'
export default new Event('ready', (client: ExtendedClient) => {
  console.log(
    `Bot ${client.user.username} logado com sucesso em ${client.guilds.cache.size} servidores`
  )
  client.manager.init(client.user.id)
})

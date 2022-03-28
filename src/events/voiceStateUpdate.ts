import { ExtendedClient } from '../structures/client'
import { Event } from '../structures/event'
import { client } from '..'
export default new Event('voiceStateUpdate', (oldState, newState) => {
  // Verifica se algúem se conectou ou desconectou
  if (oldState.channelId === null || typeof oldState.channelId == 'undefined')
    return
  // Verifica se é o bot que foi disconectado
  if (newState.id !== client.user.id) return

  const player = client.manager.get(newState.guild.id)
  if (!player) return

  const queue = player.queue
  queue.clear()
  player.stop()
})

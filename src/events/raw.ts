import { Event } from '../structures/event'
import { client } from '..'
import { VoicePacket } from 'erela.js'
//@ts-ignore
export default new Event('raw', (packet: VoicePacket) => {
  client.manager.updateVoiceState(packet)
})

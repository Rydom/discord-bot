import {
  ApplicationCommandDataResolvable,
  Client,
  ClientEvents,
  Collection,
  Intents,
} from 'discord.js'
import { CommandType } from '../typings/command'
import glob from 'glob'
import { promisify } from 'util'
import { RegisterCommandsOptions } from '../typings/client'
import { Event } from './event'
import erelaManager from './manager'
import { Manager } from 'erela.js'

const globPromise = promisify(glob)

export class ExtendedClient extends Client {
  commands: Collection<string, CommandType> = new Collection()
  manager: Manager

  constructor() {
    const ALL_INTENTS: number = 32767
    super({ intents: ALL_INTENTS })
    this.manager = erelaManager(this)
  }

  start() {
    this.registerModules()
    this.login(process.env.BOT_TOKEN)
  }
  async importFile(filePath: string) {
    return (await import(filePath))?.default
  }

  async registerCommands({ commands, guildId }: RegisterCommandsOptions) {
    if (guildId) {
      // this.guilds.cache.get(guildId).commands.permissions.add({
      //   command: '',
      //   permissions: [{
      //     id: '955163514719330314',
      //     type: 'USER',
      //     permission: true
      //   }]
      // })
      this.guilds.cache.get(guildId)?.commands.set(commands)
      console.log(`Registering commands to ${guildId}`)
    } else {
      this.application?.commands.set(commands)
      console.log('Registering global commands')
    }
  }

  async registerModules() {
    // Commands
    const slashCommands: ApplicationCommandDataResolvable[] = []
    const commandFiles = await globPromise(
      `${__dirname}/../commands/*/*{.ts,.js}`
    )
    commandFiles.forEach(async filePath => {
      const command: CommandType = await this.importFile(filePath)
      if (!command.name) return
      console.log(command)

      this.commands.set(command.name, command)
      slashCommands.push(command)
    })

    this.on('ready', () => {
      this.registerCommands({
        commands: slashCommands,
        guildId: process.env.GUILD_ID,
      })
    })

    // Event
    const eventFiles = await globPromise(`${__dirname}/../events/*{.ts,.js}`)
    eventFiles.forEach(async filePath => {
      const event: Event<keyof ClientEvents> = await this.importFile(filePath)
      this.on(event.event, event.run)
    })
  }
}

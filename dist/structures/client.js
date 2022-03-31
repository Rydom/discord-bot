"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtendedClient = void 0;
const tslib_1 = require("tslib");
const discord_js_1 = require("discord.js");
const glob_1 = (0, tslib_1.__importDefault)(require("glob"));
const util_1 = require("util");
const manager_1 = (0, tslib_1.__importDefault)(require("./manager"));
const globPromise = (0, util_1.promisify)(glob_1.default);
class ExtendedClient extends discord_js_1.Client {
    commands = new discord_js_1.Collection();
    manager;
    constructor() {
        const ALL_INTENTS = 32767;
        super({ intents: ALL_INTENTS });
        this.manager = (0, manager_1.default)(this);
    }
    start() {
        this.registerModules();
        this.login(process.env.BOT_TOKEN);
    }
    async importFile(filePath) {
        return (await Promise.resolve().then(() => (0, tslib_1.__importStar)(require(filePath))))?.default;
    }
    async registerCommands({ commands, guildId }) {
        if (guildId) {
            // this.guilds.cache.get(guildId).commands.permissions.add({
            //   command: '',
            //   permissions: [{
            //     id: '955163514719330314',
            //     type: 'USER',
            //     permission: true
            //   }]
            // })
            this.guilds.cache.get(guildId)?.commands.set(commands);
            console.log(`Registering commands to ${guildId}`);
        }
        else {
            this.application?.commands.set(commands);
            console.log('Registering global commands');
        }
    }
    async registerModules() {
        // Commands
        const slashCommands = [];
        const commandFiles = await globPromise(`${__dirname}/../commands/*/*{.ts,.js}`);
        commandFiles.forEach(async (filePath) => {
            const command = await this.importFile(filePath);
            if (!command.name)
                return;
            console.log(command);
            this.commands.set(command.name, command);
            slashCommands.push(command);
        });
        this.on('ready', () => {
            this.registerCommands({
                commands: slashCommands,
                guildId: process.env.GUILD_ID,
            });
        });
        // Event
        const eventFiles = await globPromise(`${__dirname}/../events/*{.ts,.js}`);
        eventFiles.forEach(async (filePath) => {
            const event = await this.importFile(filePath);
            this.on(event.event, event.run);
        });
    }
}
exports.ExtendedClient = ExtendedClient;

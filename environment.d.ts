declare global {
  namespace NodeJS {
    interface ProcessEnv {
      BOT_TOKEN: string
      GUILD_ID: string
      ENVIRONMENT: 'dev' | 'prod' | 'debug'
      VALORANT_API_HOST: string
      VALORANT_API_TOKEN: string
    }
  }
}

export {}

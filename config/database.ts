import Env from '@ioc:Adonis/Core/Env'
import { DatabaseConfig } from '@ioc:Adonis/Lucid/Database'
import Url from 'url-parse'

const DATABASE_URL = new Url(Env.get('DATABASE_URL'))

const databaseConfig: DatabaseConfig = {
  connection: Env.get('DB_CONNECTION'),

  connections: {
    prod: {
      client: 'pg',
      connection: {
        host: Env.get('DB_HOST', DATABASE_URL.hostname),
        port: Env.get('DB_PORT', DATABASE_URL.port),
        user: Env.get('DB_USER', DATABASE_URL.username),
        password: Env.get('DB_PASSWORD', DATABASE_URL.password),
        database: Env.get('DB_DATABASE', DATABASE_URL.pathname.substr(1)),
        ssl: {
          rejectUnauthorized: false,
        },
      },
    },

    pg: {
      client: 'pg',
      connection: {
        host: Env.get('PG_HOST'),
        port: Env.get('PG_PORT'),
        user: Env.get('PG_USER'),
        password: Env.get('PG_PASSWORD'),
        database: Env.get('PG_DB_NAME'),
      },
      migrations: {
        naturalSort: true,
      },
      healthCheck: false,
      debug: false,
    },
  },
}

export default databaseConfig

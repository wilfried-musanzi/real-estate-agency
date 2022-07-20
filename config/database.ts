/**
 * Config source: https://git.io/JesV9
 *
 * Feel free to let us know via PR, if you find something broken in this config
 * file.
 */

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
        host: DATABASE_URL.hostname as string,
        port: Number(DATABASE_URL.port),
        user: DATABASE_URL.username as string,
        password: DATABASE_URL.password as string,
        database: DATABASE_URL.pathname.substr(1) as string,
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
        password: Env.get('PG_PASSWORD', ''),
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

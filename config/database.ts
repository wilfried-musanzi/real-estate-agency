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
    pg: {
      client: 'pg',
      connection: {
        host: Env.get('DB_HOST', DATABASE_URL.hostname),
        port: Env.get('DB_PORT', DATABASE_URL.port),
        user: Env.get('DB_USER', DATABASE_URL.username),
        password: Env.get('DB_PASSWORD', DATABASE_URL.password),
        database: Env.get('DB_DATABASE', DATABASE_URL.pathname.substr(1)),
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

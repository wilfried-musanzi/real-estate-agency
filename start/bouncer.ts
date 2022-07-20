import Bouncer from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/User'
import { userHasRoles } from 'App/Services/UserRoleService'

export const { actions } = Bouncer.define('accedToAdminPanel', (user: User) =>
  userHasRoles(['admin'], user)
)

export const { policies } = Bouncer.registerPolicies({})

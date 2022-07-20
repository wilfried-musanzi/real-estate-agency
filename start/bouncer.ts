import Bouncer from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/User'

export const { actions } = Bouncer.define(
  'accedToAdminPanel',
  (user: User) => user.role === 'admin'
)

export const { policies } = Bouncer.registerPolicies({})

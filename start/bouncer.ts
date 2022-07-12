import User from 'App/Models/User'
import Bouncer from '@ioc:Adonis/Addons/Bouncer'

export const { actions } = Bouncer.define('accedToAdminPanel', (user: User) => user.role == 'admin')

export const { policies } = Bouncer.registerPolicies({})

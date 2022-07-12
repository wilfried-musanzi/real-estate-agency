import User from 'App/Models/User'
import Factory from '@ioc:Adonis/Lucid/Factory'

export default Factory.define(User, () => {
  return {
    email: 'admin@admin.com',
    password: '1234',
    role: 'admin',
  }
}).build()

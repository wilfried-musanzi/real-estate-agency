import Factory from '@ioc:Adonis/Lucid/Factory'
import Municipality from 'App/Models/Municipality'

export default Factory.define(Municipality, ({ faker }) => {
  return {
    name: faker.address.cityName(),
  }
}).build()

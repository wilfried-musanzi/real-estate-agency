import Property from 'App/Models/Property'
import Factory from '@ioc:Adonis/Lucid/Factory'
import MunicipaliyFactory from './MunicipaliyFactory'

export default Factory.define(Property, ({ faker }) => {
  return {
    title: faker.company.companyName(),
    description: faker.lorem.sentences(2),
    price: faker.datatype.number({ min: 500, max: 1000 }),
    surface: faker.datatype.number({ min: 50, max: 100 }),
  }
})
  .relation('municipality', () => MunicipaliyFactory)
  .build()

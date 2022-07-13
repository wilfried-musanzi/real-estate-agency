import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import PropertyFactory from 'Database/factories/PropertyFactory'

export default class extends BaseSeeder {
  public async run() {
    await PropertyFactory.createMany(100)
  }
}

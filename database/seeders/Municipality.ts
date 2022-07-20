import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import MunicipaliyFactory from 'Database/factories/MunicipaliyFactory'

export default class extends BaseSeeder {
  public async run() {
    await MunicipaliyFactory.createMany(6)
  }
}

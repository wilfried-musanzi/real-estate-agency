import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Property from 'App/Models/Property'

export default class HomeController {
  async index({ view }: HttpContextContract) {
    const properties = await Database.from(Property.table)
      .orderBy('id', 'asc')
      .where('reserved', false)
      .limit(5)
    return view.render('home/index', {
      controller: 'homeController',
      properties,
    })
  }
}

import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Property from 'App/Models/Property'

export default class PropertiesController {
  async index({ view, request }: HttpContextContract) {
    const page = request.input('page', 1)
    const limit = 12
    const properties = await Database.from(Property.table)
      .orderBy('id', 'asc')
      .where('reserved', false)
      .paginate(page, limit)
    properties.baseUrl('/properties')
    return view.render('home/properties', {
      controller: 'propertiesController',
      properties,
      page,
    })
  }
}

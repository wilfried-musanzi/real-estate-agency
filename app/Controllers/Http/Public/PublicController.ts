import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Property from 'App/Models/Property'

export default class HomeController {
  async index({ view }: HttpContextContract) {
    const properties = await Property.query()
      .orderBy('id', 'asc')
      .preload('municipality')
      .where('reserved', false)
      .limit(3)
    return view.render('public/home', {
      controller: 'homeController',
      properties,
    })
  }

  async properties({ view, request }: HttpContextContract) {
    const page = request.input('page', 1)
    const limit = 12
    const properties = await Property.query()
      .orderBy('id', 'asc')
      .preload('municipality')
      .where('reserved', false)
      .paginate(page, limit)
    properties.baseUrl('/immeubles')
    return view.render('public/properties', {
      controller: 'propertiesController',
      properties,
      page,
    })
  }
}

import Application from '@ioc:Adonis/Core/Application'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Property from 'App/Models/Property'
import Drive from '@ioc:Adonis/Core/Drive'
import PropertyValidator from 'App/Validators/PropertyValidator'
import Municipality from 'App/Models/Municipality'

export default class AdminProperty {
  async index({ view, request }: HttpContextContract) {
    const limit = 10
    const page = request.input('page', 1)
    const properties = await Property.query()
      .orderBy('id', 'asc')
      .preload('municipality')
      .paginate(page, limit)

    properties.baseUrl('/admin/property')
    return view.render('admin/property/index', {
      page,
      properties,
      controller: 'adminPropertyController',
    })
  }

  async createView({ view }: HttpContextContract) {
    const property = new Property()
    const municipalities = await Municipality.all()
    return view.render('admin/property/new', {
      property,
      municipalities,
      controller: 'adminPropertyController',
    })
  }

  async create({ params, request, session, response }: HttpContextContract) {
    await this.handleRequest(params, request)
    session.flash({ success: 'The property has been created successfully !' })
    return response.redirect().toRoute('property.index', {
      controller: 'adminPropertyController',
    })
  }

  async updateView({ view, params }: HttpContextContract) {
    const property = await Property.findOrFail(params.id)
    const municipalities = await Municipality.all()
    return view.render('admin/property/edit', {
      property,
      municipalities,
      controller: 'adminPropertyController',
    })
  }

  async update({ params, request, session, response }: HttpContextContract) {
    await this.handleRequest(params, request)
    session.flash({ success: 'The property has been updated successfully !' })
    return response.redirect().toRoute('property.index', {
      controller: 'adminPropertyController',
    })
  }

  async delete({ params, session, response }: HttpContextContract) {
    const property = await Property.findOrFail(params.id)
    property.delete()
    session.flash({ success: 'The property has been updated deleted !' })
    return response.redirect().toRoute('property.index', {
      controller: 'adminPropertyController',
    })
  }

  async handleRequest(
    params: HttpContextContract['params'],
    request: HttpContextContract['request']
  ) {
    const id = params.id
    const property = id ? await Property.findOrFail(id) : new Property()
    const payload = await request.validate(PropertyValidator)
    const thumb = request.file('thumb')
    if (thumb) {
      if (property.thumb) {
        await Drive.delete(property.thumb)
      }
      await thumb.move(Application.resourcesPath('images'))
    }
    property
      .merge({ ...payload, reserved: payload.reserved || false, thumb: thumb?.fileName })
      .save()
  }
}

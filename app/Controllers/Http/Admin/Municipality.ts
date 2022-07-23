import Municipality from 'App/Models/Municipality'
import Database from '@ioc:Adonis/Lucid/Database'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import MunicipalityValidator from 'App/Validators/MunicipalityValidator'

export default class AdminCategory {
  public async index({ view }: HttpContextContract) {
    const municipalities = await Database.from(Municipality.table)
    return view.render('admin/municipality/index', {
      municipalities,
    })
  }
  public view({ view }: HttpContextContract) {
    return view.render('admin/municipality/new')
  }

  public async addNew({ request, session, response }: HttpContextContract) {
    const payload = await request.validate(MunicipalityValidator)
    await Municipality.create(payload)
    session.flash({ success: 'La commune a été créée' })
    return response.redirect().toRoute('municipality.index')
  }

  public async show({ view, params }: HttpContextContract) {
    const municipality = await Municipality.findOrFail(params.id)
    return view.render('admin/municipality/edit', {
      municipality,
    })
  }

  public async edit({ params, request, session, response }: HttpContextContract) {
    const payload = await request.validate(MunicipalityValidator)
    const property = await Municipality.findOrFail(params.id)
    await property.merge(payload).save()
    session.flash({ success: 'La commune a été mise à jour.' })
    return response.redirect().toRoute('municipality.index')
  }

  public async delete({ params, session, response }: HttpContextContract) {
    const property = await Municipality.findOrFail(params.id)
    await property.delete()
    session.flash({ success: 'La commune a été supprimée' })
    return response.redirect().toRoute('municipality.index')
  }
}

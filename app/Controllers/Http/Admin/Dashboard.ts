import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Municipality from 'App/Models/Municipality'
import Property from 'App/Models/Property'

export default class AdminDashboard {
  async index({ view }: HttpContextContract) {
    const properties = await Property.query().count('id')
    let [{ $extras: extraProp }] = properties
    const { count: countProp } = extraProp
    const category = await Municipality.query().count('id')
    let [{ $extras: extraCat }] = category
    const { count: countCat } = extraCat
    return view.render('admin/dashboard', {
      countProp,
      countCat,
      controller: 'adminDashboard',
    })
  }
}

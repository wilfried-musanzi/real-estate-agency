import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Municipality from 'App/Models/Municipality'
import Property from 'App/Models/Property'
import User from 'App/Models/User'

export default class AdminDashboard {
  async index({ view }: HttpContextContract) {
    const properties = await Property.query().count('id')
    let [{ $extras: extraProp }] = properties
    const { count: countProp } = extraProp

    const category = await Municipality.query().count('id')
    let [{ $extras: extraCat }] = category
    const { count: countCat } = extraCat

    const user = await User.query().count('id')
    let [{ $extras: extraUser }] = user
    const { count: countUser } = extraUser

    return view.render('admin/dashboard', {
      countProp,
      countCat,
      countUser,
    })
  }
}

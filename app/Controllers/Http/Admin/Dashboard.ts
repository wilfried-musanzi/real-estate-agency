import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Municipality from 'App/Models/Municipality'
import Property from 'App/Models/Property'
import User from 'App/Models/User'

export default class AdminDashboard {
  async index({ view, auth }: HttpContextContract) {
    if (!auth.user) return
    const properties = auth.user?.roles.includes('admin')
      ? await Property.query().paginate(1, 20)
      : await Property.query().where('user_id', auth.user?.id).paginate(1, 20)

    const countProp = properties.total
    const category = await Municipality.query().paginate(1, 20)
    const countCat = category.total
    const user = await User.query().paginate(1, 20)
    const countUser = user.total
    return view.render('admin/dashboard', {
      countProp,
      countCat,
      countUser,
    })
  }
}

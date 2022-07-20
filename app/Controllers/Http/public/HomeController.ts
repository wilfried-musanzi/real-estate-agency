import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class HomeController {
  index({ view }: HttpContextContract) {
    return view.render('public/home')
  }

  properties({ view }: HttpContextContract) {
    return view.render('public/properties')
  }
}

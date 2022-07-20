import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ContactController {
  contactView({ view }: HttpContextContract) {
    return view.render('public/contact')
  }

  properties({ view }: HttpContextContract) {
    return view.render('public/properties')
  }
}

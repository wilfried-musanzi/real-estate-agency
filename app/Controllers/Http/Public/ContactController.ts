import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ContactService from 'App/Services/ContactService'
import ContactValidator from 'App/Validators/ContactValidator'

export default class ContactController {
  contactView({ view }: HttpContextContract) {
    return view.render('public/contact')
  }

  async contact({ request, session, response }: HttpContextContract) {
    const payload = await request.validate(ContactValidator)
    try {
      await ContactService.send(payload)
      session.flash({ success: 'Votre message a été envoyé' })
      return response.redirect().toRoute('home')
    } catch {
      session.flash({ err: `Erreur d'envoi, réessayez.` })
      return response.redirect().toRoute('contact')
    }
  }
}

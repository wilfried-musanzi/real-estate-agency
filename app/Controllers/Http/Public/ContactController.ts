import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import SendEmail from 'App/Services/sendEmail'
import ContactValidator from 'App/Validators/ContactValidator'

export default class ContactController {
  contactView({ view }: HttpContextContract) {
    return view.render('public/contact')
  }

  async contact({ request, session, response }: HttpContextContract) {
    const payload = await request.validate(ContactValidator)
    try {
      await SendEmail.send(payload)
      session.flash({ success: 'Le message a été envoyé' })
    } catch (e) {
      session.flash({ err: `Erreur d'envoi, réessayez.${e}` })
      console.error(e)
    }
    return response.redirect().toRoute('home')
  }
}

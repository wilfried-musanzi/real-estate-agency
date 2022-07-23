import Env from '@ioc:Adonis/Core/Env'
import Mail from '@ioc:Adonis/Addons/Mail'

export default class ContactService {
  static async send(payload: Record<string, any>) {
    await Mail.send((message) => {
      message
        .from(Env.get('SMTP_USERNAME'))
        .subject('Formulaire de contact')
        .to('issacarmwalseul@gmail.com')
        .htmlView('email/contact', {
          payload,
        })
    })
  }
}

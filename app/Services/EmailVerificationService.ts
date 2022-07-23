import Env from '@ioc:Adonis/Core/Env'
import Mail from '@ioc:Adonis/Addons/Mail'

export default class EmailVerificationService {
  static async verify(payload: Record<string, any>, token: string) {
    await Mail.send((message) => {
      message
        .from(Env.get('SMTP_USERNAME'))
        .subject("Confirmation de l'email")
        .to(payload.email)
        .htmlView('email/verification', {
          payload,
          token,
        })
    })
  }
}

import Mail from '@ioc:Adonis/Addons/Mail'

export default class SendEmail {
  static async send(
    payload:
      | { email: string; username: string; password: string }
      | { email: string; name: string; message: string }
  ) {
    await Mail.send((message) => {
      message
        .from('musanziwilfried@gmail.com')
        .subject('Formulaire de contact')
        .to(payload.email)
        .htmlView('email/contact')
    })
  }
}

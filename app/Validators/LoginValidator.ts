import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'

export default class LoginValidator {
  public schema = schema.create({
    email: schema.string([
      rules.email(),
      rules.exists({
        table: User.table,
        column: 'email',
      }),
    ]),
    password: schema.string([]),
  })

  public messages: CustomMessages = {
    'required': 'Ce champ est requis !',
    'email.email': 'Veuillez saisir un email valide !',
    'email.exists': `Cet email n'existe pas !`,
    'password.exists': `Ce mot de passe est incorrect`,
  }
}

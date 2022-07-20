import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'

export default class SignupValidator {
  public schema = schema.create({
    email: schema.string([
      rules.email(),
      rules.unique({
        table: User.table,
        column: 'email',
      }),
    ]),
    username: schema.string([
      rules.minLength(4),
      rules.unique({
        table: User.table,
        column: 'username',
      }),
    ]),

    password: schema.string([rules.confirmed('confirm-password')]),
  })

  public messages: CustomMessages = {
    'required': 'Le champ ne peut pas être vide !',
    'confirmed': `Les mots de passe ne correspondent pas`,
    'username.unique': `Ce nom est déjà pris`,
    'username.minLength': `Le nom doit avoir au moins 4 carateres`,
    'email.unique': `Cet email est déjà pris`,
    'email.email': `Ceci n'est pas un email valide.`,
  }
}

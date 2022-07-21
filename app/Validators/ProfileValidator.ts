import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class ProfileValidator {
  constructor(protected ctx: HttpContextContract) {}

  public refs = schema.refs({
    userId: this.ctx.auth.user!.id,
  })

  public schema = schema.create({
    email: schema.string([
      rules.email(),
      rules.unique({
        table: User.table,
        column: 'email',
        whereNot: {
          id: this.refs.userId,
        },
      }),
    ]),
    username: schema.string([
      rules.minLength(4),
      rules.unique({
        table: User.table,
        column: 'username',
        whereNot: {
          id: this.refs.userId,
        },
      }),
    ]),
    password_old: schema.string.optional(),
    password: schema.string.optional([rules.confirmed('password-confirm')]),
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

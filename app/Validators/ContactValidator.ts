import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'

export default class ContactValidator {
  public schema = schema.create({
    email: schema.string([rules.email()]),
    name: schema.string(),
    message: schema.string(),
  })

  public messages: CustomMessages = {
    'required': 'Ce champ est requis !',
    'email.email': 'Veuillez saisir un email valide !',
  }
}

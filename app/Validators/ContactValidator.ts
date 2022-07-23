import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'

export default class ContactValidator {
  public schema = schema.create({
    email: schema.string([rules.email()]),
    mailername: schema.string([rules.minLength(4)]),
    message: schema.string([rules.minLength(10)]),
  })

  public messages: CustomMessages = {
    'required': ' Ce champ est requis',
    'email.email': ' Veuillez saisir un email valide',
    'message.minLength': 'Le message doit containir plus de 10 caractères.',
    'mailername.minLength': 'Le nom doit containir au moins 4 caractères.',
  }
}

import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'

export default class MunicipalityValidator {
  public schema = schema.create({
    name: schema.string([rules.minLength(2)]),
  })

  public messages: CustomMessages = {
    'required': 'Le champ ne peut pas etre vide !',
    'name.minLength': 'Taille inferieur a 2',
  }
}

import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import Municipality from 'App/Models/Municipality'

export default class PropertyValidator {
  public schema = schema.create({
    title: schema.string([rules.minLength(5), rules.maxLength(30)]),
    price: schema.number([rules.range(500, 1000)]),
    surface: schema.number([rules.range(50, 100)]),
    description: schema.string([rules.minLength(10), rules.maxLength(100)]),
    reserved: schema.boolean.nullableAndOptional(),
    thumb: schema.file.optional(),
    municipalityId: schema.number([
      rules.exists({
        column: Municipality.primaryKey,
        table: Municipality.table,
      }),
    ]),
  })

  public messages: CustomMessages = {
    'title.minLength': 'Titre inferieur a 5',
    'title.maxLength': 'Titre superieur a 35',
    'town.minLength': 'Ville inferieur a 3',
    'price.range': 'Le prix doit etre entre 500$ et 1000$',
    'surface.range': 'La surface doit etre entre 50m2 et 100m2',
    'description.minLength': 'La description inferieur a 10',
    'description.maxLength': 'La description superieur a 100',
    'required': 'Le champ ne peut pas etre vide !',
  }
}

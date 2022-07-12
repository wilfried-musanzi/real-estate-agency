import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'

export default class SignupValidator {
  public schema = schema.create({
    email: schema.string([rules.email()]),
    password: schema.string([rules.confirmed('confirm-password')]),
  })

  public messages: CustomMessages = {
    required: 'This field is required',
    confirmed: `The passwords don't match`,
  }
}

import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SecureBackend {
  public async handle(
    { bouncer, response, session }: HttpContextContract,
    next: () => Promise<void>
  ) {
    try {
      await bouncer.authorize('accedToAdminPanel')
    } catch {
      session.flash({ err: 'You must be an admin :) ' })
      return response.redirect().toRoute('home')
    }
    await next()
  }
}

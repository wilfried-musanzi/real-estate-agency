import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SecureBackend {
  public async handle(
    { bouncer, response, session }: HttpContextContract,
    next: () => Promise<void>
  ) {
    try {
      await bouncer.authorize('accedToAdminPanel')
    } catch {
      session.flash({ err: 'Accès interdit' })
      return response.redirect().toRoute('home')
    }
    await next()
  }
}

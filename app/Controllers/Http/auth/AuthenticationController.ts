import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthenticationController {
  loginView({ view }: HttpContextContract) {
    return view.render('auth/login')
  }

  signupView({ view }: HttpContextContract) {
    return view.render('auth/signup')
  }

  profileView({ view }: HttpContextContract) {
    return view.render('auth/profile')
  }
}

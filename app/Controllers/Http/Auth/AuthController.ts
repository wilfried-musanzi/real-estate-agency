import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import LoginValidator from 'App/Validators/LoginValidator'
import SignupValidator from 'App/Validators/SignupValidator'

export default class AuthController {
  loginView({ view }: HttpContextContract) {
    return view.render('auth/login', {
      controller: 'loginController',
    })
  }
  signupView({ view }: HttpContextContract) {
    return view.render('auth/signup', {
      controller: 'signupController',
    })
  }

  async login({ request, auth, response, session }: HttpContextContract) {
    const payload = await request.validate(LoginValidator)
    try {
      await auth.use('web').attempt(payload.email, payload.password)
      session.flash({ success: 'Vous êtes connecté.' })
      return response.redirect().toRoute('home')
    } catch {
      session.flash({ err: 'Les données sont invalides.' })
      return response.redirect().toRoute('login')
    }
  }

  async signup({ request, auth, response, session }: HttpContextContract) {
    const payload = await request.validate(SignupValidator)
    try {
      await User.create({ ...payload, roles: (await User.first()) == null ? ['admin'] : ['user'] })
      await auth.use('web').attempt(payload.email, payload.password)
      session.flash({ success: 'Inscription réussie.' })
      return response.redirect().toRoute('home')
    } catch {
      session.flash({ err: 'Inscription échouée, réessayez.' })
      return response.redirect().toRoute('home')
    }
  }

  async logout({ auth, response, session }: HttpContextContract) {
    await auth.use('web').logout()
    session.flash({ success: 'Vous êtes deconnecté.' })
    response.redirect().toRoute('login')
  }
}

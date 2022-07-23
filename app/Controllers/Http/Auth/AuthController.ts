import Hash from '@ioc:Adonis/Core/Hash'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import LoginValidator from 'App/Validators/LoginValidator'
import ProfileValidator from 'App/Validators/ProfileValidator'
import SignupValidator from 'App/Validators/SignupValidator'
import { string } from '@ioc:Adonis/Core/Helpers'
import EmailVerificationService from 'App/Services/EmailVerificationService'

export default class AuthController {
  loginView({ view }: HttpContextContract) {
    return view.render('auth/login')
  }
  signupView({ view }: HttpContextContract) {
    return view.render('auth/signup')
  }

  async profileView({ view, params }: HttpContextContract) {
    const user = await User.findBy('token', params.token)
    return view.render('auth/profile', {
      user,
    })
  }

  async validateEmail({ params, session, response }: HttpContextContract) {
    const token = params.token
    const user = await User.findBy('token', token)
    if (user && !user.isChecked) {
      await user.merge({ ...user, isChecked: true }).save()
      session.flash({ success: 'Email verifié avec succes, connectez-vous' })
      return response.redirect().toRoute('login')
    }
    session.flash({ err: 'Lien invalide.' })
    return response.redirect().toRoute('signup')
  }

  async login({ request, auth, response, session }: HttpContextContract) {
    const payload = await request.validate(LoginValidator)
    const user = await User.findBy('email', payload.email)
    const token = string.generateRandom(100)
    if (user && user.isChecked) {
      try {
        await auth.use('web').attempt(payload.email, payload.password)
        await user.merge({ ...user, token }).save()
        session.flash({ success: 'Vous êtes connecté.' })
        return response.redirect().toRoute('home')
      } catch {
        session.flash({ err: 'Les données sont invalides.' })
        return response.redirect().toRoute('login')
      }
    }
  }

  async signup({ request, response, session }: HttpContextContract) {
    const payload = await request.validate(SignupValidator)
    const token = string.generateRandom(100)
    try {
      await EmailVerificationService.verify(payload, token)
      await User.create({
        ...payload,
        roles: (await User.first()) == null ? ['admin'] : ['user'],
        token,
      })
      session.flash({ success: 'Vérfiez votre boite mail pour activer le compte.' })
      return response.redirect().toRoute('login')
    } catch {
      session.flash({ err: 'Inscription échouée, réessayez.' })
      return response.redirect().toRoute('signup')
    }
  }

  async profileEdit({ request, params, response, session }: HttpContextContract) {
    const payload = await request.validate(ProfileValidator)
    const token = params.token
    const user = await User.findBy('token', token)
    if (!user) return
    if (payload.password_old) {
      const passwordConfirmed = await Hash.verify(user?.password, payload.password_old)
      delete payload.password_old
      if (!passwordConfirmed) {
        await user.merge(payload).save()
        session.flash({ err: 'Ancien mot de passe invalide invalides' })
        return response.redirect().toRoute('me', { token })
      }
    }
    await user.merge(payload).save()
    session.flash({ success: 'Mise à jour réussie.' })
    return response.redirect().toRoute('me', { token })
  }

  async logout({ auth, response, session }: HttpContextContract) {
    await auth.use('web').logout()
    session.flash({ success: 'Vous êtes deconnecté.' })
    response.redirect().toRoute('login')
  }
}

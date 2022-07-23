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
    const user = await User.find(params.id)
    return view.render('auth/profile', {
      user,
    })
  }

  async validateEmail({ params, session, response }: HttpContextContract) {
    const token = params.token
    const user = await User.findBy('token', token)
    if (user) {
      await user.merge({ ...user, isChecked: true }).save()
      session.flash({ success: 'Email verifié avec succes' })
      return response.redirect().toRoute('home')
    }
    session.flash({ err: 'Lien invalide !' })
    return response.redirect().toRoute('signup')
  }

  async login({ request, auth, response, session }: HttpContextContract) {
    const payload = await request.validate(LoginValidator)
    const user = await User.findBy('email', payload.email)
    console.log(user)
    if (user && user.isChecked) {
      await auth.use('web').login(user)
      session.flash({ success: 'Vous êtes connecté.' })
      return response.redirect().toRoute('home')
    }
    session.flash({ err: 'Les données sont invalides.' })
    return response.redirect().toRoute('login')
  }

  async signup({ request, response, session }: HttpContextContract) {
    const payload = await request.validate(SignupValidator)
    const token = string.generateRandom(100)
    try {
      await User.create({
        ...payload,
        roles: (await User.first()) == null ? ['admin'] : ['user'],
        token,
      })
      session.flash({ success: 'Inscription réussie, connectez-vous.' })
      await EmailVerificationService.verify(payload, token)
      return response.redirect().toRoute('login')
    } catch {
      session.flash({ err: 'Inscription échouée, réessayez.' })
      return response.redirect().toRoute('signup')
    }
  }

  async profileEdit({ request, params, response, session }: HttpContextContract) {
    const payload = await request.validate(ProfileValidator)
    const user = await User.find(params.id)
    if (user) {
      if (payload.password_old) {
        const passwordConfirmed = await Hash.verify(user?.password, payload.password_old)
        if (passwordConfirmed) {
          if (payload.password) {
            delete payload.password_old
            await user.merge(payload).save()
            session.flash({ success: 'Mise à jour réussie.' })
            return response.redirect().toRoute('me', { id: params.id })
          } else {
            session.flash({ err: 'Saisir le nouveau mot de passe.' })
            return response.redirect().toRoute('me', { id: params.id })
          }
        } else {
          session.flash({ err: 'Ancien mot de passe invalide.' })
          return response.redirect().toRoute('me', { id: params.id })
        }
      } else {
        await user.merge(payload).save()
        session.flash({ success: 'Mise à jour réussie.' })
        return response.redirect().toRoute('me', { id: params.id })
      }
    }
  }

  async logout({ auth, response, session }: HttpContextContract) {
    await auth.use('web').logout()
    session.flash({ success: 'Vous êtes deconnecté.' })
    response.redirect().toRoute('login')
  }
}

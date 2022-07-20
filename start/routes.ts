import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'public/HomeController.index').as('home')
  Route.get('/immeubles', 'public/HomeController.properties').as('properties')
  Route.get('/connexion', 'auth/AuthenticationController.loginView').as('login')
  Route.get('/inscrption', 'auth/AuthenticationController.signupView').as('signup')
  Route.get('/moi', 'auth/AuthenticationController.profileView').as('me')
})

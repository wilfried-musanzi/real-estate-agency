import Server from '@ioc:Adonis/Core/Server'
Server.middleware.register([() => import('@ioc:Adonis/Core/BodyParser')])

Server.middleware.registerNamed({
  auth: () => import('App/Middleware/Auth'),
  silentAuth: () => import('App/Middleware/SilentAuth'),
  secureBackend: () => import('App/Middleware/SecureBackend'),
  recaptcha: () => import('App/Middleware/Recaptcha'),
})

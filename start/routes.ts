import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'Public/PublicController.index').as('home')
  Route.get('/immeubles', 'Public/PublicController.properties').as('properties')
  Route.get('/contact', 'Public/ContactController.contactView').as('contact')
  Route.get('/login', 'Auth/AuthController.loginView').as('login')
  Route.post('/login', 'Auth/AuthController.login')
  Route.get('/signup', 'Auth/AuthController.signupView').as('signup')
  Route.post('/signup', 'Auth/AuthController.signup')
  Route.get('/logout', 'Auth/AuthController.logout').as('logout')
}).middleware(['silentAuth'])

Route.group(() => {
  Route.get('/moi/:id', 'Auth/AuthController.profileView').as('me')
  Route.post('/moi/:id', 'Auth/AuthController.profileEdit')
}).middleware(['auth'])

Route.group(() => {
  Route.group(() => {
    Route.get('/', 'Admin/Dashboard.index').as('admin')
    Route.group(() => {
      Route.get('/', 'Admin/Property.index').as('property.index')
      Route.get('/new', 'Admin/Property.createView').as('property.new')
      Route.post('/new', 'Admin/Property.create')
      Route.get('/edit/:id', 'Admin/Property.updateView').as('property.edit')
      Route.post('/edit/:id', 'Admin/Property.update')
      Route.delete('/delete/:id', 'Admin/Property.delete').as('property.delete')
    }).prefix('/property')

    Route.group(() => {
      Route.get('/', 'Admin/Municipality.index').as('municipality.index')
      Route.get('/new', 'Admin/Municipality.view').as('municipality.new')
      Route.post('/new', 'Admin/Municipality.addNew')
      Route.get('/edit/:id', 'Admin/Municipality.show').as('municipality.edit')
      Route.post('/edit/:id', 'Admin/Municipality.edit')
      Route.post('/delete/:id', 'Admin/Municipality.delete').as('municipality.delete')
    }).prefix('/municipality')
  }).prefix('/admin')
})
// .middleware(['auth', 'secureBackend'])

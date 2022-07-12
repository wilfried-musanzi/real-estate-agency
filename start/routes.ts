import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'HomeController.index').as('home')
  Route.get('/properties', 'PropertiesController.index').as('properties.index')
  Route.get('/login', 'Auth/Auth.loginView').as('login')
  Route.post('/login', 'Auth/Auth.login')
  Route.get('/signup', 'Auth/Auth.signupView').as('signup')
  Route.post('/signup', 'Auth/Auth.signup')
  Route.get('/logout', 'Auth/Auth.logout').as('logout')
}).middleware('silentAuth')

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
}).middleware(['auth', 'secureBackend'])

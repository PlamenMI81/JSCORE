$(() => {
  const app = Sammy('#main', function () {
    this.use('Handlebars', 'hbs')

    this.get('index.html', homeController.getHomepage)
    this.get('#/home', homeController.getHomepage)
    this.get('#/about', homeController.getAbout)
    this.get('#/login', accountController.getLogin)
    this.post('#/login', accountController.loginUser)
    this.get('#/register', accountController.getRegister)
    this.post('#/register', accountController.registerUser)
    this.get('#/catalog', teamController.getCatalog)

  })

  app.run()
})
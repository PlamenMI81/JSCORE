let accountController = (() => {
  function getLogin (ctx) {
    ctx.loadPartials({
      header: './templates/common/header.hbs',
      footer: './templates/common/footer.hbs',
      loginForm: './templates/login/loginForm.hbs'
    }).then(function () {
      this.partial('./templates/login/loginPage.hbs')
    })
  }

  function getRegister (ctx) {
    ctx.loadPartials({
      header: './templates/common/header.hbs',
      footer: './templates/common/footer.hbs',
      registerForm: './templates/register/registerForm.hbs'
    }).then(function () {
      this.partial('./templates/register/registerPage.hbs')
    })
  }

  function registerUser (ctx) {
    let username = ctx.params.username
    let password = ctx.params.password
    let repeatPassword = ctx.params.repeatPassword
    if (password === repeatPassword) {
      auth.register(username, password).then(function (res) {
        auth.showInfo('Registered successfully')
        auth.saveSession(res)
        ctx.redirect('#/home')
      })
    }
  }

  function loginUser (ctx) {
    let username = ctx.params.username
    let password = ctx.params.password
    auth.login(username, password).then(function (res) {
      auth.showInfo('Logged in successfully')
      auth.saveSession(res)
      ctx.redirect('#/home')
    })

  }

  return {
    getLogin,
    getRegister,
    registerUser,
    loginUser,
  }
})()
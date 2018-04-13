let homeController = (() => {

  function getHomepage (ctx) {
    ctx.loggedIn=auth.isAuthenticated()
    ctx.username=auth.getusername()
    ctx.loadPartials({
      header: './templates/common/header.hbs',
      footer: './templates/common/footer.hbs'
    }).then(function () {
      this.partial('./templates/home/home.hbs')
    })
  }

  function getAbout (ctx) {
    ctx.loggedIn=auth.isAuthenticated()
    ctx.username=auth.getusername()
    ctx.loadPartials({
      header: './templates/common/header.hbs',
      footer: './templates/common/footer.hbs'
    }).then(function () {
      this.partial('./templates/about/about.hbs')
    })
  }

  return {
    getHomepage,
    getAbout,
  }
})()
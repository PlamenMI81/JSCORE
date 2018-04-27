$(() => {
  const app = Sammy('#main', function () {
    this.use('Handlebars', 'hbs')

    this.get('index.html', getWelcomePage)
    this.get('#/index', getWelcomePage)

    this.get('#/register', (ctx) => {
      ctx.loadPartials({
        header: './tpl/common/header.hbs',
        footer: './tpl/common/footer.hbs',
      }).then(function () {
        this.partial('./tpl/forms/register.hbs')
      })
    })
    this.post('#/register', (ctx) => {
      let username = ctx.params['username']
      let password = ctx.params['password']
      let repeatPass = ctx.params['repeatPass']

      if (username.length < 5) {
        notify.showError('Username should be at least 5 characters long')
      } else if (password.length === 0) {
        notify.showError('Password shouldn\'t be empty')
      } else if (repeatPass !== password) {
        notify.showError('Passwords must match!')
      } else {
        $(ctx.target).find('#btnRegister').prop('disabled', true)
        auth.register(username, password)
          .then((userData) => {
            auth.saveSession(userData)
            notify.showInfo('User registration successful!')
            ctx.redirect('#/feed')
          })
          .catch(notify.handleError)
          .always(() => {
            $(ctx.target).find('#btnRegister').prop('disabled', false)
          })
      }
    })

    this.get('#/login', (ctx) => {
      ctx.redirect('#/index')
    })
    this.post('#/login', (ctx) => {
      let username = ctx.params['username']
      let password = ctx.params['password']
      $(ctx.target).find('#btnLogin').prop('disabled', true)
      auth.login(username, password)
        .then((userData) => {
          auth.saveSession(userData)
          notify.showInfo('Login successful!')
          ctx.redirect('#/feed')
        })
        .catch(notify.handleError)
        .always(() => {
          $(ctx.target).find('#btnLogin').prop('disabled', false)
        })
    })

    this.get('#/logout', (ctx) => {
      auth.logout()
        .then(() => {
          sessionStorage.clear()
          ctx.redirect('#/index')
        })
        .catch(notify.handleError)
    })

    this.get('#/feed', (ctx) => {
      if (!auth.isAuth()) {
        ctx.redirect('#/index')
        return
      }
      let chirpCountP = chirpsService.chirpCount(auth.getUsername())
      let followingCountP = chirpsService.followingCount(auth.getUsername())
      let followersCountP = chirpsService.followersCount(auth.getUsername())
      Promise.all([chirpCountP, followingCountP, followersCountP]).then(([chirpCount, followingCount, followersCount]) => {
        chirpsService.getSubsc(sessionStorage.getItem('userId')).then((userData) => {
          let subsc = userData.subscriptions
          chirpsService.chirpsBySubscription(subsc).then((chirps) => {
            chirps.forEach(c => {
              c.diff = calcTime(c._kmd.ect)
            })
            ctx.chirps = chirps
            ctx.chirpsCount = chirpCount[0] ? chirpCount[0].subscriptions.length : '0'
            ctx.followingCount = followingCount[0] ? followingCount[0].subscriptions.length : '0'
            ctx.followersCount = followersCount[0] ? followersCount[0].subscriptions.length : '0'
            ctx.username = auth.getUsername()
            ctx.loadPartials({
              chirp: './tpl/chirps/chirp.hbs',
              menu: './tpl/common/menu.hbs',
              header: './tpl/common/header.hbs',
              footer: './tpl/common/footer.hbs',
            }).then(function () {
              this.partial('./tpl/chirps/feed.hbs')
            })
          }).catch(notify.handleError)
        }).catch(notify.handleError)
      })
    })

    function getWelcomePage (ctx) {
      if (!auth.isAuth()) {
        ctx.loadPartials({
          header: './tpl/common/header.hbs',
          footer: './tpl/common/footer.hbs',
        }).then(function () {
          this.partial('./tpl/forms/login.hbs')
        })
      } else {
        ctx.redirect('#/feed')
      }
    }

    function calcTime (dateIsoFormat) {
      let diff = new Date - (new Date(dateIsoFormat))
      diff = Math.floor(diff / 60000)
      if (diff < 1) return 'less than a minute'
      if (diff < 60) return diff + ' minute' + pluralize(diff)
      diff = Math.floor(diff / 60)
      if (diff < 24) return diff + ' hour' + pluralize(diff)
      diff = Math.floor(diff / 24)
      if (diff < 30) return diff + ' day' + pluralize(diff)
      diff = Math.floor(diff / 30)
      if (diff < 12) return diff + ' month' + pluralize(diff)
      diff = Math.floor(diff / 12)
      return diff + ' year' + pluralize(diff)

      function pluralize (value) {
        if (value !== 1) return 's'
        else return ''
      }
    }

  })

  app.run()
})
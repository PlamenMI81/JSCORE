$(() => {
  const app = Sammy('#container', function () {
    this.use('Handlebars', 'hbs')

    this.get('index.html', getWelcomePage)
    this.get('#/index', getWelcomePage)

    this.get('#/register', (ctx) => {
      ctx.loadPartials({
        menu: './tpl/common/menu.hbs',
        footer: './tpl/common/footer.hbs',
      }).then(function () {
        this.partial('./tpl/forms/register.hbs')
      })
    })
    this.post('#/register', (ctx) => {
      let username = ctx.params['username']
      let password = ctx.params['pass']
      let repeatPass = ctx.params['checkPass']

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
            ctx.redirect('#/catalog')
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
      let password = ctx.params['pass']
      $(ctx.target).find('#btnLogin').prop('disabled', true)
      auth.login(username, password)
        .then((userData) => {
          auth.saveSession(userData)
          notify.showInfo('Login successful!')
          ctx.redirect('#/catalog')
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
          notify.showInfo('Logout successful.')
          ctx.redirect('#/index')
        })
        .catch(notify.handleError)
    })

    this.get('#/catalog', (ctx) => {
      if (!auth.isAuth()) {
        ctx.redirect('#/index')
        return
      }
      catalogService.getFlights().then((flights) => {
        ctx.flights = flights
        ctx.username = auth.getUsername()
        ctx.loadPartials({
          'menu-r': './tpl/common/menu-r.hbs',
          footer: './tpl/common/footer.hbs',
        }).then(function () {
          this.partial('./tpl/flights/catalog.hbs')
        })
      }).catch(notify.handleError)
    })

    this.get('#/addflight', (ctx) => {
      if (!auth.isAuth()) {
        ctx.redirect('#/index')
        return
      }
      ctx.username = auth.getUsername()
      ctx.loadPartials({
        'menu-r': './tpl/common/menu-r.hbs',
        footer: './tpl/common/footer.hbs',
      }).then(function () {
        this.partial('./tpl/forms/addFlight.hbs')
      })
    })

    this.post('#/addflight', (ctx) => {
      if (!auth.isAuth()) {
        ctx.redirect('#/index')
        return
      }
      let isPublished = $('.checkbox').is(':checked')
      let destination = ctx.params.destination
      let origin = ctx.params.origin
      let departure = ctx.params.departureDate
      let time = ctx.params.departureTime
      let seats = ctx.params.seats
      let cost = ctx.params.cost
      if (destination.length === 0) {
        notify.showInfo('Destination shouldn\'t be empty')
        return
      } else if (origin.length === 0) {
        notify.showInfo('Origin shouldn\'t be empty')
        return
      }
      if (!/\d+/.test(seats) || seats < 1) {
        notify.showInfo('Seats should be positive number')
        return
      }
      if (!/\d+|\.\d+/.test(cost) || cost <= 0) {
        notify.showInfo('Cost should be positive number')
        return
      }
      let data = {
        destination,
        origin,
        departure,
        time,
        'seats': +seats,
        'cost': +cost,
        'image': ctx.params.img,
        'isPublished': isPublished
      }
      catalogService.createFlight(data).then(() => {
        notify.showInfo('Created flight')
        ctx.redirect('#/catalog')
      }).catch(notify.handleError)
    })

    this.get('#/edit/:id', (ctx) => {
      if (!auth.isAuth()) {
        ctx.redirect('#/index')
        return
      }
      catalogService.getFlightsById(ctx.params.id).then((flights) => {
        if (flights.isPublished) {
          ctx.checked='checked'
        } else {
          ctx.checked=''
        }
        ctx.flights = flights
        ctx.username = auth.getUsername()
        ctx.loadPartials({
          'menu-r': './tpl/common/menu-r.hbs',
          footer: './tpl/common/footer.hbs',
        }).then(function () {
          this.partial('./tpl/forms/editFlight.hbs')
        })
      }).catch(notify.handleError)
    })

    this.post('#/edit/:id', (ctx) => {
      if (!auth.isAuth()) {
        ctx.redirect('#/index')
        return
      }
      let isPublished = $('.checkbox').is(':checked')
      let destination = ctx.params.destination
      let origin = ctx.params.origin
      let departure = ctx.params.departureDate
      let time = ctx.params.departureTime
      let seats = ctx.params.seats
      let cost = ctx.params.cost
      if (destination.length === 0) {
        notify.showInfo('Destination shouldn\'t be empty')
        return
      } else if (origin.length === 0) {
        notify.showInfo('Origin shouldn\'t be empty')
        return
      }
      if (!/\d+/.test(seats) || seats < 1) {
        notify.showInfo('Seats should be positive number')
        return
      }
      if (!/\d+|\.\d+/.test(cost) || cost <= 0) {
        notify.showInfo('Cost should be positive number')
        return
      }
      let data = {
        destination,
        origin,
        departure,
        time,
        'seats': +seats,
        'cost': +cost,
        'image': ctx.params.img,
        'isPublished': isPublished
      }
      catalogService.editFlight(ctx.params.id, data).then(() => {
        notify.showInfo('Successfully edited flight')
        ctx.redirect('#/catalog')
      }).catch(notify.handleError)

    })

    this.get('#/detail/:id', (ctx) => {
      if (!auth.isAuth()) {
        ctx.redirect('#/index')
        return
      }
      catalogService.getFlightsById(ctx.params.id).then((flights) => {
        flights.departure = date(flights.departure)
        ctx.flights = flights
        ctx.author = sessionStorage.getItem('userId') === flights._acl.creator
        ctx.username = auth.getUsername()
        ctx.loadPartials({
          'menu-r': './tpl/common/menu-r.hbs',
          footer: './tpl/common/footer.hbs',
        }).then(function () {
          this.partial('./tpl/flights/flightDetails.hbs')
        })
      }).catch(notify.handleError)
    })

    this.get('#/myflights', (ctx) => {
      if (!auth.isAuth()) {
        ctx.redirect('#/index')
        return
      }
      catalogService.getMyFlights(sessionStorage.getItem('userId')).then((flights) => {
        flights.forEach(f => {
          f.departure = date(f.departure)
        })
        ctx.flights = flights
        ctx.username = auth.getUsername()
        ctx.loadPartials({
          'menu-r': './tpl/common/menu-r.hbs',
          footer: './tpl/common/footer.hbs',
        }).then(function () {
          this.partial('./tpl/flights/myFlights.hbs')
        })
      }).catch(notify.handleError)
    })

    this.get('#/delete/:id', (ctx)=>{
      if (!auth.isAuth()) {
        ctx.redirect('#/index')
        return
      }
      catalogService.deteleFlight(ctx.params.id).then(()=>{
        notify.showInfo('Flight deleted.')
        ctx.redirect('#/myflights')
      }).catch(notify.handleError)
    })

    function getWelcomePage (ctx) {
      if (!auth.isAuth()) {
        ctx.loadPartials({
          menu: './tpl/common/menu.hbs',
          footer: './tpl/common/footer.hbs',
        }).then(function () {
          this.partial('./tpl/forms/login.hbs')
        })
      } else {
        ctx.redirect('#/catalog')
      }
    }

    function date (dateISO) {
      let dateTime = new Date(dateISO)
      let day = dateTime.getDate()
      let month = dateTime.toLocaleString('en-GB', {month: 'long'})
      return `${day} ${month}`

    }

  })

  app.run()
})
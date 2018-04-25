$(() => {
  const app = Sammy('#app', function () {
    this.use('Handlebars', 'hbs')

    this.get('index.html', getWelcomePage)
    this.get('#/home', getWelcomePage)

    this.get('#/register', (ctx) => {
      ctx.loadPartials({
        'menu-a': './tpl/cmn/menu-a.hbs',
        footer: './tpl/cmn/footer.hbs',
      }).then(function () {
        this.partial('./tpl/forms/register.hbs')
      })
    })
    this.post('#/register', (ctx) => {
      $(ctx.target).find('input[type="submit"]').prop('disabled', true)
      let username = ctx.params['username']
      let password = ctx.params['password']
      let name = ctx.params['name']

      auth.register(username, password, name)
        .then((userData) => {
          auth.saveSession(userData)
          notify.showInfo('User registration successful!')
          ctx.redirect('#/home-r')
        })
        .catch(notify.handleError)
        .always(() => {
          $(ctx.target).find('input[type="submit"]').prop('disabled', false)
        })
    })

    this.get('#/login', (ctx) => {
      ctx.loadPartials({
        'menu-a': './tpl/cmn/menu-a.hbs',
        footer: './tpl/cmn/footer.hbs',
      }).then(function () {
        this.partial('./tpl/forms/login.hbs')
      })
    })
    this.post('#/login', (ctx) => {
      $(ctx.target).find('input[type="submit"]').prop('disabled', true)
      let username = ctx.params['username']
      let password = ctx.params['password']

      auth.login(username, password)
        .then((userData) => {
          auth.saveSession(userData)
          notify.showInfo('Login successful!')
          ctx.redirect('#/home-r')
        })
        .catch(notify.handleError)
        .always(() => {
          $(ctx.target).find('input[type="submit"]').prop('disabled', false)
        })
    })

    this.get('#/logout', (ctx) => {
      auth.logout()
        .then(() => {
          sessionStorage.clear()
          notify.showInfo('Logout successful.')
          ctx.redirect('#/home')
        })
        .catch(notify.handleError)
    })

    this.get('#/home-r', (ctx) => {
      if (!auth.isAuth()) {
        ctx.redirect('#/home')
        return
      }
      ctx.user = auth.getUsername()
      ctx.loadPartials({
        'menu-r': './tpl/reg/menu-r.hbs',
        footer: './tpl/cmn/footer.hbs',
      }).then(function () {
        this.partial('./tpl/reg/home-r.hbs')
      })
    })

    this.get('#/sendmessage', (ctx) => {
      if (!auth.isAuth()) {
        ctx.redirect('#/home')
        return
      }
      let usersPromise = messages.getAllUsers()
      Promise.all([usersPromise]).then((users) => {
        ctx.users = users[0]
        ctx.user = auth.getUsername()
        ctx.loadPartials({
          'menu-r': './tpl/reg/menu-r.hbs',
          option: './tpl/reg/option.hbs',
          footer: './tpl/cmn/footer.hbs',
        }).then(function () {
          this.partial('./tpl/reg/send-message.hbs')
        })
      }).catch(notify.handleError)
    })
    this.post('#/sendmessage', (ctx) => {
      if (!auth.isAuth()) {
        ctx.redirect('#/home')
        return
      }

      let recipient_username = $('#msgRecipientUsername').find('option:selected').text().match(/\((\w+)\)/)[1]
      let text = ctx.params.text
      let data = {
        sender_username: sessionStorage.getItem('username'),
        sender_name: sessionStorage.getItem('name'),
        recipient_username: recipient_username,
        text: text,
      }
      messages.sendMessage(data).then(() => {
        notify.showInfo('Message sent.')
        ctx.redirect('#/archive')
      }).catch(notify.handleError)
    })

    this.get('#/archive', (ctx) => {
      if (!auth.isAuth()) {
        ctx.redirect('#/home')
        return
      }

      let messagesPromise = messages.getMessageByUsername(auth.getUsername())
      Promise.all([messagesPromise]).then((messages) => {
        messages[0].forEach((m) => {
          m.date = formatDate(m._kmd.ect)
        })
        ctx.messages = messages[0]
        ctx.user = auth.getUsername()
        ctx.loadPartials({
          'menu-r': './tpl/reg/menu-r.hbs',
          'row-archive': './tpl/reg/row-archive.hbs',
          footer: './tpl/cmn/footer.hbs',
        }).then(function () {
          this.partial('./tpl/reg/archive.hbs')
        })
      }).catch(notify.handleError)
    })

    this.get('#/message/delete/:id', (ctx) => {
      let messageId = ctx.params.id
      messages.deleteMessage(messageId).then(() => {
        notify.showInfo('Message deleted.')
        ctx.redirect('#/archive')
      }).catch(notify.handleError)
    })

    this.get('#/mymessages', (ctx) => {
      if (!auth.isAuth()) {
        ctx.redirect('#/home')
        return
      }
      messages.getMyMessages(auth.getUsername()).then((msg) => {
        msg.forEach((m) => {
          m.date = formatDate(m._kmd.ect)
          m.sender_username=formatSender(m.sender_name,m.sender_username)
        })
        ctx.messages = msg
        ctx.user = auth.getUsername()
        ctx.loadPartials({
          'menu-r': './tpl/reg/menu-r.hbs',
          'row-message': './tpl/reg/row-message.hbs',
          footer: './tpl/cmn/footer.hbs',
        }).then(function () {
          this.partial('./tpl/reg/messages.hbs')
        })
      })

    })

    function getWelcomePage (ctx) {
      if (!auth.isAuth()) {
        ctx.loadPartials({
          'menu-a': './tpl/cmn/menu-a.hbs',
          footer: './tpl/cmn/footer.hbs',
        }).then(function () {
          this.partial('./tpl/cmn/home-a.hbs')
        })
      } else {
        ctx.redirect('#/home')
      }
    }
    function formatDate (dateISO8601) {
      let date = new Date(dateISO8601)
      if (Number.isNaN(date.getDate()))
        return ''
      return date.getDate() + '.' + padZeros(date.getMonth() + 1) +
        '.' + date.getFullYear() + ' ' + date.getHours() + ':' +
        padZeros(date.getMinutes()) + ':' + padZeros(date.getSeconds())

      function padZeros (num) {
        return ('0' + num).slice(-2)
      }
    }
    function formatSender(name, username) {
      if (!name)
        return username;
      else
        return username + ' (' + name + ')';
    }
  })

  app.run()
})
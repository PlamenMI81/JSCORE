$(() => {
  const app = Sammy('#container', function () {
    this.use('Handlebars', 'hbs')

    this.get('index.html', getWelcomePage)
    this.get('#/index', getWelcomePage)

    this.post('#/register', (ctx) => {
      let username = ctx.params['username-register']
      let password = ctx.params['password-register']
      let repeatPass = ctx.params['password-register-check']

      if (username.length < 5) {
        notify.showError('Username should be at least 5 characters long')
      } else if (password.length === 0) {
        notify.showError('Password should be not empty')
      } else if (repeatPass !== password) {
        notify.showError('Passwords must match!')
      } else {
        auth.register(username, password)
          .then((userData) => {
            auth.saveSession(userData)
            notify.showInfo('User registration successful!')
            ctx.redirect('#/home')
          })
          .catch(notify.handleError)
      }
    })

    this.post('#/login', (ctx) => {
      let username = ctx.params['username-login']
      let password = ctx.params['password-login']
      auth.login(username, password)
        .then((userData) => {
          auth.saveSession(userData)
          notify.showInfo('Login successful!')
          ctx.redirect('#/home')
        })
        .catch(notify.handleError)
    })

    this.get('#/logout', (ctx) => {
      auth.logout()
        .then(() => {
          sessionStorage.clear()
          ctx.redirect('#/index')
        })
        .catch(notify.handleError)
    })

    this.get('#/home', (ctx) => {
      if (!auth.isAuth()) {
        ctx.redirect('#/index')
        return
      }

      (async function () {
        const receipt = await receipts.getActiveReceipt()
        if (receipt.length !== 0) {
          let id = receipt[0]._id
          let total = 0
          entries.getEntries(id)
            .then((entries) => {
              entries.forEach((e) => {
                e.entryId = e._id
                e.subTotal = (e.price * e.qty).toFixed(2)
                total += +e.subTotal
              })
              ctx.total = +total.toFixed(2)
              ctx.receiptId = id
              ctx.entries = entries
              ctx.username = auth.getUsername()
              ctx.loadPartials({
                menu: './tpl/common/menu.hbs',
                footer: './tpl/common/footer.hbs',
                row: './tpl/receipt/row.hbs'
              }).then(function () {
                this.partial('./tpl/receipt/create.hbs')
              })
            })
          return
        }
        const newReceiptId = await receipts.createReceipt()
        ctx.total = '0.00'
        ctx.receiptId = newReceiptId._id
        ctx.username = auth.getUsername()
        ctx.loadPartials({
          menu: './tpl/common/menu.hbs',
          footer: './tpl/common/footer.hbs',
          row: './tpl/receipt/row.hbs'
        }).then(function () {
          this.partial('./tpl/receipt/create.hbs')
        })
      })()
    })

    this.post('#/entry/add/:receiptId', (ctx) => {
      if (!auth.isAuth()) {
        ctx.redirect('#/index')
        return
      }
      let receiptId = ctx.params.receiptId
      let type = ctx.params['type']
      let qty = Number(ctx.params['qty'])
      let price = Number(ctx.params['price'])
      if (type.length !== 0 && /\d+\.\d+|\d+/.test(qty) && /\d+\.\d+|\d+/.test(price)) {
        entries.createEntry(type, qty, price, receiptId)
          .then(() => {
            notify.showInfo('Entry added')
            ctx.redirect('#/home')
          })
        return
      }
      notify.showError('Invalid inputs')
    })

    this.get('#/entry/delete/:entryId', (ctx) => {
      if (!auth.isAuth()) {
        ctx.redirect('#/index')
        return
      }
      entries.deleteEntry(ctx.params.entryId).then(() => {
        notify.showInfo('Entry removed')
        ctx.redirect('#/home')
      })
    })

    this.post('#/create/receipt/:receiptId', (ctx) => {
      if (!auth.isAuth()) {
        ctx.redirect('#/index')
        return
      }
      let receiptId = ctx.params.receiptId
      let productCount = $('div.row').length - 1
      let total = Number($('#create-receipt-form').find('div.col')[3].textContent)
      if (productCount === 0) {
        notify.showError('Must have one entry at least!')
        return
      }
      receipts.commitReceipt(receiptId, productCount, total).then(() => {
        notify.showInfo('Receipt checked out')
        ctx.redirect('#/home')
      })
    })

    this.get('#/overview', (ctx) => {
      if (!auth.isAuth()) {
        ctx.redirect('#/index')
        return
      }

      let userId = sessionStorage.getItem('userId')
      receipts.getMyReceipts(userId)
        .then((myReceipts) => {
          let total = 0
          myReceipts.forEach((r) => {
            r['date-time'] = formatDate(r._kmd.ect)
            r.receiptId = r._id
            total += r.total
          })
          ctx.total = total
          ctx.receipts = myReceipts
          ctx.username = auth.getUsername()
          ctx.loadPartials({
            menu: './tpl/common/menu.hbs',
            footer: './tpl/common/footer.hbs',
            'row-details': './tpl/receipt/row-details.hbs'
          }).then(function () {
            this.partial('./tpl/receipt/all.hbs')
          })
        })

      function formatDate (dateISO) {
        let dateTime=dateISO.split('T')
        let date=dateTime[0]
        let time=dateTime[1].split(':')
        let hour=time[0]
        let minutes=time[1]
        return `${date} ${hour}:${minutes}`
      }
    })

    this.get('#/receipt/details/:receiptId',(ctx)=>{
      let id=ctx.params.receiptId
      entries.getEntries(id)
        .then((entries) => {
          entries.forEach((e) => {
            e.subTotal = (e.price * e.qty).toFixed(2)
          })
          ctx.entries = entries
          ctx.username = auth.getUsername()
          ctx.loadPartials({
            menu: './tpl/common/menu.hbs',
            footer: './tpl/common/footer.hbs',
            'row-more': './tpl/receipt/row-more.hbs'
          }).then(function () {
            this.partial('./tpl/receipt/details.hbs')
          })
        })
    })

    function getWelcomePage (ctx) {
      if (!auth.isAuth()) {
        ctx.loadPartials({
          footer: './tpl/common/footer.hbs',
        }).then(function () {
          this.partial('./tpl/welcome.hbs')
        })
      } else {
        ctx.redirect('#/home')
      }
    }

  })

  app.run()
})
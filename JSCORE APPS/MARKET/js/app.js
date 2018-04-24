$(() => {
  const app = Sammy('#app', function () {
    this.use('Handlebars', 'hbs')

    this.get('market.html', getWelcomePage)
    this.get('#/home', getWelcomePage)

    this.get('#/register', (ctx) => {
      ctx.loadPartials({
        'menu-anonymous': './tpl/common/menu-anonymous.hbs',
        footer: './tpl/common/footer.hbs',
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
          ctx.redirect('#/home-user')
        })
        .catch(notify.handleError)
        .always(()=>{
          $(ctx.target).find('input[type="submit"]').prop('disabled', false)
        })
    })

    this.get('#/login', (ctx) => {
      ctx.loadPartials({
        'menu-anonymous': './tpl/common/menu-anonymous.hbs',
        footer: './tpl/common/footer.hbs',
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
          ctx.redirect('#/home-user')
        })
        .catch(notify.handleError)
        .always(()=>{
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

    this.get('#/home-user', (ctx) => {
      if (!auth.isAuth()) {
        ctx.redirect('#/home')
        return
      }
      ctx.userName = auth.getUsername()
      ctx.loadPartials({
        'menu-user-only': './tpl/shop/menu-user-only.hbs',
        footer: './tpl/common/footer.hbs',
      }).then(function () {
        this.partial('./tpl/shop/home-user.hbs')
      })
    })

    this.get('#/shop', (ctx) => {
      if (!auth.isAuth()) {
        ctx.redirect('#/home')
        return
      }
      products.getProducts().then((prod) => {
        prod.forEach(p => {
          p.price = p.price.toFixed(2)
        })
        ctx.userName = auth.getUsername()
        ctx.products = prod
        ctx.loadPartials({
          'menu-user-only': './tpl/shop/menu-user-only.hbs',
          'tr-products': './tpl/shop/tr-products.hbs',
          footer: './tpl/common/footer.hbs',
        }).then(function () {
          this.partial('./tpl/shop/shop.hbs')
        })
      }).catch(notify.handleError)
    })

    this.get('#/purchase/:productId', (ctx) => {
      let productId = ctx.params.productId
      let userId = sessionStorage.getItem('userId')

      let userPromise = products.getUserCart(userId)
      let productPromise = products.getProductById(productId)
      Promise.all([userPromise, productPromise]).then(([user, product]) => {
        let userCart = user.cart
        if (!userCart.hasOwnProperty(productId)) {
          let data = {
            quantity: 1,
            product: {
              description: product.description,
              name: product.name,
              price: product.price
            }
          }
          userCart[productId] = data
          user.cart = userCart
        } else {
          user.cart[productId].quantity++
        }
        products.updateUserCart(userId, user).then(() => {
          notify.showInfo('Product purchased.')
          ctx.redirect('#/cart')
        })
      }).catch(notify.handleError)
    })

    this.get('#/cart', (ctx) => {
      let userId = sessionStorage.getItem('userId')
      let userPromise = products.getUserCart(userId)
      Promise.all([userPromise]).then((user) => {
        let cart = user[0].cart
        let totalPrice = 0
        for (let p in cart) {
          cart[p].totalPrice = (cart[p].quantity * cart[p].product.price).toFixed(2)
          cart[p].id = p
          cart[p].description=cart[p].product.description
          cart[p].name=cart[p].product.name
        }
        ctx.products = cart
        ctx.userName = auth.getUsername()
        ctx.loadPartials({
          'menu-user-only': './tpl/shop/menu-user-only.hbs',
          'tr-cart': './tpl/shop/tr-cart.hbs',
          footer: './tpl/common/footer.hbs',
        }).then(function () {
          this.partial('./tpl/shop/cart.hbs')
        })
      }).catch(notify.handleError)
    })

    this.get('#/discard/:productId',(ctx)=>{
      let productId = ctx.params.productId
      let userId = sessionStorage.getItem('userId')

      let userPromise = products.getUserCart(userId)
      Promise.all([userPromise]).then(([user]) => {
        let userCart = user.cart
        if (userCart.hasOwnProperty(productId)) {
          delete userCart[productId]
          user.cart = userCart
         }
        products.updateUserCart(userId, user).then(() => {
          notify.showInfo('Product discarded.')
          ctx.redirect('#/cart')
        })
      }).catch(notify.handleError)
    })

    function getWelcomePage (ctx) {
      if (!auth.isAuth()) {
        ctx.loadPartials({
          'menu-anonymous': './tpl/common/menu-anonymous.hbs',
          footer: './tpl/common/footer.hbs',
        }).then(function () {
          this.partial('./tpl/common/home.hbs')
        })
      } else {
        ctx.redirect('#/home-user')
      }
    }

  })

  app.run()
})
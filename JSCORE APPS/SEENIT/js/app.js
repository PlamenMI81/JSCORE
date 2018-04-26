$(() => {
  const app = Sammy('#container', function () {
    this.use('Handlebars', 'hbs')

    this.get('index.html', getWelcomePage)
    this.get('#/index', getWelcomePage)

    this.post('#/register', (ctx) => {
      let username = ctx.params['username']
      let password = ctx.params['password']
      let repeatPass = ctx.params['repeatPass']

      if (!/[a-zA-Z]{3}/.test(username)) {
        notify.showError('Username should be at least 3 english alphabetic characters long')
      } else if (!/[a-zA-Z0-9]{6}/.test(password)) {
        notify.showError('Password should be at least 6 english alphanumeric characters long')
      } else if (repeatPass !== password) {
        notify.showError('Passwords must match!')
      } else {
        auth.register(username, password)
          .then((userData) => {
            auth.saveSession(userData)
            notify.showInfo('User registration successful!')
            ctx.redirect('#/catalog')
          })
          .catch(notify.handleError)
      }
    })

    this.post('#/login', (ctx) => {
      let username = ctx.params['username']
      let password = ctx.params['password']
      auth.login(username, password)
        .then((userData) => {
          auth.saveSession(userData)
          notify.showInfo('Login successful!')
          ctx.redirect('#/catalog')
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

    this.get('#/catalog', (ctx) => {
      if (!auth.isAuth()) {
        ctx.redirect('#/index')
        return
      }
      postsService.listAllPosts().then((allPosts) => {
        rank = 0
        allPosts.forEach(p => {
          p.rank = ++rank
          p.diff = calcTime(p._kmd.ect)
          p.isAuthor = sessionStorage.getItem('username') === p.author
        })
        ctx.posts = allPosts
        ctx.username = auth.getUsername()
        ctx.loadPartials({
          'row-post': './tpl/catalog/row-post.hbs',
          'header-r': './tpl/common/header-r.hbs',
          'menu-r': './tpl/common/menu-r.hbs',
          footer: './tpl/common/footer.hbs',
        }).then(function () {
          this.partial('./tpl/catalog/catalog.hbs')
        })
      })
    })

    this.get('#/postlink', (ctx) => {
      if (!auth.isAuth()) {
        ctx.redirect('#/index')
        return
      }
      ctx.username = auth.getUsername()
      ctx.loadPartials({
        'menu-r': './tpl/common/menu-r.hbs',
        'header-r': './tpl/common/header-r.hbs',
        footer: './tpl/common/footer.hbs',
      }).then(function () {
        this.partial('./tpl/catalog/submit.hbs')
      })
    })

    this.post('#/submitlink', (ctx) => {
      if (!auth.isAuth()) {
        ctx.redirect('#/index')
        return
      }
      data = {
        author: auth.getUsername(),
        title: ctx.params.title,
        description: ctx.params.comment,
        url: ctx.params.url,
        imageUrl: ctx.params.image
      }
      postsService.submitLink(data).then(() => {
        notify.showInfo('Post created.')
        ctx.redirect('#/catalog')
      }).catch(notify.handleError)
    })

    this.get('#/myposts', (ctx) => {
      if (!auth.isAuth()) {
        ctx.redirect('#/index')
        return
      }
      postsService.getMyPosts(auth.getUsername()).then((myposts) => {
        rank = 0
        myposts.forEach(p => {
          p.rank = ++rank
          p.diff = calcTime(p._kmd.ect)
        })
        ctx.posts = myposts
        ctx.username = auth.getUsername()
        ctx.loadPartials({
          'menu-r': './tpl/common/menu-r.hbs',
          'row-mypost': './tpl/catalog/row-mypost.hbs',
          'header-r': './tpl/common/header-r.hbs',
          footer: './tpl/common/footer.hbs',
        }).then(function () {
          this.partial('./tpl/catalog/myposts.hbs')
        })
      })
    })

    this.get('#/post/edit/:postId', (ctx) => {
      if (!auth.isAuth()) {
        ctx.redirect('#/index')
        return
      }
      postsService.getPostById(ctx.params.postId).then((post) => {
        ctx.post = post
        ctx.username = auth.getUsername()
        ctx.loadPartials({
          'menu-r': './tpl/common/menu-r.hbs',
          'header-r': './tpl/common/header-r.hbs',
          footer: './tpl/common/footer.hbs',
        }).then(function () {
          this.partial('./tpl/catalog/edit.hbs')
        })
      }).catch(notify.handleError)
    })

    this.post('#/post/edit/:postId', (ctx) => {
      if (!auth.isAuth()) {
        ctx.redirect('#/index')
        return
      }
      let postId = ctx.params.postId
      data = {
        author: auth.getUsername(),
        title: ctx.params.title,
        description: ctx.params.description,
        url: ctx.params.url,
        imageUrl: ctx.params.image
      }
      postsService.editPost(postId, data).then(() => {
        notify.showInfo('Post edited.')
        ctx.redirect('#/catalog')
      }).catch(notify.handleError)
    })

    this.get('#/post/delete/:postId', (ctx) => {
      if (!auth.isAuth()) {
        ctx.redirect('#/index')
        return
      }
      postsService.deletPost(ctx.params.postId).then(() => {
        ctx.redirect('#/catalog')
      }).catch(notify.handleError)
    })

    this.get('#/post/comments/:postId', (ctx) => {
      if (!auth.isAuth()) {
        ctx.redirect('#/index')
        return
      }
      let postPromise = postsService.getPostById(ctx.params.postId)
      let commentsPromise = commentsService.getCommentsById(ctx.params.postId)
      Promise.all([postPromise, commentsPromise]).then(([post, comments]) => {
        comments.forEach(c => {
          c.diff = calcTime(c._kmd.ect)
          c.isAuthor=sessionStorage.getItem('username') === c.author
          c.postId=ctx.params.postId
        })
        ctx.post = post
        ctx.post.diff = calcTime(post._kmd.ect)
        ctx.comments = comments
        ctx.username = auth.getUsername()
        ctx.loadPartials({
          'menu-r': './tpl/common/menu-r.hbs',
          'row-comment': './tpl/catalog/row-comment.hbs',
          'header-r': './tpl/common/header-r.hbs',
          footer: './tpl/common/footer.hbs',
        }).then(function () {
          this.partial('./tpl/catalog/comments.hbs')
        })

      })
    })

    this.post('#/post/comment/:postId', (ctx) => {
      if (!auth.isAuth()) {
        ctx.redirect('#/index')
        return
      }
      let data={
        postId:ctx.params.postId,
        content:ctx.params.content,
        author:auth.getUsername()
      }
      commentsService.createComment(data).then(()=>{
        notify.showInfo('Comment created.')
        ctx.redirect(`#/post/comments/${ctx.params.postId}`)
      })

    })

    this.get('post/:postId/comment/delete/:commentId', (ctx) => {
      if (!auth.isAuth()) {
        ctx.redirect('#/index')
        return
      }
      commentsService.deleteComment(ctx.params.commentId).then(() => {
        notify.showInfo('Comment deleted.')
        ctx.redirect(`#/post/comments/${ctx.params.postId}`)
      }).catch(notify.handleError)
    })

    function getWelcomePage (ctx) {
      if (!auth.isAuth()) {
        ctx.loadPartials({
          'header-a': './tpl/common/header-a.hbs',
          footer: './tpl/common/footer.hbs',
        }).then(function () {
          this.partial('./tpl/welcome.hbs')
        })
      } else {
        ctx.redirect('#/catalog')
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
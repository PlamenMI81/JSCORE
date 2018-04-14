function showMenu () {
  if (sessionStorage.getItem('authToken') === null) {
    $('section').hide()
    $('div.menu').hide()
  } else {
    $('#profile').show()
    $('#menu').show()
    $('#profile > span').text(`${sessionStorage.getItem('username')}`)
  }
}

function showInfo (messgae) {
  let infoBox = $('#infoBox')
  infoBox.text(messgae)
  infoBox.show()
  setTimeout(function () {
    $('#infoBox').fadeOut()
  }, 3000)
}

function showError (error) {
  let errorBox = $('#errorBox')
  $('#errorBox >span').text(error)
  errorBox.show()
}

async function loginView () {
  let hdr = await $.get('./tpl/header.hbs')
  Handlebars.registerPartial('header', hdr)
  let ftr = await $.get('./tpl/footer.hbs')
  Handlebars.registerPartial('footer', ftr)
  let loginSrc = await $.get('./tpl/login.hbs')
  let loginTpl = Handlebars.compile(loginSrc)
  let html = loginTpl()
  $('#main').append(html)

  $('#formLogin >a').click(function () {
    $('#main').empty()
    registerView()
  })
}

async function registerView () {
  let hdr = await $.get('./tpl/header.hbs')
  Handlebars.registerPartial('header', hdr)
  let ftr = await $.get('./tpl/footer.hbs')
  Handlebars.registerPartial('footer', ftr)
  let src = await $.get('./tpl/register.hbs')
  let tpl = Handlebars.compile(src)
  let html = tpl()
  $('#main').append(html)
  attachRegBtnEv()
  $('#formRegister >a').click(function () {
    $('#main').empty()
    loginView()
  })
}

async function feedView () {
  $('#main').empty()
  let hdr = await $.get('./tpl/header.hbs')
  Handlebars.registerPartial('header', hdr)
  let ftr = await $.get('./tpl/footer.hbs')
  Handlebars.registerPartial('footer', ftr)
  let src = await $.get('./tpl/feed.hbs')
  let tpl = Handlebars.compile(src)
  let html = tpl()
  $('#main').append(html)

}
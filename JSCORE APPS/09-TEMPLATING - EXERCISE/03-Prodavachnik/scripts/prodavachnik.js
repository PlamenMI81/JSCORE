function startApp () {
  const BASEURL = 'https://baas.kinvey.com/'
  const APPID = 'kid_SJdF7CqcM'
  const APPSECRET = '393545d075134ca1b49177e6bd0a1a2c'
  const successNotification = window.createNotification({
    theme: 'success',
    showDuration: 5000
  })
  const errorNotification = window.createNotification({
    theme: 'error',
    showDuration: 0
  })
  attachEvents()
  toggleMenuItems()
  showHome()

  function attachEvents () {

    $('a#linkHome').on('click', () => {
      $('main').empty()
      showHome()
    })
    $('a#linkLogin').on('click', () => {
      $('main').empty()
      loginView()
    })

    $('a#linkListAds').on('click', () => {
      $('a#linkListAds').css('pointer-events', 'none')
      $('main').empty()
      listAdsView()
    })
    $('a#linkCreateAd').on('click', () => {
      $('main').empty()
      createAdView()
    })

    $('a#linkRegister').on('click', () => {
      $('main').empty()
      registerUser()
    })
    $('a#linkLogout').on('click', logout)
  }

  function toggleMenuItems () {
    $('a#linkHome').show()
    if (sessionStorage.hasOwnProperty('authToken')) {
      $('a#linkLogout').show()
      $('a#linkCreateAd').show()
      $('a#linkListAds').show()
      $('#loggedInUser').show()
      $('#userIcon').addClass('far fa-user fa-lg')
      $('#userName').text(sessionStorage.getItem('user'))
      $('a#linkRegister').hide()
      $('a#linkLogin').hide()
    } else {
      $('a#linkLogin').show()
      $('a#linkRegister').show()
      $('#loggedInUser').hide()
      $('a#linkLogout').hide()
      $('a#linkCreateAd').hide()
      $('a#linkListAds').hide()
    }
  }

  async function showHome () {
    let homeSrc = await $.get('templates/home.hbs')
    let homeTemplate = Handlebars.compile(homeSrc)
    let homeHtml = homeTemplate()
    $('main').append(homeHtml)
    $('#viewHome >h1').hide()
    $('#viewHome >p').hide()
    $('#viewHome').show()
    $('#viewHome >h1').show(2000, () => {$('#viewHome >p').show(2000)})
  }

  async function registerUser () {
    let registerSrc = await $.get('templates/register.hbs')
    let registerTemplate = Handlebars.compile(registerSrc)
    let registerHtml = registerTemplate()
    $('main').append(registerHtml)
    $('#buttonRegisterUser').on('click', register)

    function register () {
      let data = {
        username: $('#formRegister').find('input[name="username"]').val(),
        password: $('#formRegister').find('input[name="passwd"]').val()
      }
      request('POST', BASEURL + 'user/' + APPID, {Authorization: 'Basic ' + btoa(APPID + ':' + APPSECRET)}, data)
        .then(res => {
          sessionStorage.setItem('user', res.username)
          sessionStorage.setItem('authToken', res._kmd.authtoken)
          sessionStorage.setItem('creator', res._acl.creator)
          toggleMenuItems()
          notify('SUCCESSFUL REGISTERED', 'infoBox')
          listAdsView()
        })
        .catch(handleError)
    }
  }

  async function loginView () {
    let loginSrc = await $.get('templates/login.hbs')
    let loginTemplate = Handlebars.compile(loginSrc)
    let loginHtml = loginTemplate()
    $('main').append(loginHtml)
    $('#buttonLoginUser').on('click', login)

    function login () {
      let data = {
        username: $('#formLogin').find('input[name="username"]').val(),
        password: $('#formLogin').find('input[name="passwd"]').val()
      }
      request('POST', BASEURL + 'user/' + APPID + '/login', {Authorization: 'Basic ' + btoa(APPID + ':' + APPSECRET)}, data)
        .then(function (user) {
          sessionStorage.setItem('user', user.username)
          sessionStorage.setItem('authToken', user._kmd.authtoken)
          sessionStorage.setItem('creator', user._acl.creator)
          toggleMenuItems()
          notify('HELLO ' + user.username, 'infoBox')
          listAdsView()
        }).catch(handleError)
    }
  }

  function logout () {
    request('POST', BASEURL + 'user/' + APPID + '/_logout', {Authorization: 'Kinvey ' + sessionStorage.getItem('authToken')}, {})
      .then(function (res) {
        sessionStorage.clear()
        toggleMenuItems()
        $('section').hide()
        $('#viewHome').show()
        $('#ads').empty()
        notify('SUCCESSFULLY LOGGED OUT', 'infoBox')
      }).catch(handleError)
  }

  async function createAdView () {
    let createAdSrc = await $.get('templates/createAd.hbs')
    let createAdTemplate = Handlebars.compile(createAdSrc)
    let createAdHtml = createAdTemplate()
    $('main').append(createAdHtml)
    $('#buttonCreateAd').on('click', createAd)

    function createAd () {
      let data = {
        title: $('#formCreateAd').find('input[name="title"]').val(),
        description: $('#formCreateAd').find('textarea[name="description"]').val(),
        dateOfpublishing: $('#formCreateAd').find('input[name="datePublished"]').val(),
        price: Number($('#formCreateAd').find('input[name="price"]').val()),
        viewCount: 0,
        image: $('#formCreateAd').find('input[name="image"]').val(),
        publisher: sessionStorage.getItem('user')
      }
      request('POST', BASEURL + 'appdata/' + APPID + '/adv', {Authorization: 'Kinvey ' + sessionStorage.getItem('authToken')}, data)
        .then(res => {
          listAdsView()
          notify('ADD CREATED', 'infoBox')
        }).catch(handleError)
    }
  }

  async function listAdsView () {
    let tableSrc = await $.get('templates/listAds.hbs')
    let tableTemplate = Handlebars.compile(tableSrc)
    request('GET', BASEURL + 'appdata/' + APPID + '/adv', {Authorization: 'Kinvey ' + sessionStorage.getItem('authToken')}, {})
      .then(makeTable)
      .catch(handleError)

    function makeTable (res) {
      let tableHtml = tableTemplate({res})
      $('main').empty()
      $('main').append(tableHtml)
      $('a#linkListAds').css('pointer-events', 'auto')
      $('a#readMore').click(function (event) {
        let id = $(this).parent().parent().children(':first-child').text()
        readMore(id)
      })
      $('a#delete').click(function (event) {
        let id = $(this).parent().parent().children(':first-child').text()
        $(this).parent().parent().remove()
        deleteAd(id)
      })
      $('a#edit').click(function (event) {
        let id = $(this).parent().parent().children(':first-child').text()
        loadAdForEdit(id)
      })
    }

    async function readMore (id) {
      updateCounter(id)
      $('main').empty()
      let readMoreSrc = await $.get('templates/readMore.hbs')
      let readMoreTemplate = Handlebars.compile(readMoreSrc)
      request('GET', BASEURL + 'appdata/' + APPID + '/adv/' + id, {Authorization: 'Kinvey ' + sessionStorage.getItem('authToken')}, {})
        .then(readMoreView)
        .catch(handleError)

      function readMoreView (res) {
        let readMoreHtml = readMoreTemplate(res)
        $('main').append(readMoreHtml)
        $('#buttonBack').click(() => {
          $('main').empty()
          listAdsView()
        })
      }
    }

    function updateCounter (id) {
      let data = {_id: id}
      request('POST', BASEURL + 'rpc/' + APPID + '/custom/counter', {Authorization: 'Kinvey ' + sessionStorage.getItem('authToken')}, data)
    }

    function deleteAd (id) {
      request('DELETE', BASEURL + 'appdata/' + APPID + '/adv/' + id, {Authorization: 'Kinvey ' + sessionStorage.getItem('authToken')}, {})
        .then(req => {
          listAdsView()
          notify('DELETED', 'infoBox')
        })
        .catch(handleError)
    }

    async function loadAdForEdit (id) {
      $('main').empty()
      let editAdSrc = await $.get('templates/editAd.hbs')
      let editAdTemplate = Handlebars.compile(editAdSrc)
      request('GET', BASEURL + 'appdata/' + APPID + '/adv/' + id, {Authorization: 'Kinvey ' + sessionStorage.getItem('authToken')}, {})
        .then(editView)
        .catch(handleError)

      function editView (res) {
        let readMoreHtml = editAdTemplate(res)
        $('main').append(readMoreHtml)
        $('#buttonEditAd').click(() => {
          editAdView()
        })
      }

      function editAdView () {
        const FORMEDIT = $('#formEditAd')
        let id = FORMEDIT.find('input[name="id"]').val()
        let data = {
          title: FORMEDIT.find('input[name="title"]').val(),
          description: FORMEDIT.find('textarea[name="description"]').val(),
          dateOfpublishing: FORMEDIT.find('input[name="datePublished"]').val(),
          price: Number(FORMEDIT.find('input[name="price"]').val()),
          image: FORMEDIT.find('input[name="image"]').val(),
          viewCount: Number(FORMEDIT.find('input[name="viewCount"]').val()),
          publisher: sessionStorage.getItem('user')
        }
        request('PUT', BASEURL + 'appdata/' + APPID + '/adv/' + id, {Authorization: 'Kinvey ' + sessionStorage.getItem('authToken')}, data)
          .then(res => {
            listAdsView()
            notify('ADD EDITED', 'infoBox')
          })
          .catch(handleError)
      }
    }
  }

  function handleError (err) {
    notify(err.responseJSON.description, 'errorBox')
  }

  function notify (data, selector) {
    if (selector === 'errorBox') {
      errorNotification({
        title: 'Error',
        message: data
      })

      return
    }
    successNotification({
      message: data
    })
  }
}


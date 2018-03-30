function startApp () {
  const BASEURL = 'https://baas.kinvey.com/'
  const APPID = 'kid_SJdF7CqcM'
  const APPSECRET = '393545d075134ca1b49177e6bd0a1a2c'
  init()
  $('#buttonRegisterUser').click(registerUser)
  $('#buttonLoginUser').click(login)
  $('#buttonCreateAd').click(create)
  $('#linkLogout').click(logout)

  function init () {
    $('#menu').find('a#linkHome').show()
    $('#viewHome').show()

    toggleMenuItems()

    $('#errorBox').click((ev) => $(ev.target).hide())

    $('#menu').find('a#linkHome').click(() => {
      $('section').hide()
      $('#viewHome').show()
    })

    $('#menu').find('a#linkLogin').click(() => {
      $('section').hide()
      $('#viewLogin').show()
    })

    $('#menu').find('a#linkListAds').click(() => {
      $('section').hide()
      $('#viewAds').show()
      listAds()
    })

    $('#menu').find('a#linkCreateAd').click(() => {
      $('section').hide()
      $('#viewCreateAd').show()
    })

    $('#menu').find('a#linkRegister').click(() => {
      $('section').hide()
      $('#viewRegister').show()
    })
  }

  function toggleMenuItems () {
    console.log(localStorage.hasOwnProperty('authToken'))
    if (localStorage.hasOwnProperty('authToken')) {
      $('#menu').find('a#linkLogout').show()
      $('#menu').find('a#linkCreateAd').show()
      $('#menu').find('a#linkListAds').show()
      $('#menu').find('a#linkRegister').hide()
      $('#menu').find('a#linkLogin').hide()
    } else {
      $('#menu').find('a#linkLogin').show()
      $('#menu').find('a#linkRegister').show()
      $('#menu').find('a#linkLogout').hide()
      $('#menu').find('a#linkCreateAd').hide()
      $('#menu').find('a#linkListAds').hide()
    }
  }

  function registerUser () {
    let username = $('#formRegister').find('input[name="username"]').val()
    let password = $('#formRegister').find('input[name="passwd"]').val()
    let data = {username, password}
    $.ajax({
      type: 'POST',
      url: BASEURL + 'user/' + APPID,
      headers: {Authorization: 'Basic ' + btoa(APPID + ':' + APPSECRET)},
      data: data,
      success: (res) => {
        localStorage.setItem('user', res.username)
        localStorage.setItem('authToken', res._kmd.authtoken)
        localStorage.setItem('creator', res._acl.creator)
        toggleMenuItems()
        $('section').hide()
        $('#viewAds').show()
        $('#formRegister').find('input[name="username"]').val('')
        $('#formRegister').find('input[name="passwd"]').val('')
      }, error: handleError
    })
  }

  function login () {
    let username = $('#formLogin').find('input[name="username"]').val()
    let password = $('#formLogin').find('input[name="passwd"]').val()
    let data = {username, password}
    $.ajax({
      type: 'POST',
      url: BASEURL + 'user/' + APPID + '/login',
      headers: {Authorization: 'Basic ' + btoa(APPID + ':' + APPSECRET)},
      data: data,
      success: (res) => {
        localStorage.setItem('user', res.username)
        localStorage.setItem('authToken', res._kmd.authtoken)
        localStorage.setItem('creator', res._acl.creator)
        toggleMenuItems()
        $('section').hide()
        $('#viewAds').show()
        notify(res.username, 'infoBox')
        $('#formLogin').find('input[name="username"]').val('')
        $('#formLogin').find('input[name="passwd"]').val('')
      },
      error: handleError
    })
  }

  function logout () {

    $.ajax({
      type: 'POST',
      url: BASEURL + 'user/' + APPID + '/_logout',
      headers: {Authorization: 'Kinvey ' + localStorage.getItem('authToken')},
      success: (res) => {
        localStorage.clear()
        toggleMenuItems()
        $('section').hide()
        $('#viewHome').show()
      },
      error: handleError
    })
  }

  function create () {
    let title = $('#formCreateAd').find('input[name="title"]').val()
    let description = $('#formCreateAd').find('textarea[name="description"]').val()
    let dateOfpublishing = $('#formCreateAd').find('input[name="datePublished"]').val()
    let price = $('#formCreateAd').find('input[name="price"]').val()
    let publisher = localStorage.getItem('creator')
    let data = JSON.stringify({title, description, dateOfpublishing, price: Number(price), publisher})
    $.ajax({
      type: 'POST',
      url: BASEURL + 'appdata/' + APPID + '/adv',
      headers: {Authorization: 'Kinvey ' + localStorage.getItem('authToken')},
      contentType: 'application/json',
      data: data,
      success: (res) => {
        // toggleMenuItems()
        $('section').hide()
        $('#viewAds').show()
        $('#formCreateAd').find('input[name="title"]').val('')
        $('#formCreateAd').find('textarea[name="description"]').val('')
        $('#formCreateAd').find('input[name="datePublished"]').val('')
        $('#formCreateAd').find('input[name="price"]').val('')
        notify('ADD CREATED', 'infoBox')
      }, error: handleError
    })
  }
  function listAds () {
    
  }

  function handleError (err) {
    notify(err.responseJSON.description, 'errorBox')
  }

  function notify (data, selector) {
    if (selector === 'errorBox') {
      $('#' + selector).text(data).show()
      return
    }
    $('#' + selector).text('Hello ' + data).show().hide(2000)
  }
}
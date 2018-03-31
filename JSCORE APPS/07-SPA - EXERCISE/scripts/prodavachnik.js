function startApp () {
  const BASEURL = 'https://baas.kinvey.com/'
  const APPID = 'kid_SJdF7CqcM'
  const APPSECRET = '393545d075134ca1b49177e6bd0a1a2c'
  const MENU = $('#menu')
  init()

  function init () {
    $('#buttonRegisterUser').click(registerUser)
    $('#buttonLoginUser').click(login)
    $('#buttonCreateAd').click(create)
    $('#linkLogout').click(logout)
    $('#errorBox').click((ev) => $(ev.target).hide())

    MENU.find('a#linkHome').show()
    $('#viewHome').show()

    toggleMenuItems()

    MENU.find('a#linkHome').click(() => {
      $('section').hide()
      $('#viewHome').show()
    })

    MENU.find('a#linkLogin').click(() => {
      $('section').hide()
      $('#viewLogin').show()
    })

    MENU.find('a#linkListAds').click(() => {
      $('#ads').find('table').find('tr').remove()
      $('section').hide()
      $('#viewAds').show()
      listAds()
    })

    MENU.find('a#linkCreateAd').click(() => {
      $('section').hide()
      $('#viewCreateAd').show()
    })

    MENU.find('a#linkRegister').click(() => {
      $('section').hide()
      $('#viewRegister').show()
    })
  }

  function toggleMenuItems () {
    if (localStorage.hasOwnProperty('authToken')) {
      MENU.find('a#linkLogout').show()
      MENU.find('a#linkCreateAd').show()
      MENU.find('a#linkListAds').show()
      MENU.find('a#linkRegister').hide()
      MENU.find('a#linkLogin').hide()
    } else {
      MENU.find('a#linkLogin').show()
      MENU.find('a#linkRegister').show()
      MENU.find('a#linkLogout').hide()
      MENU.find('a#linkCreateAd').hide()
      MENU.find('a#linkListAds').hide()
    }
  }

  function registerUser () {
    const FORMREGISTER = $('#formRegister')
    let username = FORMREGISTER.find('input[name="username"]').val()
    let password = FORMREGISTER.find('input[name="passwd"]').val()
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
        FORMREGISTER.find('input[name="username"]').val('')
        FORMREGISTER.find('input[name="passwd"]').val('')
        toggleMenuItems()
        $('section').hide()
        $('#viewAds').show()
        notify('SUCCESSFUL REGISTERED', 'infoBox')
        listAds()
      },
      error: handleError
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
        $('#formLogin').find('input[name="username"]').val('')
        $('#formLogin').find('input[name="passwd"]').val('')
        toggleMenuItems()
        $('section').hide()
        $('#viewAds').show()
        listAds()
        notify('HELLO ' + res.username, 'infoBox')
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
        $('#ads').find('table').find('tr').remove()
        notify('SUCCESSFULY LOGED OUT', 'infoBox')
      },
      error: handleError
    })
  }

  function create () {
    const FORMCREATEAD = $('#formCreateAd')
    let title = FORMCREATEAD.find('input[name="title"]').val()
    let description = FORMCREATEAD.find('textarea[name="description"]').val()
    let dateOfpublishing = FORMCREATEAD.find('input[name="datePublished"]').val()
    let price = FORMCREATEAD.find('input[name="price"]').val()
    let publisher = localStorage.getItem('user')
    let data = JSON.stringify({title, description, dateOfpublishing, price: Number(price), publisher})
    $.ajax({
      type: 'POST',
      url: BASEURL + 'appdata/' + APPID + '/adv',
      headers: {Authorization: 'Kinvey ' + localStorage.getItem('authToken')},
      contentType: 'application/json',
      data: data,
      success: (res) => {
        $('section').hide()
        $('#viewAds').show()
        FORMCREATEAD.find('input[name="title"]').val('')
        FORMCREATEAD.find('input[name="datePublished"]').val('')
        FORMCREATEAD.find('input[name="price"]').val('')
        FORMCREATEAD.find('textarea').val('')
        listAds()
        notify('ADD CREATED', 'infoBox')
      }, error: handleError
    })
  }

  function listAds () {
    notify('LOADING...', 'loadingBox')
    $('#ads').find('table').find('tr').remove()
    $.ajax({
      type: 'GET',
      url: BASEURL + 'appdata/' + APPID + '/adv',
      headers: {Authorization: 'Kinvey ' + localStorage.getItem('authToken')},
      contentType: 'application/json',
      success: makeTable,
      error: handleError
    })
  }

  function makeTable (res) {
    notify('LOADING...', 'loadingBox')
    let table = $('#ads').find('table')
    table.append($(`<tr>
                    <th>Title</th>
                    <th>Publisher</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Date Published</th>
                </tr>`))
    for (let e of res) {
      let tr = $('<tr>')
        .append(
          $('<td>').text(e.title),
          $('<td>').text(e.publisher),
          $('<td>').text(e.description),
          $('<td>').text(e.price),
          $('<td>').text(e.dateOfpublishing))
      if (localStorage.getItem('creator') === e._acl.creator) {
        tr.append($('<td>')
          .append($('<a href="#">[Delete]</a>').click(() => deleteAd(e)))
          .append($('<a href="#">[Edit]</a>').click(() => edit(e))))
      }
      tr.appendTo(table)
    }
  }

  function edit (e) {
    const FORMEDIT = $('#formEditAd')
    $('section').hide()
    $('#viewEditAd').show()
    FORMEDIT.find('input[name="title"]').val(e.title)
    FORMEDIT.find('textarea[name="description"]').val(e.description)
    FORMEDIT.find('input[name="datePublished"]').val(e.dateOfpublishing)
    FORMEDIT.find('input[name="price"]').val(e.price)
    $('#buttonEditAd').click(() => {
      let title = FORMEDIT.find('input[name="title"]').val()
      let description = FORMEDIT.find('textarea[name="description"]').val()
      let dateOfpublishing = FORMEDIT.find('input[name="datePublished"]').val()
      let price = FORMEDIT.find('input[name="price"]').val()
      let publisher = localStorage.getItem('user')
      let data = JSON.stringify({title, description, dateOfpublishing, price: Number(price), publisher})
      $.ajax({
        type: 'PUT',
        url: BASEURL + 'appdata/' + APPID + '/adv/' + e._id,
        headers: {Authorization: 'Kinvey ' + localStorage.getItem('authToken')},
        contentType: 'application/json',
        data: data,
        success: (res) => {
          FORMEDIT.find('input[name="title"]').val('')
          FORMEDIT.find('input[name="datePublished"]').val('')
          FORMEDIT.find('input[name="price"]').val('')
          FORMEDIT.find('textarea').val('')
          $('section').hide()
          $('#viewAds').show()
          listAds()
          notify('ADD EDITED', 'infoBox')
        }, error: handleError
      })
    })
  }

  function deleteAd (e) {
    $.ajax({
      type: 'DELETE',
      url: BASEURL + 'appdata/' + APPID + '/adv/' + e._id,
      headers: {Authorization: 'Kinvey ' + localStorage.getItem('authToken')},
      success: (req) => {
        listAds()
        notify('DELETED', 'infoBox')
      },
      error: handleError
    })
  }

  function handleError (err) {
    notify(err.responseJSON.description, 'errorBox')
  }

  function notify (data, selector) {
    if (selector === 'loadingBox') {
      $('#' + selector).text(data).toggle()
      return
    }
    if (selector === 'errorBox') {
      $('#' + selector).text(data).show()
      return
    }
    $('#' + selector).text(data).show()
    setTimeout(()=>$('#' + selector).hide(),2000)

  }
}
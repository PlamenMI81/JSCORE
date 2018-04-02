function startApp () {
  const BASEURL = 'https://baas.kinvey.com/'
  const APPID = 'kid_SJdF7CqcM'
  const APPSECRET = '393545d075134ca1b49177e6bd0a1a2c'
  attachEvents()
  $('#viewHome').show()
  toggleMenuItems()

  function attachEvents () {
    $(document).on({
      ajaxStart: function () { $('#loadingBox').show() },
      ajaxStop: function () { $('#loadingBox').hide() }
    })

    $('#errorBox').on('click', (ev) => $(ev.target).hide())

    $('a#linkHome').on('click', () => {
      $('section').hide()
      $('#viewHome').show()
    })
    $('a#linkLogin').on('click', () => {
      $('section').hide()
      $('#viewLogin').show()
    })

    $('a#linkListAds').on('click', () => {
      $('section').hide()
      $('#viewAds').show()
      listAds()
    })
    $('a#linkCreateAd').on('click', () => {
      $('section').hide()
      $('#viewCreateAd').show()
    })

    $('a#linkRegister').on('click', () => {
      $('section').hide()
      $('#viewRegister').show()
    })
    $('#buttonEditAd').on('click', editAd)
    $('#buttonCreateAd').on('click', createAd)
    $('#buttonLoginUser').on('click', login)
    $('#buttonRegisterUser').on('click', registerUser)
    $('a#linkLogout').on('click', logout)
  }

  function toggleMenuItems () {
    $('a#linkHome').show()
    if (sessionStorage.hasOwnProperty('authToken')) {
      $('a#linkLogout').show()
      $('a#linkCreateAd').show()
      $('a#linkListAds').show()
      $('#loggedInUser').text('HELLO: ' + sessionStorage.getItem('user')).show()
      $('a#linkRegister').hide()
      $('a#linkLogin').hide()
    } else {
      $('a#linkLogin').show()
      $('a#linkRegister').show()
      $('#loggedInUser').text('').hide()
      $('a#linkLogout').hide()
      $('a#linkCreateAd').hide()
      $('a#linkListAds').hide()
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
        sessionStorage.setItem('user', res.username)
        sessionStorage.setItem('authToken', res._kmd.authtoken)
        sessionStorage.setItem('creator', res._acl.creator)
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
      method: 'POST',
      url: BASEURL + 'user/' + APPID + '/login',
      headers: {Authorization: 'Basic ' + btoa(APPID + ':' + APPSECRET)},
      data: data,
    }).then(function (user) {
      sessionStorage.setItem('user', user.username)
      sessionStorage.setItem('authToken', user._kmd.authtoken)
      sessionStorage.setItem('creator', user._acl.creator)
      $('#formLogin').find('input[name="username"]').val('')
      $('#formLogin').find('input[name="passwd"]').val('')
      toggleMenuItems()
      $('section').hide()
      $('#viewAds').show()
      notify('HELLO ' + user.username, 'infoBox')
      listAds()
    }).catch(function (res) {
      handleError(res)
    })
  }

  function logout () {
    $.ajax({
      type: 'POST',
      url: BASEURL + 'user/' + APPID + '/_logout',
      headers: {Authorization: 'Kinvey ' + sessionStorage.getItem('authToken')}
    }).then(function (res) {
      sessionStorage.clear()
      toggleMenuItems()
      $('section').hide()
      $('#viewHome').show()
      $('#ads').empty()
      notify('SUCCESSFULLY LOGGED OUT', 'infoBox')
    }).catch(function (res) {
      handleError(res)
    })
  }

  function createAd () {
    const FORMCREATEAD = $('#formCreateAd')
    let title = FORMCREATEAD.find('input[name="title"]').val()
    let description = FORMCREATEAD.find('textarea[name="description"]').val()
    let dateOfpublishing = FORMCREATEAD.find('input[name="datePublished"]').val()
    let price = FORMCREATEAD.find('input[name="price"]').val()
    let image = FORMCREATEAD.find('input[name="image"]').val()
    let publisher = sessionStorage.getItem('user')
    let data = JSON.stringify({
      title,
      description,
      dateOfpublishing,
      price: Number(price),
      viewCount: 0,
      image,
      publisher
    })
    $.ajax({
      type: 'POST',
      url: BASEURL + 'appdata/' + APPID + '/adv',
      headers: {Authorization: 'Kinvey ' + sessionStorage.getItem('authToken')},
      contentType: 'application/json',
      data: data,
      success: (res) => {
        $('section').hide()
        $('#viewAds').show()
        FORMCREATEAD.find('input[name="title"]').val('')
        FORMCREATEAD.find('input[name="datePublished"]').val('')
        FORMCREATEAD.find('input[name="price"]').val('')
        FORMCREATEAD.find('input[name="image"]').val('')
        FORMCREATEAD.find('textarea').val('')
        listAds()
        notify('ADD CREATED', 'infoBox')
      }, error: handleError
    })
  }

  function listAds () {
    $('#ads').empty()
    $.ajax({
      type: 'GET',
      url: BASEURL + 'appdata/' + APPID + '/adv',
      headers: {Authorization: 'Kinvey ' + sessionStorage.getItem('authToken')},
      success: makeTable,
      error: handleError
    })

    function makeTable (res) {
      let tableContainer = $('#ads')
      let table = $('<table>')
      table.append($(`<tr>
                    <th>Title</th>
                    <th>Publisher</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Date Published</th>
                    <th>Actions</th>
                </tr>`))
      for (let e of res) {
        let tr = $('<tr>')
          .append(
            $('<td>').text(e.title),
            $('<td>').text(e.publisher),
            $('<td>').text(e.description),
            $('<td>').text(e.price),
            $('<td>').text(e.dateOfpublishing))
        let linksTd = $('<td>')
          .append($('<a href="#">&#9906</a>').on('click', () => readMore(e)))
        if (sessionStorage.getItem('creator') === e._acl.creator) {
          linksTd.append($('<a href="#">&#9931</a>').on('click', () => loadAdForEdit(e)))
            .append($('<a href="#">&#9938</a>').on('click', () => deleteAd(e)))
        }
        linksTd.appendTo(tr)
        tr.appendTo(table)
      }
      table.appendTo(tableContainer)

      function readMore (e) {
        updateCounter(e)
        $('section').hide()
        $('#viewDetailsAd').empty()
        $('#viewDetailsAd').show()
        if (e.image === '') {
          $('<div>').text('No Image').appendTo($('#viewDetailsAd'))
        } else {
          let image = $('<img>').attr('src', e.image).css({
            'height-max': '600px',
            'width': '600px'
          })
          image.appendTo($('#viewDetailsAd'))
        }
        let advertInfo = $('<div>').append(
          $('<br>'),
          $('<label>').text('Title:'),
          $('<h1>').text(e.title),
          $('<label>').text('Description:'),
          $('<p>').text(e.description),
          $('<label>').text('Publisher:'),
          $('<div>').text(e.publisher),
          $('<label>').text('Date:'),
          $('<div>').text(e.dateOfpublishing),
          $('<label>').text('Views:'),
          $('<span>').text(e.viewCount + 1),
          $('<br>'),
          $('<input type="button" id="buttonBack" value="BACK" />').on('click',()=>{
            $('section').hide()
            $('#viewAds').show()
            listAds()
          })
        )
        advertInfo.appendTo($('#viewDetailsAd'))

        function updateCounter (e) {
          let adId = e._id
          let data = JSON.stringify({_id: adId})
          $.ajax({
            type: 'POST',
            url: BASEURL + 'rpc/' + APPID + '/custom/counter',
            headers: {Authorization: 'Kinvey ' + sessionStorage.getItem('authToken')},
            contentType: 'application/json',
            data: data,
            success: (res) => {},
            error: handleError
          })
        }
      }

      function deleteAd (e) {
        $.ajax({
          type: 'DELETE',
          url: BASEURL + 'appdata/' + APPID + '/adv/' + e._id,
          headers: {Authorization: 'Kinvey ' + sessionStorage.getItem('authToken')},
          success: (req) => {
            listAds()
            notify('DELETED', 'infoBox')
          },
          error: handleError
        })
      }

      function loadAdForEdit (adv) {
        const FORMEDIT = $('#formEditAd')
        $('section').hide()
        FORMEDIT.find('input[name="id"]').val(adv._id)
        FORMEDIT.find('input[name="title"]').val(adv.title)
        FORMEDIT.find('textarea[name="description"]').val(adv.description)
        FORMEDIT.find('input[name="datePublished"]').val(adv.dateOfpublishing)
        FORMEDIT.find('input[name="price"]').val(adv.price)
        FORMEDIT.find('input[name="image"]').val(adv.image)
        FORMEDIT.find('input[name="viewCount"]').val(adv.viewCount)
        $('#viewEditAd').show()
      }
    }
  }

  function editAd () {
    const FORMEDIT = $('#formEditAd')
    let id = FORMEDIT.find('input[name="id"]').val()
    let title = FORMEDIT.find('input[name="title"]').val()
    let description = FORMEDIT.find('textarea[name="description"]').val()
    let dateOfpublishing = FORMEDIT.find('input[name="datePublished"]').val()
    let price = FORMEDIT.find('input[name="price"]').val()
    let image = FORMEDIT.find('input[name="image"]').val()
    let viewCount = FORMEDIT.find('input[name="viewCount"]').val()
    let publisher = sessionStorage.getItem('user')
    let data = JSON.stringify({
      title,
      description,
      dateOfpublishing,
      price: Number(price),
      image,
      viewCount: Number(viewCount),
      publisher
    })
    $.ajax({
      method: 'PUT',
      url: BASEURL + 'appdata/' + APPID + '/adv/' + id,
      headers: {Authorization: 'Kinvey ' + sessionStorage.getItem('authToken')},
      contentType: 'application/json',
      data: data,
      success: (res) => {
        $('section').hide()
        $('#viewAds').show()
        listAds()
        notify('ADD EDITED', 'infoBox')
      }, error: handleError
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
    setTimeout(() => $('#' + selector).hide(), 2000)

  }
}
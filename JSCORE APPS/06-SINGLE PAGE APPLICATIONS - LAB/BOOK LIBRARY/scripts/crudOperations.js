const BASE_URL = 'https://baas.kinvey.com/'
const APP_KEY = 'kid_rJyNEiPcf'
const APP_SECRET = 'd595cd78be1e4bb3a5b7bae3d33327cd'
const AUTH_HEADERS = {'Authorization': 'Basic ' + btoa(APP_KEY + ':' + APP_SECRET)}
const BOOKS_PER_PAGE = 10

function loginUser () {
  let username = $('#formLogin input[name=username]').val()
  let password = $('#formLogin input[name=passwd]').val()
  $.ajax({
    method: 'POST',
    url: BASE_URL + 'user/' + APP_KEY + '/login',
    headers: AUTH_HEADERS,
    data: {username, password}
  }).then(function (res) {
    signInUser(res, 'Login successful.')
    sessionStorage.setItem('username', res.username)
    sessionStorage.setItem('authToken', res._kmd.authtoken)
    sessionStorage.setItem('userId', res._id)
    showHomeView()
    showHideMenuLinks()
  }).catch(handleAjaxError)
  // TODO
  // POST -> BASE_URL + 'user/' + APP_KEY + '/login'
  // signInUser(res, 'Login successful.')
}

function registerUser () {
  let username = $('#formRegister input[name=username]').val()
  let password = $('#formRegister input[name=passwd]').val()
  $.ajax({
    method: 'POST',
    url: BASE_URL + 'user/' + APP_KEY + '/',
    headers: AUTH_HEADERS,
    data: {username, password}
  }).then(function (res) {
    signInUser(res, 'Registration successful')
    sessionStorage.setItem('username', res.username)
    sessionStorage.setItem('authToken', res._kmd.authtoken)
    sessionStorage.setItem('userId', res._id)
    showHomeView()
    showHideMenuLinks()
  }).catch(handleAjaxError)
  // TODO
  // POST -> BASE_URL + 'user/' + APP_KEY + '/'
  // signInUser(res, 'Registration successful.')
}

function listBooks () {
  $.ajax({
    url: BASE_URL + 'appdata/' + APP_KEY + '/books',
    headers: {'Authorization': 'Kinvey ' + sessionStorage.getItem('authToken')}
  }).then(function (res) {
    showView('viewBooks')
    displayPaginationAndBooks(res.reverse())
  }).catch(handleAjaxError)
  // TODO
  // GET -> BASE_URL + 'appdata/' + APP_KEY + '/books'
  // displayPaginationAndBooks(res.reverse())
}

function createBook () {
  // TODO
  // POST -> BASE_URL + 'appdata/' + APP_KEY + '/books'
  // showInfo('Book created.')
}

function deleteBook (book) {
  // TODO
  // DELETE -> BASE_URL + 'appdata/' + APP_KEY + '/books/' + book._id
  // showInfo('Book deleted.')
}

function loadBookForEdit (book) {
  // TODO
}

function editBook () {
  // TODO
  // PUT -> BASE_URL + 'appdata/' + APP_KEY + '/books/' + book._id
  // showInfo('Book edited.')
}

function saveAuthInSession (userInfo) {
  // TODO
}

function logoutUser () {
  $.ajax({
    method: 'POST',
    url: BASE_URL + 'user/' + APP_KEY + '/_logout',
    headers: {Authorization: 'Kinvey ' + sessionStorage.getItem('authToken')},
    success: (res) => {
      sessionStorage.clear()
      showHomeView()
      showHideMenuLinks()
      showInfo('Logout successful.')
    },
    error: handleAjaxError()
  })



}

function signInUser (res, message) {
  showInfo(message)
}

function displayPaginationAndBooks (books) {
  let pagination = $('#pagination-demo')
  if (pagination.data('twbs-pagination')) {
    pagination.twbsPagination('destroy')
  }
  pagination.twbsPagination({
    totalPages: Math.ceil(books.length / BOOKS_PER_PAGE),
    visiblePages: 5,
    next: 'Next',
    prev: 'Prev',
    onPageClick: function (event, page) {
      let table = $('#books > table')
      table.find('tr').each((index, el) => {
        if (index > 0) {
          $(el).remove()
        }
      })
      let startBook = (page - 1) * BOOKS_PER_PAGE
      let endBook = Math.min(startBook + BOOKS_PER_PAGE, books.length)
      $(`a:contains(${page})`).addClass('active')
      for (let i = startBook; i < endBook; i++) {
        table
          .append($('<tr>')
            .append($(`<td>${books[i].title}</td>`))
            .append($(`<td>${books[i].author}</td>`))
            .append($(`<td>${books[i].description}</td>`))
            .append($(`<td>`)
              .append(`<a href="#">[Edit]</a>`).on('click', function () {

              }))
            .append(`<a href="#">[Delete]</a>`).on('click', function () {

            }))
      }
    }
  })
}

function handleAjaxError (response) {
  let errorMsg = JSON.stringify(response)
  // if (response.readyState === 0)
  //   errorMsg = 'Cannot connect due to network error.'
  if (response.responseJSON && response.responseJSON.description)
    errorMsg = response.responseJSON.description
  showError(errorMsg)
}
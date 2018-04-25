let remote = (() => {
  const BASE_URL = 'https://baas.kinvey.com/'
  const APP_KEY = 'kid_SJ8JUkAnG' // APP KEY HERE
  const APP_SECRET = 'fa67e770e9dc4696b6ae784a5553c978' // APP SECRET HERE

  // request method (GET, POST, PUT)
  // kinvey module (user/appdata)
  // url endpoint
  // auth
  function makeRequest (method, module, endpoint, auth) {
    return {
      url: BASE_URL + module + '/' + APP_KEY + '/' + endpoint,
      method: method,
      contentType:'application/json',
      headers: {
        'Authorization': makeAuth(auth)
      }
    }

    function makeAuth (auth) {
      if (auth === 'basic') {
        return `Basic ${btoa(APP_KEY + ':' + APP_SECRET)}`
      } else {
        return `Kinvey ${sessionStorage.getItem('authtoken')}`
      }
    }
  }

  function get (module, endpoint, auth) {
    return $.ajax(makeRequest('GET', module, endpoint, auth))
  }

  function post (module, endpoint, auth, data) {
    let obj = makeRequest('POST', module, endpoint, auth)
    if (data) {
      obj.data = JSON.stringify(data)
    }
    return $.ajax(obj)
  }

  function update (module, endpoint, auth, data) {
    let obj = makeRequest('PUT', module, endpoint, auth)
    obj.data = JSON.stringify(data)
    return $.ajax(obj)
  }

  function remove (module, endpoint, auth) {
    return $.ajax(makeRequest('DELETE', module, endpoint, auth))
  }

  return {
    get,
    post,
    update,
    remove
  }
})()
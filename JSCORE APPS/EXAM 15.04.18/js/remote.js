let remote = (() => {
<<<<<<< HEAD:JSCORE APPS/SeenIt-Kiro/js/remote.js
  const BASE_URL = 'https://baas.kinvey.com/'
  const APP_KEY = 'kid_SkxeSjJhz' // APP KEY HERE
  const APP_SECRET = 'c3f9a18e30e2456e9470ec848c9bee34' // APP SECRET HERE
=======
    const BASE_URL = 'https://baas.kinvey.com/';
    const APP_KEY = 'kid_SkpNg0enf'; // APP KEY HERE
    const APP_SECRET = '35d6d396d04f4d95b68e5cd4c203f2c6'; // APP SECRET HERE
>>>>>>> 53cae624879aabee915aa313d5ff54dced9aaba5:JSCORE APPS/EXAM 15.04.18/js/remote.js

  // request method (GET, POST, PUT)
  // kinvey module (user/appdata)
  // url endpoint
  // auth
  function makeRequest (method, module, endpoint, auth) {
    return {
      url: BASE_URL + module + '/' + APP_KEY + '/' + endpoint,
      method: method,
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
      obj.data = data
    }
    return $.ajax(obj)
  }

  function update (module, endpoint, auth, data) {
    let obj = makeRequest('PUT', module, endpoint, auth)
    obj.data = data
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
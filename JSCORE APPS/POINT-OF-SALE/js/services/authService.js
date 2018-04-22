let auth = (() => {
  function isAuth () {
    return sessionStorage.getItem('authtoken') !== null
  }

  function getUsername () {
    return sessionStorage.getItem('username')
  }

  function saveSession (userData) {
    sessionStorage.setItem('authtoken', userData._kmd.authtoken)
    sessionStorage.setItem('username', userData.username)
    sessionStorage.setItem('userId', userData._id)
  }

  function register (username, password) {
    let obj = {username, password}

    return remote.post('user', '', 'basic', obj)
  }

  function login (username, password) {
    let obj = {username, password}

    return remote.post('user', 'login', 'basic', obj)
  }

  function logout () {
    return remote.post('user', '_logout', 'kinvey')
  }

  return {
    isAuth,
    getUsername,
    login,
    logout,
    register,
    saveSession
  }
})()
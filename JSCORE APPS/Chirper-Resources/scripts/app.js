$(function () {
  showMenu()
  if (sessionStorage.getItem('authToken') === null) {
    loginView()
  } else {
    feedView()
  }
attachNotifEvents()
})
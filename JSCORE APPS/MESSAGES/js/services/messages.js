let messages = (() => {
  function getAllUsers () {
    return remote.get('user', '', 'kinvey')
  }

  function sendMessage (data) {
    return remote.post('appdata','messages','kinvey',data)
  }

  function getMessageByUsername (username) {
    let endpoint=`messages?query={"sender_username":"${username}"}`
    return remote.get('appdata',endpoint,'kinvey')
  }

  function deleteMessage (id) {
    let endpoint=`messages/${id}`
    return remote.remove('appdata',endpoint,'kinvey')
  }

  function getMyMessages (username) {
    let endpoint=`messages?query={"recipient_username":"${username}"}`
    return remote.get('appdata',endpoint,'kinvey')
  }



  return {
    getAllUsers,
    sendMessage,
    getMessageByUsername,
    deleteMessage,
    getMyMessages,
  }
})()
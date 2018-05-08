let catalogService = (() => {
  function getFlights () {
    let endpoint=`flights?query={"isPublished":true}`
    return remote.get('appdata',endpoint,'kinvey')
  }

  function getFlightsById (id) {
    let endpoint='flights/'+id
    return remote.get('appdata',endpoint,'kinvey')
  }

  function getMyFlights (userId) {
    let endpoint=`flights?query={"_acl.creator":"${userId}"}`
    return remote.get('appdata',endpoint,'kinvey')
  }

  function createFlight (data) {
    return remote.post('appdata','flights','kinvey',data)
  }

  function editFlight (id,data) {
    return remote.update('appdata','flights/'+id,'kinvey',data)
  }

  function deteleFlight (id) {
    return remote.remove('appdata','flights/'+id,'kinvey')
  }

  return {
    getFlights,
    createFlight,
    editFlight,
    getFlightsById,
    getMyFlights,
    deteleFlight,
  }
})()
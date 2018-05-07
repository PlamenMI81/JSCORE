let chirpsService = (() => {
  function chirpsBySubscription (subsc) {
    const endpoint = `chirps?query={"author":{"$in": ${JSON.stringify(subsc)}}}&sort={"_kmd.ect": 1}`
    return remote.get('appdata', endpoint, 'kinvey')
  }

  function getSubsc (id) {
    return remote.get('user', id, 'kinvey')
  }

  function chirpCount (user) {
    let endpoint = `chirps?query={"author":"${user}"}`
    return remote.get('appdata', endpoint, 'kinvey')
  }

  function followingCount (user) {
    let endpoint = `?query={"username":"${user}"}`
    return remote.get('user', endpoint, 'kinvey')
  }

  function followersCount (user) {
    let endpoint = `?query={"subscriptions":"${user}"}`
    return remote.get('user', endpoint, 'kinvey')
  }

  function createChirp (text, author) {
    return remote.post('appdata', 'chirps', 'kinvey', {text, author})
  }

  function chirpsByUsername (username) {
    let endpoint=`chirps?query={"author":"${username}"}&sort={"_kmd.ect": 1}`
    return remote.get('appdata', endpoint, 'kinvey')
  }

  function deleteChirp (id) {
    return remote.remove('appdata', 'chirps/'+id, 'kinvey')
  }

  function getUsers () {
    return remote.get('user','','kinvey')
  }

  function unfollow (userId,data) {
    return remote.update('user',userId,'kinvey',data)
  }

  function follow (userId,data) {
    return remote.update('user',userId,'kinvey',data)
  }

  return {
    chirpsBySubscription,
    getSubsc,
    chirpCount,
    followingCount,
    followersCount,
    createChirp,
    chirpsByUsername,
    deleteChirp,
    getUsers,
    unfollow,
    follow,

    // editPost,
    // getMyPosts,
    // getPostById,
    // deletPost,
  }
})()
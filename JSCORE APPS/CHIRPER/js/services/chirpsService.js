let chirpsService = (() => {
  function chirpsBySubscription (subsc) {
    const endpoint = `chirps?query={"author":{"$in": ${JSON.stringify(subsc)}}}&sort={"_kmd.ect": 1}`
    return remote.get('appdata', endpoint, 'kinvey')
  }

  function getSubsc (id) {
    return remote.get('user', id, 'kinvey')
  }

  function chirpCount (user) {
    let endpoint=`chirps?query={"author":"${user}"}`
    return remote.get('appdata', endpoint, 'kinvey')
  }

  function followingCount (user) {
    let endpoint=`?query={"username":"${user}"}`
    return remote.get('user', endpoint, 'kinvey')
  }

  function followersCount (user) {
    let endpoint=`?query={"subscriptions":"${user}"}`
    return remote.get('user', endpoint, 'kinvey')
  }

  function editPost (postId,data) {
    let endpoint=`posts/${postId}`
    return remote.update('appdata',endpoint,'kinvey',data)
  }

  function getMyPosts (username) {
    const endpoint = `posts?query={"author":"${username}"}&sort={"_kmd.ect": -1}`
    return remote.get('appdata', endpoint, 'kinvey')
  }

  function getPostById (id) {
    const endpoint = `posts/${id}`
    return remote.get('appdata', endpoint, 'kinvey')
  }

  function deletPost (id) {
    const endpoint = `posts/${id}`
    return remote.remove('appdata', endpoint, 'kinvey')
  }
  return {
    chirpsBySubscription,
    getSubsc,
    chirpCount,
    followingCount,
    followersCount,

    editPost,
    getMyPosts,
    getPostById,
    deletPost,
  }
})()
let postsService = (() => {
  function listAllPosts () {
    const endpoint = `posts?query={}&sort={"_kmd.ect":-1}`
    return remote.get('appdata', endpoint, 'kinvey')
  }

  function submitLink (data) {
    return remote.post('appdata', 'posts', 'kinvey', data)
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
    listAllPosts,
    submitLink,
    editPost,
    getMyPosts,
    getPostById,
    deletPost,
  }
})()
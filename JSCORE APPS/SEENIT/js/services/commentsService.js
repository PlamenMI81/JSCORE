let commentsService = (() => {
  function getCommentsById (id) {
    const endpoint = `comments?query={"postId":"${id}"}&sort={"_kmd.ect": -1}`
    return remote.get('appdata', endpoint, 'kinvey')
  }

  function createComment (data) {
    return remote.post('appdata', 'comments', 'kinvey', data)
  }

  function deleteComment (id) {
    const endpoint = `comments/${id}`

    return remote.remove('appdata', endpoint, 'kinvey')
  }

  return {
    getCommentsById,
    createComment,
    deleteComment,
  }

})()
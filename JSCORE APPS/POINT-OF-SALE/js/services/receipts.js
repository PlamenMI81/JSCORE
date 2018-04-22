let receipts = (() => {
  function getActiveReceipt () {
    let userId=sessionStorage.getItem('userId')
    const endpoint = `receipts?query={"_acl.creator":"${userId}","active":true}`

    return remote.get('appdata', endpoint, 'kinvey')
  }

  function createReceipt () {
    let data = {active:true,productCount:0,total:0}

    return remote.post('appdata', 'receipts', 'kinvey', data)
  }

  function commitReceipt (receiptId,productCount,total) {
    let data = {active:false,productCount,total}
    let endpoint=`receipts/${receiptId}`

    return remote.update('appdata',endpoint,'kinvey',data)
  }

  function editPost (postId, author, title, description, url, imageUrl) {
    const endpoint = `posts/${postId}`
    let data = {author, title, description, url, imageUrl}

    return remote.update('appdata', endpoint, 'kinvey', data)
  }

  function deletePost (postId) {
    const endpoint = `posts/${postId}`

    return remote.remove('appdata', endpoint, 'kinvey')
  }

  function getMyPosts (username) {
    const endpoint = `posts?query={"author":"${username}"}&sort={"_kmd.ect": -1}`

    return remote.get('appdata', endpoint, 'kinvey')
  }

  function getPostById (postId) {
    const endpoint = `posts/${postId}`

    return remote.get('appdata', endpoint, 'kinvey')
  }

  return {
    getActiveReceipt,
    createReceipt,
    commitReceipt,
    deletePost,
    getPostById,
    getMyPosts
  }
})()
let receipt = (() => {
  function getAllActReceipt (userId) {
    const endpoint = `receipts?query={"_acl.creator":"${userId}","active":true}`

    return remote.get('appdata', endpoint, 'kinvey')
  }

  // function createPost(author, title, description, url, imageUrl) {
  //     let data = { author, title, description, url, imageUrl };
  //
  //     return remote.post('appdata', 'posts', 'kinvey', data);
  // }
  //
  // function editPost(postId, author, title, description, url, imageUrl) {
  //     const endpoint = `posts/${postId}`;
  //     let data = { author, title, description, url, imageUrl };
  //
  //     return remote.update('appdata', endpoint, 'kinvey', data);
  // }
  //
  // function deletePost(postId) {
  //     const endpoint = `posts/${postId}`;
  //
  //     return remote.remove('appdata', endpoint, 'kinvey');
  // }
  //
  function getMyReceipt (userId) {
    const endpoint = `receipts?query={"_acl.creator":"${userId}","active":false}`

    return remote.get('appdata', endpoint, 'kinvey')
  }

  //
  // function getPostById(postId) {
  //     const endpoint = `posts/${postId}`;
  //
  //     return remote.get('appdata', endpoint, 'kinvey');
  // }

  return {
    getAllActReceipt,
    // createPost,
    // editPost,
    // deletePost,
    // getPostById,
    getMyReceipt
  }
})()
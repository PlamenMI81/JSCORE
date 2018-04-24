let products = (() => {
  function getProducts () {
    const endpoint = `products`

    return remote.get('appdata', endpoint, 'kinvey')
  }

  function getProductById (id) {
    let endpoint=`products/${id}`
    return remote.get('appdata',endpoint,'kinvey')
  }

  function getUserCart (userId) {

    return remote.get('user',userId,'kinvey')
  }

  function updateUserCart (userId,data) {
    let endpoint=userId
    return remote.update('user', endpoint, 'kinvey', data)
  }







  return {
    getProducts,
    getProductById,
    getUserCart,
    updateUserCart
  }
})()
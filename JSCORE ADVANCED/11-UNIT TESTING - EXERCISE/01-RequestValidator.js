function validateRequest (reqObj) {
  function validateMethod (method) {
    return isValid = /^GET$|^POST$|^DELETE$|^CONNECT$/.test(method)
  }

  function validateUri (uri) {
    if (uri===undefined) {
      return false
    }
    return isValid = /^[a-zA-Z0-9.]+$/.test(uri)
  }

  function validateVersion (version) {
    return isValid = /\bHTTP\/0\.9\b|\bHTTP\/1\.0\b|\bHTTP\/1\.1\b|\bHTTP\/2\.0\b/.test(version)
  }

  function validateMessage (message) {
    if (message === undefined) {
      return false
    }
    return isValid = /^[^<>\\&'"]*$/.test(message)
  }

  if (!validateMethod(reqObj.method)) {
    throw new Error ('Invalid request header: Invalid Method')
  }

  if (!validateUri(reqObj.uri) ) {
    throw new Error ('Invalid request header: Invalid URI')
  }

  if (!validateVersion(reqObj.version)) {
    throw new Error ('Invalid request header: Invalid Version')
  }

  if (!validateMessage(reqObj.message)) {
    throw new Error ('Invalid request header: Invalid Message')
  }

  return reqObj

}

// console.log(validateRequest({
//   method: 'GET',
//   uri: 'svn.public.catalog',
//   version: 'HTTP/1.1',
//   message: ''
// }))

// validateRequest({
//   method: 'OPTIONS',
//   uri: 'git.master',
//   version: 'HTTP/1.1',
//   message: '-recursive'
// });

console.log(validateRequest({
  method: 'GET ',
  uri: 'svn.public.catalog',
  version: 'HTTP/1.1',
  message: ''
}))

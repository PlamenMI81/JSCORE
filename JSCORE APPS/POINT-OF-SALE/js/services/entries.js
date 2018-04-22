let entries = (() => {
  function getEntries (receiptId) {
    const endpoint = `entries?query={"receiptId":"${receiptId}"}`

    return remote.get('appdata', endpoint, 'kinvey')
  }

  function createEntry (type,qty,price,receiptId) {
    const endpoint = 'entries'
    let data = {type,qty,price,receiptId}

    return remote.post('appdata', endpoint, 'kinvey', data)
  }

  function deleteEntry (entryId) {
    const endpoint = `entries/${entryId}`

    return remote.remove('appdata', endpoint, 'kinvey')
  }

  return {
    getEntries,
    createEntry,
    deleteEntry
  }

})()
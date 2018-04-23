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

  function getMyReceipts (userId) {
    const endpoint = `receipts?query={"_acl.creator":"${userId}","active":false}`

    return remote.get('appdata', endpoint, 'kinvey')
  }

  return {
    getActiveReceipt,
    createReceipt,
    commitReceipt,
    getMyReceipts,
  }
})()
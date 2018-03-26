function attachEvents () {
  const url='https://messenger-95a88.firebaseio.com'
  function loadData () {
    function handleSuccess (res) {
      let sortedMessages=Object.keys(res).sort((a,b)=>a.timestamp-b.timestamp)
      sortedMessages.forEach(function (m) {
        let textArea=$('#messages')
        let string=`${res[m].author}: ${res[m].content}\n`
        textArea.append(string)
      })
    }

    $('#messages').empty()
    $.ajax({
      method: 'GET',
      url: url+'/.json'
    }).then(handleSuccess)
  }

  function sendData () {
    let author=$('#author').val()
    let content=$('#content').val()
    let timestamp=Date.now()
    let data=JSON.stringify({author,content,timestamp})
    $.ajax({
      method: 'POST',
      url: url+'/.json',
      data:data
    }).then(loadData)
  }

  $('#refresh').click(loadData)
  $('#submit').click(sendData)
}
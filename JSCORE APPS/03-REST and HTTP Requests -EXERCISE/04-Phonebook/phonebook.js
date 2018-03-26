function attachEvents() {
  const url='https://phonebook-ab0e9.firebaseio.com/phonebook'
  function loadData () {

    function makeList (res) {
      $('#phonebook').empty()
      for (let key in res) {
        let tr=$('<li>').text(`${res[key].person}: ${res[key].phone} `)
          .append($('<button>[Delete]</button>').click(function () {
            $.ajax({
              method: 'DELETE',
              url: url+'/'+key+'.json'
            }).then(()=>tr.remove())
          }))
        tr.appendTo($('#phonebook'))
      }
    }

    $.ajax({
      method: 'GET',
      url: url+'.json'
    }).then(makeList)
  }

  $('#btnLoad').click(loadData)

  function createData () {
    let person=$('#person').val()
    let phone=$('#phone').val()
    let data=JSON.stringify({person,phone})
    $('#person').val('')
    $('#phone').val('')
    $.ajax({
      method: 'POST',
      url: url+'.json',
      data:data
    }).then(loadData)
  }

  $('#btnCreate').click(createData)
}

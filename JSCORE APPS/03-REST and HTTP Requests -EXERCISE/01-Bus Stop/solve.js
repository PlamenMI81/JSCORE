function getInfo() {
  $('#buses').empty()
  $('#stopName').text('')
  let stopId=$('#stopId').val()
  const URL=`https://judgetests.firebaseio.com/businfo/${stopId}.json`

  $.ajax({
    method: 'GET',
    url: URL
  }).then(handleSuccess)
    .catch(handleError)

  function handleSuccess (res) {
    $('#stopName').text(res.name)

    for (let bus in res.buses) {
      let li=$('<li>').text(`Bus ${bus} arrives in ${res.buses[bus]} minutes`)
      li.appendTo($('#buses'))
    }
  }
  function handleError (err) {
    $('#stopName').text('Error')

  }
}
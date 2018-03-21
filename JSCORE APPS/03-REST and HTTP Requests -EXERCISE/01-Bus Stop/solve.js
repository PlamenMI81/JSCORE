function getInfo() {
  $('#buses').empty().hide()
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
      $('<li>').text(`Bus ${bus} arrives in ${res.buses[bus]} minutes`).appendTo($('#buses'))
    }
    $('#buses').show( "slide", {direction: "left" }, 2000 )
  }
  function handleError (err) {
    $('#stopName').text('Error')

  }
}
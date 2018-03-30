$(function () {
  const URL = 'https://baas.kinvey.com/appdata/kid_BJXTsSi-e/knock'
  const USER = 'guest'
  const PASS = 'guest'
  const AUTH = {'Authorization': 'Basic ' + btoa(USER + ':' + PASS)}
  let message = 'Knock Knock.'
  let answers = $('#answers')
  answers.append($('<li>').text(message))

  function startKnocking () {
    $('#knock').off('click')
    answers.css('display','block')
    function nextKnock (res) {
      message = res.message
      answers.append($('<li>').text(res.answer))
      if (!message){
       $('<hr>').appendTo(answers)
        $('hr').show(2000)
        return
      }
      answers.append($('<li>').text(message))

      startKnocking()
    }

    $.ajax({
      type: 'GET',
      url: URL + '?query=' + message,
      headers: AUTH
    }).then(nextKnock)
  }

  $('#knock').on('click',startKnocking)
})

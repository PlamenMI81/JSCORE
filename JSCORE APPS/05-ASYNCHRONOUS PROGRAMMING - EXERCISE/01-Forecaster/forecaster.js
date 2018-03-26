function attachEvents () {
  const url = 'https://judgetests.firebaseio.com'
  $('#submit').click(getWeather)

  function getWeather () {


    let location = $('#location').val()
    let weatherCondition = {
      'Sunny': '&#x2600',        // ☀
      'Partly sunny': '&#x26C5', // ⛅
      'Overcast': '&#x2601',     // ☁
      'Rain': '&#x2614',         // ☂
      'Degrees': '&#176'         // °
    }
    let degreeSymbol = weatherCondition['Degrees']
    $.ajax({
      url: url + '/locations.json',
      success: getCode
    })

    function getCode (res) {
      let code = res.filter(e => e.name === location)[0]
      if (code!==undefined) {
        todayForecast(code.code)
        threeDaysForecast(code.code)
      } else {
        alert('Възликна грешка, проверете правилно ли е въведена локацията!')
      }
    }

    function todayForecast (code) {
      $.ajax({
        url: url + `/forecast/today/${code}.json `,
        success: putInDomCurrent,
      })

    }

    function threeDaysForecast (code) {
      $.ajax({
        url: url + `/forecast/upcoming/${code}.json `,
        success: putInDomThreeDays,
      })

    }

    function putInDomCurrent (res) {
      $('#current').find('span').detach()

      let current = $('#current')
      let condPict = weatherCondition[res.forecast.condition]
      let condSymbol = $(`<span class="condition symbol"></span>`).html(condPict)
      let condition = $('<span class="condition"></span>')
        .append($(`<span class="forecast-data">${res.name}</span>`))
        .append($(`<span class="forecast-data">${res.forecast.low}${degreeSymbol}/${res.forecast.high}${degreeSymbol}</span>`))
        .append($(`<span class="forecast-data">${res.forecast.condition}</span>`))
      condSymbol.appendTo(current)
      condition.appendTo(current)
    }

    function putInDomThreeDays (res) {
      $('#upcoming').find('span').detach()
      let upcoming = $('#upcoming')
      for (let day in res.forecast) {
        oneDay(res.forecast[day])
      }
      $('#forecast').show()

      function oneDay (day) {
        let condPict = weatherCondition[day.condition]
        $('<span class="upcoming">')
          .append($('<span class="symbol">').html(condPict))
          .append($(`<span class="forecast-data">${day.low}${degreeSymbol}/${day.high}${degreeSymbol}</span>`))
          .append($(`<span class="forecast-data">${day.condition}</span>`))
          .appendTo(upcoming)
      }
    }
  }
}
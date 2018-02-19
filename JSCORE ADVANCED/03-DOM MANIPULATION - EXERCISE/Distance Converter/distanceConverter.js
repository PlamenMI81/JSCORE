function attachEventsListeners () {
  $('#convert').on('click', convert)
  let metricsObj = {
    'km': 1000,
    'm': 1,
    'cm': 0.01,
    'mm': 0.001,
    'mi': 1609.34,
    'yrd': 0.9144,
    'ft': 0.3048,
    'in': 0.0254
  }

  function convert () {
    let inputVal = $('#inputDistance').val()
    let inputMetric = $('#inputUnits').val()
    let outputMetric = $('#outputUnits').val()
    let toMeters = Number(inputVal) * metricsObj[inputMetric]
    let toOutputMetric = toMeters / metricsObj[outputMetric]
    $('#outputDistance').val(toOutputMetric)
  }

}
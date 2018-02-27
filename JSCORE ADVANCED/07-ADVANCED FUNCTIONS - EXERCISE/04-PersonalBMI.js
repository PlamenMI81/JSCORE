function solve () {
  let name = arguments[0]
  let age = arguments[1]
  let weightKg = Math.round(arguments[2])
  let heightSm = Math.round(arguments[3])
  let bmi = Math.round(weightKg /Math.pow(heightSm / 100,2))

  function getStatus (bmi) {
    if (bmi < 18.5) {
      return 'underweight'
    } else if (bmi < 25) {
      return 'normal'
    } else if (bmi < 30) {
      return 'overweight'
    }
    return 'obese'

  }

  let patientObj = {
    name: name,
    personalInfo: {
      age: age,
      weight: weightKg,
      height: heightSm
    },
    BMI: bmi,
    status: getStatus(bmi)
  }

  if (patientObj.status === 'obese') {
    patientObj.recommendation = 'admission required'
  }
  return patientObj
}

console.log(solve('Peter', 29, 75, 182))
console.log(solve('Honey Boo Boo', 9, 57, 137))
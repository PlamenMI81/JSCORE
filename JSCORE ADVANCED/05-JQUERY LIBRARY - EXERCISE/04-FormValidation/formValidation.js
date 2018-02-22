function validate () {
  $('input#company').on('change', function () {
    if ($(this).is(':checked')) {
      $('#companyInfo').css('display','block')
    } else {
      $('#companyInfo').css('display', 'none')
    }
  })

  function validateStr (string, regex) {
    let isValid = regex.test(string.val())
    if (!isValid) {
      string.css('border-color','red')
    } else {
      string.css('border','')
    }
    return isValid
  }

  function matchPasswords (password, confirmPass, validPass, validConfirmPass) {
    if (validPass && validConfirmPass && password.val() === confirmPass.val()) {
      $('input[id*=\'password\']').css('border','')
    } else {
      $('input[id*=\'password\']').css('border-color', 'red')
    }
  }

  $('button#submit').on('click', function (e) {
    e.preventDefault()

    let userName = $('input#username')
    let userRx = /^[a-zA-Z0-9]{3,20}$/
    let validUser = validateStr(userName, userRx)

    let email = $('input#email')
    let emailRx = /^(.+)@.*\..*$/
    let validMail = validateStr(email, emailRx)

    let password = $('input#password')
    let passRx = /^(\w){5,15}$/
    let validPass = validateStr(password, passRx)

    let confirmPass = $('input#confirm-password')
    let confirmRx = /^(\w){5,15}$/
    let validConfirmPass = validateStr(confirmPass, confirmRx)

    matchPasswords(password, confirmPass, validPass, validConfirmPass)

    let companyNum = $('input#companyNumber')
    let companyRx = /^(\d){4}$/
    let validCompany = validateStr(companyNum, companyRx)

    if ($('input#company').is(':checked')) {
      if (validUser && validMail && validPass && validConfirmPass && validCompany && (password.val() === confirmPass.val()) && validPass && validConfirmPass) {
        $('#valid').css('display', 'block')
      } else {
        $('#valid').css('display', 'none')
      }
    } else {
      if (validUser && validMail && validPass && validConfirmPass && (password.val() === confirmPass.val()) && validPass && validConfirmPass) {
        $('#valid').css('display', 'block')
      } else {
        $('#valid').css('display', 'none')
      }
    }
  })
}

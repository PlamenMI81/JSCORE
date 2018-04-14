function attachNotifEvents () {
  //bind info boxes
  $('#infoBox, #errorBox').on('click', function () {
    $(this).fadeOut()
  })
  //Attach AJAX loading event listener
  $(document).on({
    ajaxStart: function () {
      $('#loadingBox').show()
    },
    ajaxStop: function () {
      $('#loadingBox').hide()
    }
  })
}

function attachRegBtnEv () {
  $('#btnRegister').click(function () {
    registerUser(event)
  })
}

function attachLoginBtnEv () {
  $('#btnLogin').click(function () {
    loginUser(event)
  })
}
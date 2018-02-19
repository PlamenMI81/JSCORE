function attachEvents () {
  $('a.button').on('click',(event)=>{
    $('a.button').removeClass('selected')
    $(event.target).addClass('selected')
  })
}
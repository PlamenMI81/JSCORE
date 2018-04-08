function attachEvents () {
  $('#btnLoadTowns').click(getTowns)
}

function getTowns () {
  let towns=$('#towns').val().split(/,[ ]*/)
  let townsObj={towns:towns}

  $.get('./templates/townLi.hbs').then((res)=>{
    render(res,townsObj)
  })

  function render (res,context) {
    let template = Handlebars.compile(res)
    let html = template(context)
    $('#root').empty()
    $('#root').append(html)
  }


}
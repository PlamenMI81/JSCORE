function attachEvents () {
  const URL='https://baas.kinvey.com/appdata/kid_HkeeMM15M/biggestCatches'
  const AUTH={"Authorization": "Basic "+btoa('user:user')}

  function collectInfo (selector) {
    let angler=$(selector).find('input.angler').val()
    let weight=Number($(selector).find('input.weight').val())
    let species=$(selector).find('input.species').val()
    let location=$(selector).find('input.location').val()
    let bait=$(selector).find('input.bait').val()
    let captureTime=Number($(selector).find('input.captureTime').val())
    return JSON.stringify({
      angler,weight,species,location,bait,captureTime
    })

  }

  function createNewCatch () {
    let body=collectInfo('#addForm')
    $.ajax({
      method:'POST',
      url:URL,
      contentType:'application/json',
      headers:AUTH,
      data:body,
      success:()=>alert('Created new catch'),
      error:(e)=>alert(e)
    })
  }

  function listAllCatches () {

    function listCatch (res) {
      $('#catches').empty()
      for (let c in res) {
        let divCatch=$('<div class="catch">').attr('data-id',`${res[c]._id}`)
          .append($('<label>Angler</label>'))
          .append($(`<input type="text" class="angler" value="${res[c].angler}"/>`))
          .append($('<label>Weight</label>'))
          .append($(`<input type="number" class="weight" value="${res[c].weight}"/>`))
          .append($('<label>Species</label>'))
          .append($(`<input type="text" class="species" value="${res[c].species}"/>`))
          .append($('<label>Location</label>'))
          .append($(`<input type="text" class="location" value="${res[c].location}"/>`))
          .append($('<label>Bait</label>'))
          .append($(`<input type="text" class="bait" value="${res[c].bait}"/>`))
          .append($('<label>Capture Time</label>'))
          .append($(`<input type="number" class="captureTime" value="${res[c].captureTime}"/>`))
          .append($('<button class="update">').text('Update').on('click',function () {
            let selector=$(this).parent()
            let body=collectInfo(selector)
            $.ajax({
              method:'PUT',
              url:URL+'/'+res[c]._id,
              contentType:'application/json',
              headers:AUTH,
              data:body,
              success:listAllCatches,
              error:(e)=>alert(e)
            })
          }))
          .append($('<button class="delete">').text('Delete').on('click',function () {
            $.ajax({
              method:'DELETE',
              url:URL+'/'+res[c]._id,
              headers:AUTH,
              success:() =>{
                $(this).parent().remove()
              },
              error:(e)=>alert(e)
            })
          }))

        divCatch.appendTo($('#catches'))
      }
    }
    $.ajax({
      method:'GET',
      url:URL,
      headers:AUTH,
      success:listCatch,
      error:(e)=>alert(e)
    })

  }
  $('#addForm').find('button.add').click(createNewCatch)
  $('#aside').find('button.load').click(listAllCatches)
}
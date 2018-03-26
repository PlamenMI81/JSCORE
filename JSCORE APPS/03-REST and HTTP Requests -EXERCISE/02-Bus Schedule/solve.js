function solve() {
  let currentId='depot'
  let currentName=''
  let btnDepart=$('#depart')
  let btnArrive=$('#arrive')
  let info=$('#info').find('span')

  function depart () {
    function handleSuccess (res) {
      btnDepart.attr('disabled','disabled')
      btnArrive.removeAttr('disabled')
      currentId=res.next
      currentName=res.name
      info.text(`Next stop ${res.name}`)
    }
    const url='https://judgetests.firebaseio.com/schedule/'
    $.ajax({
      method: 'GET',
      url: url+currentId+'.json'
    }).then(handleSuccess)
  }
  function arrive () {
    btnDepart.removeAttr('disabled')
    btnArrive.attr('disabled','disabled')
    info.text(`Arriving at ${currentName}`)
  }
  return {
    depart,
    arrive
  };
}
function loadCommits() {
  let username=$('#username').val()
  let repo=$('#repo').val()
  let url=`https://api.github.com/repos/${username}/${repo}/commits`

  function makeList (res) {
    $('#commits').empty()
    for (let k in res) {
      let li=$('<li>').text(`${res[k].commit.author.name}: ${res[k].commit.message}`)
      $('#commits').append(li)
    }

  }

  function printError (err) {
    $('#commits').empty()
    let li=$('<li>').text(`Error: ${err.status} (${err.statusText})`)
    $('#commits').append(li)
  }

  $.ajax({
    url:url
  }).then(makeList)
    .catch(printError)
}
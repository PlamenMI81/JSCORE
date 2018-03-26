function attachEvents () {
  let url='https://baas.kinvey.com/appdata/kid_HkeeMM15M/'
  let postBody={}
  function loadPost () {
    function getTitle (res) {
      $('#posts').empty()
      for (let k of res) {
        $('<option>').text(k.title).attr('value',k._id).appendTo($('#posts'))
        postBody[k._id]=k.body
      }
    }

    $.ajax({
      type: 'GET',
      url: url+'posts',
      headers: {
        "Authorization": "Basic "+btoa('user:user')
      }
    }).then(getTitle)
  }

  function postDetails () {
    let postId=$('#posts').val()

    function getComments (res) {
      let postComments=$('#post-comments')
      postComments.empty()
      for (let p of res) {
        $('<li>').text(p.text).appendTo(postComments)
      }
      $('#post-body').text(postBody[postId])
      $('#post-title').text($('#posts').find('option:selected').text())

    }

    $.ajax({
      type: 'GET',
      url: url+`comments/?query={"post_id":"${postId}"}`,
      headers: {
        "Authorization": "Basic "+btoa('user:user')
      }
    }).then(getComments)
  }

  $('#btnLoadPosts').click(loadPost)

  $('#btnViewPost').click(postDetails)
}
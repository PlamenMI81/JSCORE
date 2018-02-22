function domSearch (selector, isCaseSensitive) {
  let fragment = document.createDocumentFragment()
  $(fragment)
    .append($('<div>').addClass('add-controls')
      .append($('<label>').text('Enter text: '))
      .append($('<input>'))
      .append($('<a>Add</a>').css('display', 'inline-block').addClass('button'))
    )
    .append($('<div>').addClass('search-controls')
      .append($('<label>').text('Search: '))
      .append($('<input>'))
    )
    .append($('<div>').addClass('result-controls')
      .append($('<ul>').addClass('items-list'))
    )

  $(selector).append(fragment)

  let addBtn = $('.button')
  addBtn.click(addItemToList)

  let search = $('.search-controls input')
  search.on('input', searchStr)

  function searchStr () {
    let $li = $('li')
    $li.css('display', 'none')
    let searchedText = $('.search-controls input').val()
    $li.each((i, li) => {
      let currentLiText = li.children[1].textContent
      if (!isCaseSensitive) {
        searchedText = searchedText.toLowerCase()
        currentLiText = currentLiText.toLowerCase()
      }
      if (currentLiText.includes(searchedText)) {
        $(li).css('display', 'block')
      }
    })
  }

  function removeLi () {
    $(this).parent().remove()
  }

  function addItemToList () {
    let text = $('.add-controls input').val()
    let li = $('<li>').addClass('list-item')
      .append($('<a>').addClass('button').text('X').click(removeLi))
      .append($('<strong>').text(text))
    li.appendTo($('.items-list'))
  }
}
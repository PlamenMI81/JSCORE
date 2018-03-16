function listBuilder (selector) {
  return {
    createNewList: function () {
      let ul = $('<ul>')
      $(selector).empty()
      $(selector).append(ul)
    },
    addItem: function (item) {
      $('<li>')
        .text(item)
        .append($('<button>').text('Up').click(function () {
          $(this.parentElement).insertBefore($(this.parentElement).prev())
        }))
        .append($('<button>').text('Down').click(function () {
          $(this.parentElement).insertAfter($(this.parentElement).next())
        }))
        .appendTo($('ul'))

    }
  }

}

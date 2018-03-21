function tableBuilder (selector) {
  return {
    createTable (columnNames) {
      $(selector).empty()
      let table = $('<table>')
      let r=$('<tr>').appendTo(table)
      for (let name of columnNames) {
        $('<th>').text(name).appendTo(r)
      }
      $('<th>Action</th>').appendTo(r)
      $(selector).append(table)
    },

    fillData (dataRows) {
      let table = $('table')
      for (let row of dataRows) {
        let r=$('<tr>').appendTo(table)
        for (let data of row) {

          $('<td>').text(data).appendTo(r)
        }
        $('<td>')
          .append($('<button>Delete</button>').click(function () {
            $(this.parentElement.parentElement).remove()
          })).appendTo(r)
      }
    }
  }
}
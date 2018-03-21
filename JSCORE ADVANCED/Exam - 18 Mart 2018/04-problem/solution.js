class PaymentManager {
  constructor (title) {
    this.title = title
    this.table = this.createTable()
  }

  render (id) {

    $(`#${id}`).append(this.table)
    $(this.table).find('caption').text(`${this.title} Payment Manager`)
    $(this.table).find('tfoot').find('button')
      .click(this._add.bind(this))
  }
  _add(){

      let name = $(this.table).find('input[name=\'name\']').val()
      let cat = $(this.table).find('input[name=\'category\']').val()
      let price = $(this.table).find('input[name=\'price\']').val()
      if ($(this.table).find('.payments').find('td').eq(0).text() === ''
        && $(this.table).find('.payments').find('td').eq(1).text() === ''
        && $(this.table).find('.payments').find('td').eq(2).text() === '') {
        $(this.table).find('.payments').empty()
      }
      $('<tr>')
        .append($('<td>').text(name))
        .append($('<td>').text(cat))
        .append($('<td>').text(price))
        .append($('<td>')
          .append($('<button>').text('Delete')
            .click((ev)=>{
              $(ev.target).parent().parent().remove()
            })))
        .appendTo($(this.table).find('.payments'))

  }


  createTable () {
    let table = $('<table>')
      .html('<caption></caption>\n' +
        '      <thead>\n' +
        '           <tr>\n' +
        '               <th class="name">Name</th>\n' +
        '               <th class="category">Category</th>\n' +
        '               <th class="price">Price</th>\n' +
        '               <th>Actions</th>\n' +
        '           </tr>\n' +
        '      </thead>\n' +
        '       <tbody class="payments">\n' +
        '           <tr>\n' +
        '               <td><!-- Payment\\\\\\\'s name --></td>\n' +
        '               <td><!-- Payment\\\\\\\'s category --></td>\n' +
        '               <td><!-- Payment\\\\\\\'s price --></td>\n' +
        '               <td><button>Delete</button></td>\n' +
        '           </tr>\n' +
        '       </tbody>\n' +
        '       <tfoot class="input-data">\n' +
        '           <tr>\n' +
        '               <td><input name="name" type="text"></td>\n' +
        '               <td><input name="category" type="text"></td>\n' +
        '               <td><input name="price" type="number"></td>\n' +
        '               <td><button>Add</button></td></tr>\n' +
        '       </tfoot>')
    return table
  }
}


class TitleBar {
  constructor (title) {
    this.title = title
    this.links = []
  }

  addLink (href, name) {
    let a = `<a class="menu-link" href="${href}">${name}</a>`
    this.links.push(a)
  }

  appendTo (selector) {
    $(selector).html('<header class="header">\n' +
      '  <div class="header-row">\n' +
      '    <a class="button">&#9776;</a>\n' +
      `    <span class="title">${this.title}</span>\n` +
      '  </div>\n' +
      '  <div class="drawer">\n' +
      '    <nav class="menu">\n' +
      '    </nav>\n' +
      '  </div>\n' +
      '</header>\n' +
      '<div id="content">' +
      '<article class="post"><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p><p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?</p></article>' +
      '</div>')
    this.links.forEach(l => $('.drawer').append(l))
    $('.button').click(function () {
      $('.drawer').toggle()
    })
  }
}
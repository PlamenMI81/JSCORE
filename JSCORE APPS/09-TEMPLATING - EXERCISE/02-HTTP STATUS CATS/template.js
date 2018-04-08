$(() => {
  renderCatTemplate()

  function renderCatTemplate () {
    $.get('./templates/cat.hbs').then((res) => {
      render(res)
      attachEv()
    })

    function attachEv () {
      $('button').click(toggleData)

      function toggleData () {
        if (this.textContent.includes('Show')) {
          this.textContent=this.textContent.replace('Show','Hide')
        } else {
          this.textContent=this.textContent.replace('Hide','Show')
        }
        $(this).next().toggle()
        
      }
    }

    function render (res) {
      let template = Handlebars.compile(res)
      let cats = window.cats
      let html = template({cats})
      $('#allCats').append(html)
    }
  }

})

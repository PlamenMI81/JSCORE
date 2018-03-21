function cardDeckBuilder (selector) {
  let suits = {
    C: '\u2663',
    D: '\u2666',
    H: '\u2665',
    S: '\u2660'
  }
  let cardsText=[]
  return {
    addCard: function (face, suit) {
      $(`<div class="card">${face}${suits[suit]}</div>`)
        .click(function () {
          cardsText.reverse()
          $('.card').toArray().forEach(function (e,i) {
            e.textContent=cardsText[i]
          })

        })
        .appendTo(selector)
      cardsText.push(`${face}${suits[suit]}`)
    }
  }
}

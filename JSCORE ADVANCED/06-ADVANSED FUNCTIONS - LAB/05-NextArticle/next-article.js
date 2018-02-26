function getArticleGenerator (articles) {

  return function () {
    if (articles.length>0) {
      let article = $('<article>')
      $('<p>').text(articles.shift()).appendTo(article)
      article.appendTo($('#content'))
    }
  }
}





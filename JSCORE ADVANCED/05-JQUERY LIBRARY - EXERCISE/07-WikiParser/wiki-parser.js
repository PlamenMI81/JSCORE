function wikiParser(selector) {
  let inputText=$(selector).text()
  let replaced=inputText
    .replace(/'''(.*?)'''/g, (match,p)=>`<b>${p}</b>`)
    .replace(/''(.*?)''/g, (match,p)=>`<i>${p}</i>`)
    .replace(/===(.*?)===/g, (match,p)=>`<h3>${p}</h3>`)
    .replace(/==(.*?)==/g, (match,p)=>`<h2>${p}</h2>`)
    .replace(/=(.*?)=/g, (match,p)=>`<h1>${p}</h1>`)
    .replace(/\[\[([^'=\[\]]+?)\|([^'=\[\]]+?)]]/g, (m, p1, p2) => `<a href="/wiki/${p1}">${p2}</a>`)
    .replace(/\[\[([^'=\[\]]+?)]]/g, (m, p) => `<a href="/wiki/${p}">${p}</a>`);


$(selector).html(replaced)
}

let teamController=(()=>{
  function getCatalog(ctx) {
    ctx.loggedIn=auth.isAuthenticated()
    ctx.username=auth.getusername()
    ctx.teams=teamsService.loadTeams()
    ctx.loadPartials({
      header: './templates/common/header.hbs',
      footer: './templates/common/footer.hbs',
      team:'./templates/catalog/team.hbs',
    }).then(function () {
      this.partial('./templates/catalog/teamCatalog.hbs')
    })
  }
  return{
    getCatalog,
  }
})()
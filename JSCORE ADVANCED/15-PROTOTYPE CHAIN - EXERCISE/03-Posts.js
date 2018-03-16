function solve () {
  class Post{
    constructor (title,content){
      this.title=title
      this.content=content
    }
    toString(){
      return `Post: ${this.title}`+'\n'+`Content: ${this.content}`
    }
  }
  class SocialMediaPost extends Post{
    constructor (title,content,likes,dislikes){
      super(title,content)
      this.likes=likes
      this.dislikes=dislikes
      this.comments=[]
    }
    addComment(comment){
      this.comments.push(' * '+comment)
    }
    toString(){
      let comm=''
      if (this.comments.length !== 0) {
        comm='\nComments:\n'
        comm+=this.comments.join('\n')
      }
      return super.toString()+'\n'+`Rating: ${this.likes-this.dislikes}`+comm
    }
  }
  class BlogPost extends Post{
    constructor (title,content,views){
      super(title,content)
      this.views=Number(views)
    }
    view(){
      this.views++
      return this
    }
    toString(){
      return super.toString()+'\n'+`Views: ${this.views}`
    }

  }
  return{Post,SocialMediaPost,BlogPost}
}

let classes=solve()
let p=new classes.SocialMediaPost('първи пост', 'някакво съдържание',25,1)
p.addComment('някакъв коментар')
p.addComment('втори коментар')
console.log(p.toString())
let bp=new classes.BlogPost('първи пост', 'някакво съдържание',25)
bp.view()
console.log(bp.toString())
function solve (arr,sortCriteria) {
  class Ticket{
    constructor (destination,price,status){
      this.destination=destination
      this.price=Number(price)
      this.status=status
    }
  }
  let result=[]
  for (let el of arr) {
    [destination,price,status]=el.split('|')
    let ticket=new Ticket(destination,price,status)
    result.push(ticket)
  }

  result.sort((a,b)=>{
    if (a[sortCriteria] < b[sortCriteria])
      return -1;
    if (a[sortCriteria] > b[sortCriteria])
      return 1;
    return 0;
  });
  return result

  
}

solve(
  ['Philadelphia|94.20|available',
    'New York City|95.99|available',
    'New York City|95.99|sold',
    'Boston|126.20|departed'],
  'price'
)
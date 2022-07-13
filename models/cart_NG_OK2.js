// Cart {
//     items:
//      { '62b56414cc86d561d7f701f5': { item: [Object], qty: 1, price: 11 }, 
//        '62b56414cc86d561d7f701f6': { item: [Object], qty: 1, price: 50 } },
//     totalQty: 2,
//     totalPrice: 61,
//     add: [Function],
//     generateArray: [Function] }

module.exports=function CartMy(prevCart){
//first creating an object
if (Object.keys(prevCart).length === 0){


this.items=[]
}
else
{
    this.items=prevCart.items
}
console.log('prev:')
console.log(prevCart)
console.log('**********')

///if (Object.keys(prevCart).length === 0)
// this.items={};
// this.totalQty = 0;
// this.totalPrice =  0;

console.log(this)
console.log('**********')

this.ADD = function (product){
        if (Object.keys(this.items).length === 0)
        {
        this.items=[]
        }

        if (this.items.find(x=> x.id===product.id))
        {console.log('found!!!')
            index=this.items.findIndex(x => x.id === product.id);
            this.items[index].price+=product.price
            this.items[index].qty+=1
        }
        else
        {
            this.items.push({'id':product.id,'price':product.price,'qty':1})
        }
        



//    {
//    var prevItem=this.items[product.id]
  //  }
//msg.token_found=tokens.find(x => x.token===msg.req.headers.access_token)
//var arr=[]
//arr=this.items
//if(arr.find(x=> x.id===product.id))
  //      if (!prevItem)
//first time

    //  this.ALL.items.push(
    //          {'item':product,
    //          'qty':1,
    //          'price':product.price})
        
        
        // else
        // {console.log('else.....************')

        // }   
    }
        
        
       // this.items.id[product.id]=this.product.title
    }

  

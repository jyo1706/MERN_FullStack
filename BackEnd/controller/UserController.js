
const productModel = require('../model/product')
const AddToCardModel = require('../model/addToCard')
const addressModel = require('../model/address')
const orderModel = require('../model/orderProduct')
require('dotenv').config();
const razorpay = require('razorpay')

const razorpay2 = new razorpay(
   {
      key_id : process.env.RAZORPAY_KEY_ID,
      key_secret : process.env.RAZORPAY_KEY_SECRET,
 
   }
)
class UserController{
  static addToCard = async(req,res)=>
  {
         try 
         {
            const userData =req.data
            const productData = await productModel.findById(req.params.id)       // copy product form productModel
                  
            const {name,price,quantity,original_price,image,_id} = productData
                                         
            const finditem = await AddToCardModel.findOne({
               product_id:req.params.id,
               admin_id:userData.id
            })      
             //  Insert data into addtocard database
              if(!finditem)
              {
               
               const addToCard = new AddToCardModel(               //Paste product in addToCardModel
                  { 
                   
                     admin_id:userData.id,
                     product_id:_id,
                    
                     name:name,
                     price:price,
                     original_price:original_price,
                     image:
                     {
                      public_id:image.public_id,
                      url:image.url
                     }
                  })
                await  addToCard.save()
                res.json({userData:userData, message:"Data add successfully"}) 
              }
             else
             {
               res.json({userData:userData, message:"Product Already add to cart"})
             }
              
            //   const allitems = await AddToCardModel.find({admin_id:userData.id})  
              
              
         } 
         catch (error) 
         {
            console.log(error)
         }
  }
  static getProduct = async(req,res)=>
  {
     try 
     {
         const userData =req.data
         const allitems = await AddToCardModel.find({admin_id:userData.id})  
         res.json({data:allitems, message:"Data add successfully"}) 
     } 
     catch (error) 
     {
      console.log(error)
     }
  }
  static buyNow = async(req,res)=>
  {
   try 
   {
      const user  = req.data
      const find = await productModel.findById(req.params.id)
   
         res.json({data:find,user:user}) 
   }
   catch (error)
   {
     console.log(error)   
   }
  }
  static deleteProduct =async (req,res)=> {
   try 
   {
      const del = await AddToCardModel.findByIdAndDelete(req.params.id)
      res.json({message:'Data Delete Successfully'})
   } 
   catch (error) 
   {
      console.log(error)
   }
  }
  static address = async(req,res)=>
  {
   try 
   {
      const data = req.data;

      const {name,pincode,mobile,area,house_no,state} = req.body
      const address = new addressModel({
         admin_id:data.id,
         name:name,
         address:{
            house_no:house_no,
            area:area,
            pincode:pincode,
            state:state
         },
         mobile:mobile
      })
      await address.save()
      res.json({status:"Address Add successfully",address:address})
   }
    catch (error) {
      console.log(error)   
   }
  }
  static findAddress = async(req,res)=>
  {
   try 
   {
     
          const data = req.data
          const data2 = await addressModel.find({admin_id:data.id})
          res.json({data:data2})
   } 
   catch (error) {
      console.log(error)
   }
  }
  static findOneAddress = async(req,res)=>
  {
      try 
      {
        
             const data = req.data
             const data2 = await addressModel.findOne({admin_id:data.id,_id:req.params.id})
             res.json({data:data2})
      } 
      catch (error) {
         console.log(error)
      }
  }
  static editAddress = async(req,res)=>
  {
      try 
      {
         const user = req.data
         const find  =  await addressModel.findOne({admin_id:user.id , _id:req.params.id})
         res.json({data:find})
      }
      catch (error) 
      {
       console.log(error)   
      }
  }
  static updateAddress= async(req,res)=>
  {
     
   try
   {
      const user = req.data
      const {name,pincode,mobile,area,house_no,state} = req.body
      const address = await addressModel.findByIdAndUpdate(req.params.id,{
         admin_id:user.id,
         name:name,
         address:{
            house_no:house_no,
            area:area,
            pincode:pincode,
            state:state
         },
         mobile:mobile
      })
      await address.save()
      res.json({message:"Address Update successfully",address:address})  
   } 
   catch (error) 
   {
     console.log(error)  
   }
  }
  static updateQuantity = async(req,res)=>
  {
    try 
    {
      console.log("hello")
           const user = req.data
           const productQuantity = Object.values(req.body).map((item)=>{return item})           
           Object.keys(req.body).map(async(item,index)=>{
           const orderProduct = await  AddToCardModel.findByIdAndUpdate({_id:item,admin_id:user._id},{
              quantity:productQuantity[index]       //update order product quantity
           }); 
         })
    } 
    catch (error) 
    {
      console.log(error)
    }
  }
  static placeOrder = async(req,res)=>
  {
    try 
    {
               const payment = Object.values(req.body)
               console.log(Object.values(req.body))
               if(req.body==='')
               {
                  res.json({message:'plz select payment method'})
               }
               else
               {
                  const data = req.data
                  const orderProduct = await  AddToCardModel.find({admin_id:data._id}); 
                  const buyNow = await productModel.findById(payment[1])
                  const selectAddress = await addressModel.find({_id:req.params.id})
                  
                
                
                if(payment[1])
                {
                  // if(payment[0]='Online Payment')
                  // {
                  //    const order = await razorpay2.orders.create({
                  //       price:buyNow.price*100,
                  //       currency:'INR',
               
                  //    }) 
                  //    res.json({order_id:order})
                  // }
                
                  //direct Buy Product 
                     const buyNowProducts = {
                        _id:buyNow.id,
                         name:buyNow.name,
                         quantity:payment[2][0]||1,
                         price:buyNow.price,
                         image:
                         {
                          public_id:buyNow.image.public_id,
                          url:buyNow.image.url
                        }}
                        const insertProduct = new orderModel(
                           {
                              admin_id:data._id,
                              productName : buyNowProducts,
                              address:selectAddress[0].address,
                              
                              paymentType:payment[0],
                           }
                          
                         )
                         if(buyNow)
                           {
                             const price = Math.ceil(buyNow.price-(buyNow.price*buyNow.original_price/100))
                             res.json({message:'order successfully',price:price})
                           }
                           
                          await insertProduct.save()
                       

                  }
              
               else
                {
                  //Buy product of addtocard
                  const orderProducts =   orderProduct.map((item)=>
                     {
                          const order = {
                             _id:item.id,
                             name:item.name,
                             quantity:item.quantity,
                             price:item.price,
                             image: 
                             {
                              public_id:item.image.public_id,
                              url:item.image.url
                             }
                          }
                          return order
                       })
                  console.log(orderproducts)
       
                  const insertProduct = new orderModel(
                     {
                        admin_id:data._id,
                        productName : orderProducts,
                        address:selectAddress[0].address,
                        paymentType:JSON.stringify(Object.keys(req.body)),
                     }
                   )
                    await insertProduct.save()
                   if(orderProduct)
                     {
                       let total = 0;
                       // Method for Total all Product in AddToCard
                          orderProduct.map((item,index)=>
                          {
                             total = total +  Math.ceil(item.price-(item.price*item.original_price/100))
                              
                          })
                         res.json({message:'order successfully',price:total})
                     }
                  
                   
                    
                }
         }
    } 
    catch (error) 
    {
      console.log(error)  
    }
  }
  static deleteProductFormAddToCard =  async(req,res)=>
  {
   try 
   {

      const data = req.data
      const id = data.id
      const a =  await AddToCardModel.deleteMany({admin_id:id})

   } 
   catch (error)
   {
      console.log(error)   
   }
  }
  static findOrder = async(req,res)=>
  {
   try 
   {
       const data = req.data
       const findOrder = await orderModel.find({admin_id:data.id})
       res.json({data:findOrder})
   } catch (error)
   {
       console.log(error)   
   }
  }
  static cancelOrder = async(req,res)=>
  {
   try 
   {
      
      const productID = Object.keys(req.body)             
      const productIdAccess = productID[0]
  
      const findProduct = await orderModel.findOne({_id:req.params.id})
      if(findProduct.productName.length==1)
      {
         await orderModel.findByIdAndDelete(req.params.id)
      }
    else
    {
      for(const item of findProduct.productName)
         {
            if(item._id.toString()===productIdAccess)
           {
            await orderModel.findByIdAndUpdate(
               req.params.id,
               { $pull: { productName: { _id: item._id } } },
               { new: true }
             );
             break;  // Exit the loop once the item is found and deleted
            }
         }
    }
      res.json({message:'order cancel successfully'})
     
   } catch (error) {
      console.log(error)
   }
  }
  static onlinePay = async(req,res)=>
  {
   try 
   {
      const price = req.body.price
      const order = await razorpay2.orders.create({
         price:price*100,
         currency:'INR',

      }) 
   res.json({status:'Payment done','orderId':order.id})
   } 
   catch (error)
   {
      res.json({status:'payment Failed',error})
   }
  }
}
module.exports =  UserController 


const productModel = require("../model/product")
const RegistrationModel = require("../model/registration")
const   cloudinary  =  require('cloudinary').v2;
 // Configuration
 cloudinary.config({ 
    cloud_name: 'deqjjzjbh', 
    api_key: '618227314277568', 
    api_secret: 'UUvM_uxm9lm5RiaXw_5zgwwlIQs',
    
  });

class ProductController{
     static ProductDataInsert = async(req,res)=>
     {
        try 
        {
            const userData = req.data
            const file = req.files.image
            // console.log(req.files.image)
            const {name,price,quantity,original_price,des,deliveryCharge} = req.body
            
            const imageUpload = await cloudinary.uploader.upload(file.tempFilePath,{
                folder:'mvc'
            })
            const productData = new productModel(
                {
                   name:name.charAt(0).toUpperCase()+name.slice(1),
                   des:des,
                   price:price,
                   quantity:quantity,
                   original_price:original_price,
                   deliveryCharge:deliveryCharge,
                   image:
                   {
                    public_id:imageUpload.public_id,
                    url:imageUpload.secure_url
                   }
                }
              
            )
            res.json({userData,message:"Data add successfully"})
            productData.save()
        } catch (error) 
        {
            console.log(error)
        }
     }
     static displayData = async(req,res)=>
     {
        try 
        {
            const userData=req.data
            const data =  await productModel.find()
          
            res.json({data:data,userData:userData})
        }
        catch (error) 
        {
           console.log(error)    
        }
     }
     static home = async(req,res)=>
        {
           try 
           {
               const userData=req.data
               const data =  await productModel.find()
             
               res.json({data:data,userData:userData})
           }
           catch (error) 
           {
              console.log(error)    
           }
        }
     static view = async(req,res)=>
     {
        try 
        {
            const userData = req.data
            // console.log("hello")
            // console.log(req.params.id)
            const id =req.params.id
           const data = await productModel.findById(id) 
           res.json({data:data,userData:userData})
        } 
        catch (error) {
            console.log(error)
        }
     }
     static delete = async(req,res)=>
     {
        try 
        {
            //  console.log(req.params.id)
            const id = req.params.id
            const data = await  productModel.findByIdAndDelete(id)
            res.json({message:'Data Delete Successfully'})
            
        } 
        catch (error) 
        {
            console.log(error)
        }
     }
     static edit = async(req,res)=>
     {
        // console.log("hello")
        const data =  await productModel.findById(req.params.id)
      //   console.log(data)
        res.json({data})
     }
     static update = async(req,res)=>
     {
        try 
        {
        const {name,price,quantity,original_price,des,deliveryCharge} = req.body
         const userData = req.data
         if(req.files)
         {
            const update =await productModel.findById(req.params.id);
            const image_id=update.image.public_id;
           
            await cloudinary.uploader.destroy(image_id)

            const image = req.files.image
            const imageUpdate = await cloudinary.uploader.upload(image.tempFilePath,{
               folder:'mvc'
            })
            var data = {
                name:name,
                des,des,
                price:price,
                quantity:quantity,
                original_price:original_price,
                deliveryCharge:deliveryCharge,
                image:
                {
                 public_id:imageUpdate.public_id,
                 url:imageUpdate.secure_url
                }
              }
         }
         else
         {
            var data ={
                name:name,
                des:des,
                price:price,
                quantity:quantity,
                deliveryCharge:deliveryCharge,
                original_price:original_price,
            }
         }
         const update = await productModel.findByIdAndUpdate(req.params.id,data)
            
             await update.save()
            //  console.log("here i am ::::")
             res.json({message:'Data saved'});
          
            
          
        } catch (error) {
            console.log(` error is this :::: ${error}`)
        }
     }
}

module.exports = ProductController
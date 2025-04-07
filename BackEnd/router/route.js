const express = require('express')
const AdminController = require('../controller/AdminController')
const ProductController = require('../controller/ProductController')
const productModel = require('../model/product')
const router = express.Router()
const auth = require('../MiddleWare/auth')
const UserController  = require('../controller/UserController')

const isLogin = require('../MiddleWare/isLogin')

router.post('/res',AdminController.res)
router.post('/login',isLogin,AdminController.login)
router.get('/logout',AdminController.logout)
router.get('/header',auth,AdminController.header)
router.post('/forgetPassword',AdminController.forgetPassword)
router.post('/resetPassword/:id',AdminController.resetPassword)

//ProductController
router.get('/home',ProductController.home)
router.post('/productData',auth,ProductController.ProductDataInsert)
router.get('/displayData',auth,ProductController.displayData)
router.get('/view/:id',ProductController.view)
router.get('/deleteData/:id',auth,ProductController.delete)
router.get('/edit/:id',auth,ProductController.edit)
router.put('/update/:id',auth,ProductController.update)
router.get('logout',AdminController.logout)

// //UserController
router.get('/addTocard',auth,UserController.getProduct)
router.get('/addTocard/:id',auth,UserController.addToCard)
router.get('/deleteProduct/:id',auth,UserController.deleteProduct)
router.post('/address',auth,UserController.address)
router.get('/findAddress',auth,UserController.findAddress)
router.get('/findAddress/:id',auth,UserController.findOneAddress)
router.get('/editAddress/:id',auth,UserController.editAddress)
router.post('/updateAddress/:id',auth,UserController.updateAddress)
router.post('/placeOrder/:id',auth,UserController.placeOrder)
router.post('/updateQuantity',auth,UserController.updateQuantity)
router.get('/findOrder',auth,UserController.findOrder)
router.post('/cancelOrder/:id',auth,UserController.cancelOrder)
router.get('/buynow/:id',auth,UserController.buyNow)
router.post('onlinePay',auth,UserController.onlinePay)
router.get('/deleteProductFormAddToCard',auth,UserController.deleteProductFormAddToCard)
module.exports = router 

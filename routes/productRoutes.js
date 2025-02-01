//const { createProductController, deleteProductController, getProductController, getSingleProductController, productPhotoController, updateProductController }= require( '../controllers/ProductController');

const { createProductController, deleteProductController, getProductController, getSingleProductController, productPhotoController, updateProductController, productFiltersController, productCountController, productListController, searchProductController, realtedProductController, productCategoryController, cashOnDeliveryController, codOrderController, codController, braintreeTokenController, brainTreePaymentController } = require('../controllers/ProductController');

const express =require('express');
const { requireSignIn, isAdmin } = require('../middlerware/authMiddlerware');
const formidable=require('express-formidable');


const router = express.Router();

//routes
// router.post(
//     "/create-product",
//     requireSignIn,
//     isAdmin,
//     formidable(),
//     createProductController
//   );

  // create product
router.post("/create-product",requireSignIn,isAdmin,formidable(),createProductController)
  //routes
  router.put(
    "/update-product/:pid",
    requireSignIn,
    isAdmin,
    formidable(),
    updateProductController
  );
  
  //get products
  router.get("/get-product", getProductController);
  
  //single product
  router.get("/get-product/:slug", getSingleProductController);
  
  //get photo
  router.get("/product-photo/:pid", productPhotoController);
  
  //delete rproduct
  router.delete("/delete-product/:pid", deleteProductController);

  //filter product
router.post("/product-filters", productFiltersController);

//product count
router.get("/product-count", productCountController);

//product per page
router.get("/product-list/:page", productListController);
  

//search product
router.get("/search/:keyword", searchProductController);

//similar product
router.get("/related-product/:pid/:cid", realtedProductController);

//category wise product
router.get("/product-category/:slug", productCategoryController);



//payments routes
//token
router.get("/cash-on-delivery", codController);
router.post("/cash-on-delivery",requireSignIn, codOrderController);


//payments routes
//token
router.get("/braintree/token", braintreeTokenController);

//payments
router.post("/braintree/payment", requireSignIn, brainTreePaymentController);
module.exports = router

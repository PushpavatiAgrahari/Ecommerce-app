const express =require('express');
const { requireSignIn, isAdmin } = require('../middlerware/authMiddlerware');
const { createCategoryController, updateCategoryController, categoryControlller, singleCategoryController, deleteCategoryController } = require('../controllers/categoryController');

const router = express.Router();

// create category
router.post('/create-category',requireSignIn,isAdmin,createCategoryController)

// update category
router.put('/update-category/:id',requireSignIn,isAdmin,updateCategoryController)

//get all category


router.get("/get-category", categoryControlller);

//single category
router.get("/single-category/:slug", singleCategoryController);

//delete category
router.delete(
  "/delete-category/:id",
  requireSignIn,
  isAdmin,
  deleteCategoryController
);



module.exports = router
const express = require("express");
const router = express.Router();
const postsController = require('../controllers/postsController')
const notFound = require('../middleware/error_404')


// Index route 
 router.get('/', postsController.index);

// Show route
 router.get('/:slug', postsController.show);

// Store Route
 router.post('/', postsController.store);

// Updat Route
 router.put('/:slug', postsController.update);

// Modify Route
 router.patch('/', postsController.modify);

// Destroy Route
 router.delete('/:title', postsController.destroy);

 // ------



module.exports = router
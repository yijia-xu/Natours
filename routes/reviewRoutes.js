const express = require('express');
const reviewController = require('../controllers/reviewController');
const authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true }); 

router.use(authController.protect); // Protect all routes after this middleware

router
    .route('/')
    .get(reviewController.getAllReviews)
    .post(authController.restrictTo('user'), // only users can post reviews
          reviewController.setTourUserIds,
          reviewController.createReview);

router.route('/:id')
      .get(reviewController.getReview)
      .patch(authController.restrictTo('user', 'admin'), 
             reviewController.updateReview)
      .delete(authController.restrictTo('user', 'admin'),
              reviewController.deleteReview);

module.exports = router;
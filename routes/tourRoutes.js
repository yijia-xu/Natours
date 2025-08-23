const express = require('express');
const tourController = require('../controllers/tourController'); //object for all exported functions
const router = express.Router();
const authController = require('../controllers/authController');
const reviewRouter = require('./reviewRoutes');

router.use('/:tourId/reviews', reviewRouter);

router
    .route('/')
    .get(authController.protect, tourController.getAllTours)
    .post(tourController.createTour);

router
    .route('/top-5-cheap')
    .get(tourController.aliasTopTours, tourController.getAllTours);

router
    .route('/tour-stats')
    .get(tourController.getTourStats);
router
    .route('/monthlyPlan/:year')
    .get(tourController.getMonthlyPlan);

router
    .route('/:id')
    .get(tourController.getTour)
    .patch(tourController.updateTour)
    .delete(authController.protect, 
        authController.restrictTo('admin', 'lead-guide'), 
        tourController.deleteTour);

// router.route('/:tourId/reviews')
//     .post(authController.protect, 
//           authController.restrictTo('user'), 
//           reviewController.createReview); 

module.exports = router;
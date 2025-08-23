const express = require('express');
const tourController = require('../controllers/tourController'); //object for all exported functions
const router = express.Router();
const authController = require('../controllers/authController');
const reviewRouter = require('./reviewRoutes');

router.use('/:tourId/reviews', reviewRouter);

router
    .route('/')
    .get(tourController.getAllTours)
    .post(authController.protect, 
          authController.restrictTo('admin', 'lead-guide'),
          tourController.createTour);

router
    .route('/top-5-cheap')
    .get(tourController.aliasTopTours, tourController.getAllTours);

router
    .route('/tour-stats')
    .get(tourController.getTourStats);
router
    .route('/monthlyPlan/:year')
    .get(authController.protect, 
          authController.restrictTo('admin', 'lead-guide', 'guide'),
          tourController.getMonthlyPlan);

router.route('/tours-within/:distance/center/:latlng/unit/:unit')
        .get(tourController.getToursWithin);
// /tours-within/250/center/-40,45/unit/mi

router.route('/distances/:latlng/unit/:unit').get(tourController.getDistances);

router
    .route('/:id')
    .get(tourController.getTour)
    .patch(authController.protect, 
          authController.restrictTo('admin', 'lead-guide'),
          tourController.updateTour)
    .delete(authController.protect, 
        authController.restrictTo('admin', 'lead-guide'), 
        tourController.deleteTour);


module.exports = router;
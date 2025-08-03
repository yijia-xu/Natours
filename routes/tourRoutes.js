const express = require('express');
const tourController = require('../controllers/tourController'); //object for all exported functions
const router = express.Router();
const authController = require('../controllers/authController');


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


module.exports = router;
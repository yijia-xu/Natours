const express = require('express');
const tourController = require('../controllers/tourController'); //object for all exported functions
const router = express.Router();

router.param('id', tourController.checkID);



router
    .route('/')
    .get(tourController.getAllTours)
    .post(tourController.checkBody, tourController.createTour); //checkbody before creating a tour

router
    .route('/:id')
    .get(tourController.getTour)
    .patch(tourController.updateTour)
    .delete(tourController.deleteTour);

module.exports = router;
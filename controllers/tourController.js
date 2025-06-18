const Tour = require('../models/tourModel');
const APIFeatures = require('../utils/apiFeatures');

exports.aliasTopTours = (req, res, next) => {
    req.query.limit = '5';
    req.query.sort = 'price,-ratingsAverage';
    req.query.fields = 'name,price,ratingsAverage,difficulty,summary';
    next(); 
}


exports.getAllTours = async (req, res) => {
    try {
        // execute query
        const features = new APIFeatures(Tour.find(), req.query).filter().sort().limitFields().paginate(); // pass query, queryString
        const tours = await features.query; 

        res.status(200).json({
            status: 'success',
            results: tours.length,
            data: {
                tours
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

exports.getTour = async (req, res) => {
    try {
        const theTour = await Tour.findById(req.params.id); // retuns a single tour by ID
        //Tours.findOne({ _id: req.params.id }); // alternative way to find a tour by ID
        res.status(200).json({
            status: 'success',
            data: {
                theTour
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

exports.createTour = async (req, res) => {
    try {
        const newTour = await Tour.create(req.body);

        res.status(201).json({ // status: Created
            status: 'success',
                data: {
                    newTour
                }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

exports.updateTour = async (req, res) => {
    try {
        const updatedTour =  await Tour.findByIdAndUpdate(req.params.id, req.body, {
            new: true, // return the updated document
            runValidators: true
        })

        res.status(200).json({
        status: 'success',
        data: {
            updatedTour
        }
    });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

exports.deleteTour = async (req, res) => {
    try {
        await Tour.findByIdAndDelete(req.params.id);

        res.status(204).json({ 
        status: 'success',
        data: null
    });

    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

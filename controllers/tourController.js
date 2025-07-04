const Tour = require('../models/tourModel');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.aliasTopTours = (req, res, next) => {
    req.query.limit = '5';
    req.query.sort = 'price,-ratingsAverage';
    req.query.fields = 'name,price,ratingsAverage,difficulty,summary';
    next(); 
};


exports.getAllTours = catchAsync(async (req, res, next) => {
    // execute query
    const features = new APIFeatures(Tour.find(), req.query)
                        .filter()
                        .sort()
                        .limitFields()
                        .paginate(); // pass query, queryString
    const tours = await features.query; 

    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
            tours
        }
    });
});

exports.getTour = catchAsync(async (req, res, next) => {
    const theTour = await Tour.findById(req.params.id); // retuns a single tour by ID
    //Tours.findOne({ _id: req.params.id }); // alternative way to find a tour by ID
    
    if (!theTour) {
        return next(new AppError("No tour found with that ID", 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            theTour
        }
    });
});

exports.createTour = catchAsync(async (req, res, next) => {
    const newTour = await Tour.create(req.body);

    res.status(201).json({ // status: Created
        status: 'success',
            data: {
                newTour
            }
    });
});

exports.updateTour = catchAsync(async (req, res, next) => {
    const updatedTour =  await Tour.findByIdAndUpdate(req.params.id, req.body, {
        new: true, // return the updated document
        runValidators: true
    })

    if (!updatedTour) {
        return next(new AppError("No tour found with that ID", 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            updatedTour
        }
    });
});

exports.deleteTour = catchAsync(async (req, res, next) => {
    const tour = await Tour.findByIdAndDelete(req.params.id);

    if (!tour) {
        return next(new AppError("No tour found with that ID", 404));
    }

    res.status(204).json({ 
        status: 'success',
        data: null
    });
});

exports.getTourStats = catchAsync(async (req, res, next) => {
    // aggregation pipeline
    const stats = await Tour.aggregate([ 
        {
            $match: { ratingsAverage: { $gte: 4.5} }
        },
        {
            $group: {
                _id: { $toUpper: '$difficulty' }, // group by difficulty
                numOfTours: { $sum: 1 }, // + 1 each time
                numRatings: { $sum: '$ratingsQuantity' },
                averageRating: { $avg: '$ratingsAverage' },
                averagePrice: { $avg: '$price' },
                minPrice: { $min: '$price' },
                maxPrice: { $max: '$price' }
            }
        },
        {
            $sort: { averagePrice: 1 } // sort by average price ascending
        }
    ]);

    res.status(200).json({
        status: 'success',
        data: {
            stats
        }
    });
});

exports.getMonthlyPlan = catchAsync(async (req, res, next) => {
    const year = req.params.year * 1;

    const plan = await Tour.aggregate([
        {
            $unwind: '$startDates'
        },
        {
            $match: {
                startDates: {
                    $gte: new Date(`${year}-01-01`),
                    $lte: new Date(`${year}-12-31`)
                }
            }
        },
        {
            $group: {
                _id: { $month: '$startDates' }, 
                numToursStarts: { $sum: 1 }, 
                tours: { $push: '$name' }
            }
        },
        { 
            $addFields: { month: '$_id' } 
        },
        {
            $project: {
                _id: 0 // exclude the _id field
            }
        },
        {
            $sort: { numToursStarts: -1 } // descending order
        }
    ]);

    res.status(200).json({
        status: 'success',
        data: {
            plan
        }
    });
});
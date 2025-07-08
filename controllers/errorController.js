const AppError = require('../utils/appError');
const handleCastErrorDB = err => {
    const msg = 'Invalid ' + err.path + ': ' + err.value;
    return new AppError(msg, 400);
}
const handleDuplicateFieldsDB = err => {
    const value = err.errorResponse.errmsg.match(/(["'])(\\?.)*?\1/)[0]; 
    console.log(value);

    const msg = 'Duplicate field value: ' + err.keyValue.name + '. Please use another value!';
    return new AppError(msg, 400);
}
const handValidationErrorDB = err => {
    const errors = Object.values(err.errors).map(el => el.message);
    const msg = `Invalid input data. ${errors.join('. ')}`;
    return new AppError(msg, 400);
}

const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
            stack: err.stack,
            error: err
        });
};
const sendErrirProd = (err, res) => {
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });

    } else {
        // Log the error
        console.error('ERROR 💥', err);
        
        res.status(500).json({
            status: 'error',
            message: 'Something went wrong...'
        });
    }
    
};


module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500; // internal server error
    err.status = err.status || 'error';

    if (process.env.NODE_ENV === 'development') {
        sendErrorDev(err, res);
    } else if (process.env.NODE_ENV === 'production') {
        let error = {...err}; // create a shallow copy of the error object
        if (error.name === 'CastError') {
            error = handleCastErrorDB(error);
        }
        if (error.code === 11000) { //duplicate key err
            error = handleDuplicateFieldsDB(error);
        }
        if (err.name === 'ValidationError') {
            error = handValidationErrorDB(error);
        }

        sendErrirProd(error, res);
    }

};

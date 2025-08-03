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

const handleJWTError = () => new AppError('Invalid token. Please log in again!', 401);

const handleJWTExpriredError = () => new AppError('Your token has expired! Please log in again.', 401);

const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
            stack: err.stack,
            error: err
        });
};
const sendErrorProd = (err, res) => {
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
        error.message = err.message;
        if (error.name === 'CastError') {
            error = handleCastErrorDB(error);
        }
        if (error.code === 11000) { //duplicate key err
            error = handleDuplicateFieldsDB(error);
        }
        if (error.name === 'ValidationError') {
            error = handValidationErrorDB(error);
        }
        if (error.name === 'JsonWebTokenError') 
            error = handleJWTError();
        if (error.name === 'TokenExpiredError')
            handleJWTExpriredError();


        sendErrorProd(error, res);
    }

};

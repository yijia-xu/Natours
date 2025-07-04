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
        sendErrirProd(err, res);
    }

};

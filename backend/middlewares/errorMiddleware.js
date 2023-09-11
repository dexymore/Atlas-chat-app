exports.notfound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    error.status = 404; // Set the error status
    next(error); // Pass the error to the error handling middleware
};

exports.errorHandler = (err, req, res, next) => {
    const statusCode = err.status || 500; // Use the error's status if available
    res.status(statusCode);
    res.setHeader('Content-Type', 'application/json'); // Set the content type to JSON
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};

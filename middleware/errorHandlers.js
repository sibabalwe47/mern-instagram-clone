exports.notFound = (req, res, next) => {
    const erro = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
}

exports.errorHandler = (err, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: err.stack
    })
}


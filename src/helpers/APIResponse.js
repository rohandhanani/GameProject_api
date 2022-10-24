// Success Api Response Helper//
exports.success = (message,statusCode, data) => {
    return {
        message,
        status: true,
        code: statusCode,
        data
    };
};

// Error Api Response Helper//
exports.error = (message, code, statusCode) => {
    return {
        message,
        status: false,
        code: statusCode,
        code
    };
};


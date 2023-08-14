const handleError = (res, error, modelName, uniqueKey) => {
    if (error.name === "MongoServerError" && error.code === 11000) {
        return res.status(409).json({ error: `${modelName} with ${uniqueKey} already exists` });
    }

    return res.status(500).json({ error: 'An error occurred while geting creating user object.' });
}

module.exports = {
    handleError
}
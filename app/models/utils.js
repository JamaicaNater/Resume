function mongoQueryFromQueryParams(userId, query) {
    let mongoQuery = { userId: userId };



    return mongoQuery;
}

module.exports = mongoQueryFromQueryParams;
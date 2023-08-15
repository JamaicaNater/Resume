function mongoQueryFromQueryParams(userId, query) {
    let mongoQuery = { userId: userId };

    return mongoQuery;
}

export default mongoQueryFromQueryParams;
class QueryFunctions {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }
  covertToRegex(queryObj) {
    const modifiedQueryObj = Object.assign(
      {},
      ...Object.keys(queryObj).map((key) => {
        if (key === "userID" || key === "postID")
          return { [key]: queryObj[key] };

        const regex = new RegExp(queryObj[key], "i");
        const el = {
          [key]: {
            $regex: regex,
          },
        };
        return el;
      })
    );
    return modifiedQueryObj;
  }
  filter(useRegex) {
    const queryObj = { ...this.queryStr };
    const excludedFields = ["page", "limit", "sort", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);
    if (useRegex) {
      const modifiedQueryObj = this.covertToRegex(queryObj);
      this.query = this.query.find(modifiedQueryObj);
    } else {
      this.query = this.query.find(queryObj);
    }

    return this;
  }
  select() {
    if (this.queryStr.fields) {
      // e.g. favorite post ID
      const fields = this.queryStr.fields.replace(/,/g, " ");
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v");
    }

    return this;
  }
  sort() {
    if (this.queryStr.sort) {
      const sort = this.queryStr.sort.replace(/,/g, " ");
      this.query = this.query.sort(sort);
    } else {
      this.query = this.query.sort("-createdAt");
    }

    return this;
  }
  paginate() {
    const page = this.queryStr.page * 1 || 1;
    const limit = this.queryStr.limit * 1 || 100;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

module.exports = QueryFunctions;

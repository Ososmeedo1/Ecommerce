class ApiFeatures {
  constructor(mongooseQuery, data) {
    this.mongooseQuery = mongooseQuery;
    this.data = data;
  }

  pagination() {
    // pagination
    let { page, limit } = this.data;
    if (!limit || limit <= 0) {
      limit = 5;
    }
    if (!page || page <= 0) {
      page = 1;
    }
    const skip = (page - 1) * limit;
    this.mongooseQuery.limit(Number(limit)).skip(Number(skip));
    return this;
  }

  sort() {
    if (this.data.sort) {
      this.mongooseQuery.sort(this.data.sort.replaceAll(",", " "));
      return this;
    }
    return this;

  }
  fields() {
    if (this.data.fields) {
      this.mongooseQuery.select(this.data.fields.replaceAll(",", " "));
      return this;
    }
    return this;
  }
  search() {
    if (this.data.search) {
      this.mongooseQuery.find({
        $or: [
          { title: { $regex: this.data.search } },
          { description: { $regex: this.data.search } },
        ],
      });
      return this;
    }
    return this;
  }

  filter(){
    let query ={...this.data}
    ["page","limit","sort","fields","search"].forEach(element => {delete query[element] });
    query=JSON.stringify(query)
    query=query.replace(/gt|gte|lt|lte|eq/,(value)=>`$${value}`)
    query=JSON.parse(query)
    this.mongooseQuery.find(query)
    return this
  }
}

export default ApiFeatures;

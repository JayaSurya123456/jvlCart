const { json } = require("express");

 class APIFEATURES{
    constructor(query,queryStr){
        this.query=query
        this.queryStr=queryStr
    }
 
 search(){
    let keyword=this.queryStr.keyword ? {
        name:{
            $regex: this.queryStr.keyword,
            $options:'i'
        }
    }:{};
    this.query.find({...keyword})
    return this;
}

filter() {
  const queryObj = { ...this.queryStr };

  const removeFields = ['keyword', 'page', 'limit'];
  removeFields.forEach(field => delete queryObj[field]);

  let queryStr = JSON.stringify(queryObj);

  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

  this.query = this.query.find(JSON.parse(queryStr));

  console.log(queryStr)

  return this;
}



    paginate(resPerPage){
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = resPerPage * (currentPage - 1)
        this.query.limit(resPerPage).skip(skip);
        return this;
    }
}




module.exports=APIFEATURES;
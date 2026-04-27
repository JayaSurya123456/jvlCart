
 class APIFEATURES{
    constructor(query,queryStr){
        this.query=query
        this.queryStr=queryStr
    }
 
 search(){
    //check if keyword exist if yes find become{name:oppo} else {}
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
    // this method for gt lt

  const queryObj = { ...this.queryStr };  
  const removeFields = ['keyword', 'page', 'limit'];

  removeFields.forEach(field => delete queryObj[field]);
  
  let queryStr = JSON.stringify(queryObj);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

  this.query = this.query.find(JSON.parse(queryStr));

//   console.log(queryStr)

  return this;
}

    paginate(resPerPage){
        //getting current page from queryStr page=0 if no page default 1 
        //why 1 to prevent undefined when conver Number 
        const currentPage = Number(this.queryStr.page) || 1;
        //logic for how many page need to skip 0*1-1
        const skip = resPerPage * (currentPage - 1)
        //limit decide max document skip 10 mean skip first 10 document
        this.query.limit(resPerPage).skip(skip);
        return this;
    }
}


module.exports=APIFEATURES;
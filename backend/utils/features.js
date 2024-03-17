class searchproduct{
    constructor (query, queryStr){
            this.query = query;
            this.queryStr = queryStr;
        }
        search(){
            let keyword = this.queryStr.keyword ? {
            productname: {
                $regex: this.queryStr.keyword,
                $options: 'i'
             }
            } : {};
        this.query.find({...keyword})
        return this;
        }
        filter() {
            const queryStrCopy = { ...this.queryStr};
            //before
            console.log(queryStrCopy);
            //removing fields from query
            const removeFields = ['keyword', 'limit', ];
            removeFields.forEach( field => delete queryStrCopy [field]);
            //after
            console.log(queryStrCopy);
            this.query.find(queryStrCopy)
            return this;
            }
}
module.exports=searchproduct;
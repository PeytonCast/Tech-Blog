// articleShema {
    // par1
    // par2
    // par3
    // par4
    // par5
    // link1
    // link2
    // img1
    // img2
// }
const { Schema } = require('mongoose');
const commentSchema = require('./Comment')
const articleSchema = new Schema(
    {
        title: {type:String},
        par1: {type:String},
        par2: {type:String},
        par3: {type:String},
        par4: {type:String},
        par5: {type:String},
        link1: {type:String},
        link2: {type:String},
        img1: {type:String},
        img2: {type:String},
        comments: [commentSchema],
        createdAt: {
            type: Date, 
            default: Date.now
            // Use a getter method to format the timestamp on query
        },
    }

)
articleSchema.virtual('formatDate').get(function () {
    return `${new Date(this.createdAt).getMonth() + 1}/${new Date(this.createdAt).getDate()}/${
        new Date(this.createdAt).getFullYear()
  }`;})
module.exports = articleSchema
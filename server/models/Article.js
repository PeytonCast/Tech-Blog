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
        img1: {type:String},
        comments: [commentSchema]
    }
)

module.exports = articleSchema
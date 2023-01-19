// coments belongs to article 
// it will contain text and the username
const { Schema } = require('mongoose');
const commentSchema = new Schema(
    {
        username: {
            type: String,
          },

        text: {
            type: String,
          },
          
        createdAt: {
            type: Date, 
            default: Date.now
            // Use a getter method to format the timestamp on query
        },
    }
)
commentSchema.virtual('formatDate').get(function () {
    return `${new Date(this.createdAt).getMonth() + 1}/${new Date(this.createdAt).getDate()}/${
        new Date(this.createdAt).getFullYear()
  }`;})
module.exports = commentSchema;

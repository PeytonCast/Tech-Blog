// this is where i will need 
// to export my models 
// the website will have an

// admin will refrence articles instead of owning articles
//  articles is its own model
//   users can comment
const User = require('./User');
const Articles = require('./Article');
const Comment = require('./Comment');
const Admin = require('./Admin');

// here we are bundling everything in our models files to be used in the future
module.exports = { Articles, User, Comment, Admin };

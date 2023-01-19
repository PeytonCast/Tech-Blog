// this is where i will need 
// to export my models 
// the website will have an 
const User = require('./User');
const Article = require('./Article');
const Comment = require('./Comment');
const Admin = require('./Admin');

// here we are bundling everything in our models files to be used in the future
module.exports = { Article, User, Comment, Admin };

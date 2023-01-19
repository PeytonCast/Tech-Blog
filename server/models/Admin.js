const { Schema, model} = require('mongoose');
const bcrypt = require('bcrypt');
// admin 
// who can post and edit articles
// and delete any comment
// username
// password
// comments [commentSchema]
// articles [articleSchema]
const articleSchema = require('./Article')
const adminSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
          },
        password: {
            type: String,
            required: true,
            minlength: 5,
        },
        articles: [articleSchema]
    }
)
// pre hashing password
  adminSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
  
    next();
  });
//  check password middware
 adminSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
  };
const Admin = model('Admin', adminSchema);

module.exports = Admin;
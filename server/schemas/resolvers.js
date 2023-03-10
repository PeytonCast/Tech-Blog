const { AuthenticationError } = require('apollo-server-express');
const { User, Admin, Articles} = require('../models');
// const auth = require('../utils/auth');
const { signToken } = require('../utils/auth');

// here i will asign my resolvers for export to typedefs

const resolvers = {
    // write code here for admin and users!
    Query: {
    getArticle: async () => {
        const articleData = await Articles.findOne({_id: req.params._id})
        return articleData
    },
    getAllArticles: async () => {
        const articleData = await Articles.find()
        return articleData
    },
    
    //    getsa previosly existing admin 
    // (an admin is a type of user so it falls under context.user)
    
     getAdmin: async (parent, arg, context) => {
        
         if (context.user){
            // get everything except for the password and __v
            const adminData = await Admin.findOne({ _id: context.user._id }).select('-__v -password');
           return adminData 
         }
        throw new AuthenticationError('Err 401: Please log in first.')
     },

        //gets previosly existing user
     getUser: async (parent, arg, context) => {
        console.log(context)
        if (context.user){
            // get everything except for the password and __v
            const userData = await User.findOne({ _id: context.user._id }).select('-__v -password');
            return userData
        }
        throw new AuthenticationError('Err 401: Please log in first.')
     },
    },

    Mutation: {
        // creates a new admin 
        // requires a username and password
        addAdmin: async (parent, {username, password}) => {
            const admin = await Admin.create({ username, password});
            const token = signToken(admin);
            return { token, admin };
        },

        // creates a new user 
        // requires a username email and password
        addUser: async (parent, {username, email, password}) => {
            const user = await User.create({ username, email, password})
            const token = signToken(user);
            return { token, user};
        },

        // admin login via username
        adminLogin: async (parent, {username, password}) => {

            const admin = await Admin.findOne({username})
            // if the admin doesnt exist/missspelled 
            if (!admin) {
                throw new AuthenticationError('Err 404: No admin found with that username.')
            }
            
            // checks password
            const correctPw = await admin.isCorrectPassword(password);
            
            // if password incorrect/missing throw err
            if(!correctPw){
                throw new AuthenticationError('Err 401: password is incorrect.')
            }

            // else throw sign in via token
            const token = signToken(admin);
            // return token and admin info
            return { token, admin};

        },
        //TODO I need to be able to post an article 
        // i need to update the admin to hold the article's ID 

        createPost: async (parent, {postData}, context) => {
            // check for login 
            if(context.user){
                // 
                const postData = await Articles.create(
                    {_id : context.user._id},
                    { $push: {articles: postData}},
                    {new: true }
                );
                return updateAdmin;
                
            }
            throw new AuthenticationError('Err 401: password is incorrect.')
        },
        
        // removePost: async (parent, {_id}, context) => {
        //     if(context.user){
        //         const updateAdmin = await Admin.findOneAndUpdate(
        //             // find admin id (an admin is a type of user)
        //             { _id: context.user._id },
        //             // remove article id 
        //             { $pull: {articles: {_id}}},
        //             {new: true}
        //         )
        //         return updateAdmin
        //     }
        //     else{
        //         throw new AuthenticationError('Err 401: authentication error')
        //     }
        // },

        // user login via email
        userLogin: async (parent, {email, password}) => {
            // find user by email
            const user = await User.findOne({ email });

            // if the user doesnt exist/misspelled throw 404
            if (!user){
                throw new AuthenticationError('Err 404: No User found with that email.')
            }

            // correct password logic
            // must be lower case user
            const correctPw = await user.isCorrectPassword(password);
            
            // if password is incorrect throw this err
            if (!correctPw) {
                throw new AuthenticationError('Err 401: Password is incorrect.')
            }

            // else sign a token for users login 
            const token = signToken(user)

            // then return the token and user
            return { token, user };
        },
    },
}
module.exports = resolvers;
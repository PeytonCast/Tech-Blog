const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID!
        username: String!
        email: String!
        password: String!
    }

    type Admin {
        _id: ID!
        username: String!
        password: String!
        articles: [Article]

    }

    type adminAuth {
        token: ID! 
        admin: Admin
    }

    type Auth {
        token: ID! 
        user: User
    }

    type Query {
        getAdmin: Admin
        getUser: User 

    }

    type Article {
        title: String
        par1: String
        par2: String
        par3: String
        par4: String
        par5: String
        link1: String
        link2: String 
        img1: String
        img2: String 
        comments: [Comment]
    }

    input postInput {
        title: String
        par1: String
        par2: String
        par3: String
        par4: String
        par5: String
        link1: String
        link2: String 
        img1: String
        img2: String 
        comments: [inputComment]
    }

    type Comment {
        username: String 
        text: String 
    }
    
    input inputComment {
        username: String 
        text: String 
    }

    type Mutation{
        userLogin(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        adminLogin(username: String!, password: String!): adminAuth
        addAdmin(username: String!, password: String!): adminAuth
        createPost(postData: postInput ): Admin 
    }
`;
module.exports = typeDefs
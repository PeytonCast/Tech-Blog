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

    type Mutation{
        userLogin(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        adminLogin(username: String!, password: String!): adminAuth
        addAdmin(username: String!, password: String!): adminAuth
    }
`;
module.exports = typeDefs
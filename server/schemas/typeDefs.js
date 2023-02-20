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

    type AdminAuth {
        token: ID! 
        admin: Admin
    }
    type UserAuth {
        token: ID! 
        user: User
    }

    type Query {
        getAdmin: Admin
        getUser: User 
    }

    type mutation{
        userLogin(email: String!, password: String!): UserAuth
        addUser(username: String!, email: String!, password: String!): UserAuth
        adminLogin(username: String!, password: String!): AdminAuth
        addAdmin(username: String!, password: String!): adminAuth
    }
`
module.exports = typeDefs
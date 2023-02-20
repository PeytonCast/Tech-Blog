const { AuthenticationError } = require('apollo-server-express');
const { User, Admin } = require('../models');
const { signToken } = require('../utils/auth');

// here i will asign my resolvers for export to typedefs

const resolvers = {
    // write code here for admin and users!
}
const Joi = require('joi');
const mongoose = require('mongoose')
// s capital Schema and String
const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    gender: {
        type: String,
    },
    status: {
        type: String,
    }
})

function validateUser(user) {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        // password: Joi.string().min(5).max(255).required()
    };
    return Joi.validate(user, schema);
}
const user = mongoose.model('user', schema)
const validate = validateUser
module.exports = user, validate
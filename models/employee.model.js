const mongoose = require('mongoose');

//Define mongoose Schema

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: "This field is required"
    },
    address: String,
    pincode: String,
    gender: String,
    number: String,
    field: String,
    email: String,
    password: String,
    file: String,
    check: String
});

employeeSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');

mongoose.model('Employee', employeeSchema);
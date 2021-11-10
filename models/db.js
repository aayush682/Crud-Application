const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/EmployeeDB', (err) => {
    if (!err) {
        console.log("Connection Successful");
    }
    else {
        console.log("Connection Error" + err);
    }
});

require('./employee.model');
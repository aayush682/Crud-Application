const express = require('express');
var router = express.Router();
const mongoose = require('mongoose')
const Employee = mongoose.model('Employee')

router.get('/', (req, res) => {
    res.render("employee/create&edit", {
        viewTitle: "Insert Employee"
    })
});

router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
    else
        updateRecord(req, res);
});

function insertRecord(req, res) {
    var employee = new Employee();
    employee.name = req.body.name
    employee.address = req.body.address
    employee.pincode = req.body.pincode
    employee.gender = req.body.gender
    employee.number = req.body.number
    employee.field = req.body.field
    employee.email = req.body.email
    employee.password = req.body.password
    employee.file = req.body.file
    employee.check = req.body.check
    employee.save((err, doc) => {
        if (!err)
            res.redirect('employee/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("employee/create&edit", {
                    viewTitle: "Insert Employee",
                    employee: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}

router.get('/list', (req, res) => {
    Employee.find((err, docs) => {
        if (!err) {
            const context = {
                list: docs.map(doc => {
                    return {
                        _id: doc._id,
                        name: doc.name,
                        email: doc.email,
                        number: doc.number,
                        pincode: doc.pincode
                    }
                })
            }

            res.render('employee/list', {
                list: context.list
            })
        }
        else {
            console.log('Error in retrieving employee list :' + err);
        }
    });
});
function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'name':
                body['nameError'] = err.errors[field].message;
                break;
            case 'email':
                body['emailError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

function updateRecord(req, res) {
    Employee.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('employee/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("employee/create&edit", {
                    viewTitle: 'Update Employee',
                    employee: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}

router.get('/:id', (req, res) => {
    Employee.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("employee/create&edit", {
                viewTitle: "Update Employee",
                employee: doc
            });
        }
    }).lean();
});
router.get('/delete/:id', (req, res) => {
    Employee.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/employee/list');
        }
        else { console.log('Error in employee delete :' + err); }
    });
});

module.exports = router;

const userService = require('../services/user.services');

exports.registration = (req, res) => {
    var responseResult = {}
    req.checkBody('first_name', 'first name is required').notEmpty();
    req.checkBody('last_name', 'last name is required').notEmpty();
    req.checkBody('user_name', 'username is required').notEmpty();
    req.checkBody('email', 'email is required').notEmpty();
    req.checkBody('password', 'password is required').notEmpty();
    console.log(req.body);


    var errors = req.validationErrors();
    if (errors) {
        responseResult.status = false;
        responseResult.message = errors[0].msg;
        return res.status(400).send(responseResult);
    } else {
        userService.registration(req.body, (error, result) => {
            if (error) {
                responseResult.status = false;
                responseResult.message = "Something went wrong";
                return res.status(500).send(responseResult);
            } else {
                responseResult.status = true;
                responseResult.message = "Registered Successfully";
                responseResult.data = result;
                return res.status(201).send(responseResult);
            }
        })
    }
}

exports.login = (req, res) => {
    var responseResult = {}
    req.checkBody('user_name', 'username is required').notEmpty();
    req.checkBody('password', 'password is required').notEmpty();
    console.log(req.body);

    var errors = req.validationErrors();
    if (errors) {
        responseResult.status = false;
        responseResult.message = errors[0].msg;
        return res.status(400).send(responseResult);
    } else {
        userService.login(req.body, (error, wrongPassword, result, notRegistered ) => {
            if (error) {
                responseResult.status = false;
                responseResult.message = "Something went wrong";
                return res.status(500).send(responseResult);
            } else if(wrongPassword) {
                responseResult.status = false;
                responseResult.message = "Wrong password";
                return res.status(401).send(responseResult);
            } else if(result != null) {
                responseResult.status = true;
                responseResult.message = "Logged in Successfully";
                responseResult.data = result;
                return res.status(200).send(responseResult);
            } else {
                responseResult.status = false;
                responseResult.message = notRegistered;
                return res.status(404).send(responseResult);
            }
        })
    }
}
const userService = require('../services/user.services');

exports.registration = (req, res) => {
    req.checkBody('first_name', 'first name is required').notEmpty();
    req.checkBody('last_name', 'last name is required').notEmpty();
    req.checkBody('user_name', 'username is required').notEmpty();
    req.checkBody('email', 'email is required').notEmpty();
    req.checkBody('password', 'password is required').notEmpty();
    

    var errors = req.validationErrors();
    if (errors) {
        responseResult.status = false;
        responseResult.message = errors[0].msg;
        return res.status(constantsParam.staticHTTPErrorMessages.BAD_REQUEST.errorResponseCode).send(responseResult);
    }

}
var jwt = require('jsonwebtoken');
const secret = process.env.secret;

var auth = function (req, res, next) {

    var token = req.headers["token"];
    var response = {
        'message': "Unauthorised Login"
    };
    jwt.verify(token, secret, function (err, decoded) {
        if (err) {
            return res.status(constantParams.staticHTTPErrorMessages.UNAUTHORIZED.errorResponseCode).send(response);
        }
        else {
            next();
        }
    });

}

module.exports = auth;
const userModel = require('../app/models/user.model');

exports.registration = (data, callback) => {
    userModel.save(data, (error , result) => {
        if(error) {
            callback(error);
        } else {
            callback(null, result);
        }
    })
}

exports.login = (data, callback) => {
    userModel.login(data, (error , wrongPassword, result, notRegistered) => {
        if(error) {
            callback(error);
        } else if(wrongPassword) {
            callback(null, wrongPassword, null);
        } else if(result != null) {
            callback(null, null, result);
        } else {
            callback(null, null, null, notRegistered);
        }
    })
}
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
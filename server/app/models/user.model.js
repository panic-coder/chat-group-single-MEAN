const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const UserSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: [true, 'first name is required']
    },
    last_name: {
        type: String,
        required: [true, 'last name is required']
    },
    user_name: {
        type: String,
        required: [true, 'username is required']
    },
    email: {
        type: String,
        required: [true, 'email is required']
    },
    password: {
        type: String,
        required: [true, 'password is required']
    },
    creator_stamp: {
        type: Date,
        default: Date.now
    },
    update_stamp: {
        type: Date,
        default: Date.now
    },
});

const User = mongoose.model('user', UserSchema);

bcryptSave = (password, callback) => {
    bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {
            if (err) {
                callback(err);
            } else {
                callback(null, hash);
            }
        });
    });
}

bcryptCompare = (password, hashedPassword, callback) => {
    bcrypt.compare(password, hashedPassword, function (err, res) {
        if (err) {
            callback(err);
        } else if (res) {
            callback(null, res);
        } else if (!res) {
            callback(null, res);
        } else {
            callback("Something went wrong");
        }
    });
}

function UserSchemaModel() {

}

UserSchemaModel.prototype.save = (data, callback) => {
    bcryptSave(data.password, (err, hashedPassword) => {
        if (err) {
            callback(err)
        } else {
            data.password = hashedPassword;
            var newUserData = new User(data);
            newUserData.save((error, result) => {
                if (error) {
                    callback(error);
                } else {
                    callback(null, result);
                }
            })
        }
    })
}

UserSchemaModel.prototype.login = (data, callback) => {
    User.findOne({
        user_name: data.user_name
    }, (error, result) => {
        if (error) {
            callback(error);
        } else if (result != null) {
            bcryptCompare(data.password, result.password, (errorPassword, resultPassword) => {
                if (errorPassword) {
                    callback(errorPassword);
                } else if (resultPassword) {
                    callback(null, null, result);
                } else {
                    callback(null, "Wrong password", null);
                }
            })
        } else {
            callback( null, null, null, "Not a registered user")
        }
    })
}

module.exports = new UserSchemaModel();
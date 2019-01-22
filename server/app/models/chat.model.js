const mongoose = require('mongoose');
const enum_message_type = ['single', 'group'];

const ChatSchema = new mongoose.Schema({
    sender_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: [true, 'sender id is required']
    },
    receiver_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        // required: [true, 'receiver id is required']
    },
    message: {
        type: String,
        required: [true, 'message is required']
    },
    type: {
        type: String,
        required: [true, 'single or group type is required'],
        enum: enum_message_type
    },
    group_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'group',
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

const Chat = mongoose.model('chat', ChatSchema);

function ChatSchemaModel() {

}

ChatSchemaModel.prototype.save = (data, callback) => {
    var newChatData = new Chat(data);
    newChatData.save(data, (error, result) => {
        if(error){
            callback(error);
        } else {
            callback(null, result);
        }
    })
}
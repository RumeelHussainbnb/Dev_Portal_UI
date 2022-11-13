const mongoose = require('mongoose');
const { object, string } = require('prop-types');

const UserSchema = new mongoose.Schema({
    Username:{
        type: String,
        required: [true, 'Please specify a username'],
        unique: true,
        trim: true,
        maxlength: [100, 'Username cannot be more than 100 characters']
    },
    Password:{
        type: String,
        maxlength: [200, 'Media name cannot be more than 200 characters']
    },
    Token:{
        type: String,
        trim: true,
        maxlength: [500, 'Token cannot be more than 500 characters']
    }, 
    TokenFirstCreatedAt:{
        type: Date,
        default: Date.now,
        require: true
    },
    PublicKey:{
        type: String,
        unique: true,
        maxlength: [100, "PublicKey should not be more than 100 characters"]
    },
    Role:{
        type: String,
        trim: true
    },
    TokenUpdatedAt:{
        type: Date
    },
    CreatedAt:{
        type: Date,
        default: Date.now,
        require: true
    },
})

UserSchema
  .path('Username')
  .validate(function(value) {
    var self = this;
    if(/\s/.test(value)){
        return false
    }
    return true
  }, 'Spaces not allowed in Username field. Please use - or _ or number')

module.exports= mongoose.models.User || mongoose.model('User', UserSchema);
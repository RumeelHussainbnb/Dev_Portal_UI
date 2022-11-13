const mongoose = require('mongoose');
const { object } = require('prop-types');

const TweetSchema = new mongoose.Schema({
    PK:{
        type: String,
        required: [true, 'Please specify a PK'],
        trim: true,
        maxlength: [100, 'PK cannot be more than 100 characters']
    },
    Media:{
        type: String,
        maxlength: [200, 'Media name cannot be more than 200 characters']
    },
    ReferencedTweet:{
        type: Array
    },
    Author:{
        type: Object
    },
    text:{
        type: String,
        trim: true,
        maxlength: [100, 'text cannot be more than 100 characters']
    },
    id:{
        type: String,
        unique: true,
        maxlength: [100, 'id cannot be more than 100 characters']
    },
    public_metrics:{
        type: Object
    },
    attachments:{
        type: Object
    },
    author_id:{
        type: String,
        maxlength: [200, 'author_id cannot be more than 200 characters']
    },
    Type:{
        type: String,
        maxlength: [100, 'Type cannot be more than 100 characters']
    },
    Pinned:{
        type: Number,
        require: false
    },    
    Expdate:{
        type: Date,
        require: false
    },    
    CreatedAt:{
        type: Date,
        default: Date.now,
        require: true,
    },
})

module.exports= mongoose.models.Tweet || mongoose.model('Tweet', TweetSchema);
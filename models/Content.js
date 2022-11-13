const mongoose = require('mongoose');

const ContentSchema = new mongoose.Schema({
    Title:{
        type: String,
        required: [true,'Please add a title'],
        unique: true,
        trim: true,
        maxlength: [100,'Title cannot be more than 100 characters']
    },
    Author:{
        type: String,
        required: AuthorNameRequired,
        maxlength: [200,'Author name cannot be more than 200 characters']
    },
    SK:{
        type: String,
        unique: true,
        required: [true, 'SK add a SK'],
        maxlength: [40, 'SK cannot be more than 40 characters']
    },
    Description:{
        type: String,
        require: true,
        trim: true,
        maxlength: [5000,'Description cannot be more than 5000 characters']
    },
    ContentMarkdown:{
        type: String,
        require: true,
        trim: true,
        maxlength: [20000,'ContentMarkdown cannot be more than 20000 characters']
    },
    ContentType:{
        type: String,
        require: true,
        trim: true,
        maxlength: [100,'ContentType cannot be more than 100 characters']
    },
    Url:{
        type: String,
        require: true,
        trim: true,
        maxlength: [2048,'URL cannot be more than 2048 characters']
    },
    Tags:{
        type: Array,
        require: false
    },
    Vertical:{
        type: String,
        require: false
    },
    SpecialTag:{
        type: String,
        require: false,
        trim: true
    },
    PlaylistTitle:{
        type: String,
        require: false,
        trim: true,
        default: ""
    },
    Provider:{
        type: String,
        require: false,
        trim: true
    },
    Img:{
        type: String,
        require: false,
        trim: true,
        maxlength: [300,'Img path cannot be more than 300 characters']
    },    
    PlaylistID:{
        type: String,
        require: false,
        trim: true,
        default: ""
    },
    Position:{
        type: Number,
        require: false,
        trim: true
    },
    ContentStatus:{
        type: String
    },
    Lists:{
        type: String,
        default: ""
    },
    Live:{
        type: Number
    },
    CreatedAt:{
        type: Date,
        default: Date.now,
        require: true,
    },
    PublishedAt:{ // Duplicate to CreatedAT to not break the flow of front end
        type: Date,
        default: Date.now,
        require: true,
    },
})

ContentSchema
  .path('SK')
  .validate(function(value) {
    var self = this;
    if(/\s/.test(value)){
        return false
    }
    return true
  }, 'Spaces not allowed in SK field. Please use - or _');


function AuthorNameRequired () {
    return typeof this.Author === 'string'? false : true
}

module.exports= mongoose.models.Content || mongoose.model('Content', ContentSchema);
const mongoose = require('mongoose');

const LibrarySchema = new mongoose.Schema({
    Title:{
        type: String,
        required: [true, 'Please specify a title'],
        unique: true,
        trim: true,
        maxlength: [100, 'Title cannot be more than 100 characters']
    },
    Author:{
        type: String,
        required: [true, 'Please specify Author name'],
        trim: true,
        maxlength: [200, 'Author name cannot be more than 200 characters']
    },
    Description:{
        type: String,
        require: true,
        trim: true,
        maxlength: [500, 'Description cannot be more than 500 characters']
    },
    ContentStatus:{
        type: String,
        default: "active"
    },
    ContentMarkdown:{
        type: String,
        trim: true,
        maxlength: [1000, 'ContentMarkdown cannot be more than 1000 characters']
    },
    PlaylistTitle:{
        type: String,
        require: false,
        maxlength: [400, 'PlaylistTitle cannot be more than 400 characters']
    },
    PlaylistID:{
        type: String,
        trim: true,
        maxlength: [400, 'PlaylistID cannot be more than 400 characters']
    },
    SK:{
        type: String,
        require: true,
        trim: true,
        maxlength: [200, 'SK cannot be more than 400 characters']
    },
    ContentType:{
        type: String,
        require: true,
        trim: true,
        maxlength: [100, 'ContentType cannot be more than 100 characters']
    },
    Url:{
        type: String,
        require: true,
        trim: true,
        maxlength: [2048, 'URL cannot be more than 2048 characters']
    },
    Img:{
        type: String,
        require: false,
    },
    Tag:{
        type: Array,
        require: false
    },
    Position:{
        type: Number,
        require: false
    },
    Promoted:{
        type: Number,
        require:false
    },
    Live:{ 
        type: Number,
        require:false
    },
    Vertical:{
        type: String,
        require: false
    },
    Provider:{
        type: String,
        require: false
    },    
    Lists:{
        type: String,
        require: false
    },
    SpecialTag:{
        type: String,
        require: true,
        trim: true
    },
    Expdate:{
        type: Number,
        require: false
    },    
    PublishedAt:{
        type: Date,
        require: false,
        default: Date.now,
        trim: true
    },
    CreatedAt:{
        type: Date,
        default: Date.now,
        require: true,
    },
    CreatedBy:{
        type: String,
        require: true,
        trim: true,
        maxlength: [40, 'CreatedBy cannot be more than 2048 characters']
    },
})

module.exports= mongoose.models.Library || mongoose.model('Library', LibrarySchema);
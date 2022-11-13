const mongoose = require('mongoose');

const PlaylistSchema = new mongoose.Schema({
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
        maxlength: [5000, 'Description cannot be more than 5000 characters']
    },
    Tags:{
        type: Array,
        require: false
    },
    Position:{
        type: Number,
        require: false
    },
    Vertical:{
        type: String,
        require: false,
        default: "bnb"
    },
    Provider:{
        type: String,
        require: [true, 'Please specify Provider'],
        trim: true,
        maxlength: [100, 'Provider cannot be more than 100 characters']
    },
    CreatedAt:{
        type: Date,
        default: Date.now,
        require: true,
    },
})

module.exports= mongoose.models.Playlist || mongoose.model('Playlist', PlaylistSchema);
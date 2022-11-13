const mongoose = require('mongoose');

const ContentTypeSchema = new mongoose.Schema({
    Name:{
        type: String,
        required: [true,'Please add a Type'],
        unique: true,
        trim: true,
        maxlength: [40,'Type cannot be more than 40 characters']
    },
    CreatedAt:{
        type: Date,
        default: Date.now,
        require: true,
    },
})

module.exports= mongoose.models.ContentType || mongoose.model('ContentType', ContentTypeSchema);
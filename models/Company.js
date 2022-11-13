const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
    Name:{
        type: String,
        required: [true,'Please add a Name'],
        maxlength: [100,'Name cannot be more than 100 characters']
    },
    Description:{
        type: String,
        require: true,
        trim: true,
        maxlength: [400,'Description cannot be more than 400 characters']
    },
    Logo:{
        type: String,
        require: true,
        trim: true,
        maxlength: [100,'Logo path cannot be more than 100 characters']
    },
    BgColor:{
        type: String,
        trim: true,
        maxlength: [10,'BgColor cannot be more than 10 characters']
    },
    Status:{
        type: String,
        default: "active",
        trim: true,
    },
    Url:{
        type: String,
        require: true,
        trim: true,
        maxlength: [2048,'URL cannot be more than 2048 characters']
    },
    DeletedAt:{
        type: Object
    },
    CreatedAt:{
        type: Date,
        default: Date.now,
        require: true
    },
    UpdatedAt:{
        type: Date
    },
})

module.exports= mongoose.models.Company || mongoose.model('Company', CompanySchema);
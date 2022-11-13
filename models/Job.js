import jobFields from "../utils/job-fields";
const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
    fields:{
        type: Object,
        require: true,
        trim: true
    },
    createdTime:{
        type: Date,
        default: Date.now,
        require: true,
    }
})

JobSchema
  .path('fields')
  .validate(function(value) {
    var input_fields = Object.keys(value);

    const filteredArray = jobFields.filter(x => input_fields.includes(x));

    if(filteredArray.length != 10){
        return false
    }
    return true
  }, 'All fields are not supplied. Please check your input');

module.exports= mongoose.models.Job || mongoose.model('Job', JobSchema);
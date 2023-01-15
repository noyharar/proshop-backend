var mongoose = require('mongoose');

var Schema = mongoose.Schema;

const userSchema = Schema({

    name : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    password:  {
        type: String,
        required: true
    },
    isAdmin : {
        type: Schema.Types.Boolean,
        required: true,
        default: false
    },

    timestamps: {
        type: Schema.Types.Boolean,
        default: true
    },
});

const User = mongoose.model('User',userSchema);
module.exports  = User;

const mongoose = require('mongoose')

const Schema = mongoose. Schema

const txnSchema = new Schema({
    type: {
        type: String,
        required: true
    },
    Amount: {
        type: Number,
        required: true
    },
    TxnDate: {
        type: Date,
        required: true
    },
    userid:{
        type: mongoose.Schema.Types.ObjectId, required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Transaction', txnSchema)
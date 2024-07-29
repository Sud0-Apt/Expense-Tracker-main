const Transaction=require('../models/txnModel')
const mongoose=require('mongoose')

// get all transactions
const getTransactions = async (req, res) => {
    const user_id=req.user._id
    const transacs= await Transaction.find({userid:user_id}).sort({createdAt:-1})

    res.status(200).json(transacs)
}

// get a single transaction
const getOneTransaction = async (req,res) => {
    const { id } = req.params

    if (!mongoose. Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such transaction'})
    }

    const transac = await Transaction.findById(id)
    if (!transac) {
        return res.status(404).json({error: 'No such transaction'})
    }
    res.status(200).json (transac)
}

// create new transaction
const createTransactions = async (req, res) => {
    const {type, Amount, TxnDate, userid} = req.body
    // add doc to db
    try {
        const transac = await Transaction.create({type, Amount, TxnDate, userid})
        res.status(200).json (transac)
    } catch (error) {
        res.status(400).json({error: error.message})
    }   
}

// delete a transaction
const deleteTransaction = async (req,res) => {
    const { id } = req.params

    if (!mongoose. Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such transaction' })
    }
    const transac = await Transaction.findOneAndDelete({_id: id})
    if (!transac) {
        return res.status(400).json({error: 'No such transaction'})
    }
    res.status(200).json(transac)
}
// update a workout
const updateTransaction = async (req, res) => {
    const { id } = req.params

    if (!mongoose. Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such transaction'})
    }
    const transac = await Transaction.findOneAndUpdate({_id: id}, {
        ...req.body
    })
    if (!transac) {
    return res.status(400).json({error: 'No such Transaction'})
    }
    res.status(200).json(transac)
}

// update a transaction

module.exports={
    getTransactions,
    getOneTransaction,
    createTransactions,
    deleteTransaction,
    updateTransaction
}
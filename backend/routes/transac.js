const express = require('express')

const router = express. Router()
const {
    createTransactions,
    getTransactions,
    getOneTransaction,
    deleteTransaction,
    updateTransaction
} = require('../controllers/txnController')
const requireAuth=require('../middleware/requireAuth')

// require auth for all txn routes
router.use(requireAuth)

// GET all txns
router.get('/', getTransactions)

//GET a single txn
router.get('/:id', getOneTransaction)

// POST a new txn
router.post('/', createTransactions)

// DELETE a txn
router.delete('/:id', deleteTransaction)

// UPDATE a txn
router.patch('/:id', updateTransaction)

module.exports = router
const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    title: String,
    amount: Number
});

module.exports = mongoose.model('Expense', expenseSchema);

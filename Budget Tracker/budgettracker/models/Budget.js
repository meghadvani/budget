const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
    amount: Number
});

module.exports = mongoose.model('Budget', budgetSchema);
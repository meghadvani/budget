const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Budget = require('./models/Budget');
const Expense = require('./models/Expense');
const bodyParser = require('body-parser');

const app = express();
const port = 8001;


mongoose.connect('mongodb://localhost:27017/budgetTracker', 
{
    useNewUrlParser: true,
    useUnifiedTopology: true

}).then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

    app.set('view engine', 'ejs');
    app.use(express.static('public'));
    app.use(bodyParser.urlencoded({ extended: true }));

    app.get('/', async (req, res) => {
    const budgetData = await Budget.findOne();
    const expenses = await Expense.find();

    const totalBudget = budgetData ? budgetData.amount : 0;
    // const totalExpenses = expenses.reduce((acc, expense) =>
        //   acc + expense.amount, 0);

    const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
    const budgetLeft = totalBudget - totalExpenses;


    res.render('index', {
        totalBudget,
        totalExpenses,
        budgetLeft,
        expenses
    });
});

app.post('/add-budget', async (req, res) => {
    const { budget } = req.body;
    await Budget.deleteMany(); 

    await Budget.create({ amount: parseFloat(budget) });
    res.redirect('/');

});


app.post('/add-expense', async (req, res) => {
    const { title, amount } = req.body;
    await Expense.create({ title, amount: parseFloat(amount) });
    res.redirect('/');

});


app.post('/remove-expense/:id', async (req, res) => {
    await Expense.findByIdAndDelete(req.params.id);
    res.redirect('/');
});
app.post('/reset', async (req, res) => {
    await Budget.deleteMany();
    await Expense.deleteMany();
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Task manager is running on port ${port}`);
});

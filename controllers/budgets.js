import { Budget } from "../models/budget.js"

async function index(req, res) {
  try {
    const budgets = await Budget.find({})
    res.render('budgets/index', {
      budgets
    })
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
}

async function show(req, res) {
  try {
    const budget = await Budget.findById(req.params.budgetId)
    res.render('budgets/show', (
      budget
    ))
  } catch (error) {
    console.log(error)
    res.redirect('/budgets')
  }
}

async function create(req, res) {
  try {
    req.body.budg = !!req.body.budg
    req.body.owner = req.session.user._id
    await Budget.create(req.body)
    res.redirect('/budgets')
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
}

export {
  index,
  show,
  create,
}
import { Budget } from "../models/budget.js"

function newBudget(req, res) {
  res.render('budgets/new')
}

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
    .populate(['owner'])
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
    req.body.complete = !!req.body.complete
    req.body.owner = req.session.user._id
    const budget = await Budget.create(req.body)
    res.redirect(`/budgets/${budget._id}`)
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
}

export {
  index,
  show,
  create,
  newBudget as new,
}
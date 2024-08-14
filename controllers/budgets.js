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

async function update(req, res) {
  try {
    const budget = await Budget.findById(req.params.budgetId)
    req.body.complete = !!req.body.complete
    req.body.owner = req.session.user._id
  } catch (error) {
    console.log(error)
    res.redirect('/budgets')
  }
}

async function complete(req, res) {
  try {
    const budget = await Budget.findById(req.params.budgetId)
    budget.complete = !budget.complete
    await budget.save(
    res.redirect(`/budgets/${budget._id}`)
    )
  } catch (error) {
    console.lof(error)
    res.redirect('/budgets')
  }
}

export {
  index,
  show,
  create,
  update,
  complete
}
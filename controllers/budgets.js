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
    const budget = await Budget.findById(req.params.budgetId).populate('owner')
    console.log(budget, ('ha'))
    
    res.render('budgets/show', {
      budget
  })
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
    if (budget.owner.equals(req.session.user._id)) {
      req.body.complete = !!req.body.complete
      await budget.updateOne(req.body)
      res.redirect(`/budgets/${budget._id}`)
    } else {
      throw new Error(`🚫 Not authorized 🚫`)
    }
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

async function deleteBudget(req, res) {
  try {
    const budget = await Budget.findById(req.params.budgetId)
    if (budget.owner.equals(req.session.user._id)) {
      await budget.deleteOne()
      res.redirect('/budgets')
    }
  } catch (error) {
    console.log(error)
    res.redirect('/budgets')
  }
}

async function edit(req, res) {
  try {
    const budget = await Budget.findById(req.params.budgetId)
    console.log('nope')
    res.render('budgets/edit', {
      budget
    })
  } catch (error) {
    console.log(error)
    res.redirect('/budgets')
  }
}

async function addExpense(req, res) {
  try {
    const budget = await Budget.findById(req.params.budgetId)
    req.body.author = req.session.user._id
    Budget.comments.push(req.body)
    await budget.save()
    res.redirect(`/budgets/${budget._id}`)
  } catch (error) {
    console.log(error)
    res.redirect('/budgets')
  }
}


export {
  index,
  show,
  create,
  update,
  complete,
  deleteBudget as delete,
  edit,
  addExpense
}
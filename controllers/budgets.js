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



export {
  index,
}
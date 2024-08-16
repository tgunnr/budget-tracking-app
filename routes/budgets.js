import { Router } from 'express'
import { isSignedIn } from '../middleware/is-signed-in.js'
import * as budgetsCtrl from '../controllers/budgets.js'

const router = Router()

// public routes
router.get('/', budgetsCtrl.index)

// protected routes
router.get('/:budgetId', isSignedIn, budgetsCtrl.show)
router.get('/:budgetId/edit', isSignedIn, budgetsCtrl.edit)
router.post('/', isSignedIn, budgetsCtrl.create)
router.put('/:budgetId', isSignedIn, budgetsCtrl.update)
router.post('/:budgetId/expenses', isSignedIn, budgetsCtrl.addExpense)
router.patch('/:budgetId/complete', isSignedIn, budgetsCtrl.complete)
router.delete('/:budgetId', isSignedIn, budgetsCtrl.delete)

export { router }
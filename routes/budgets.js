import { Router } from 'express'
import { isSignedIn } from '../middleware/is-signed-in.js'
import * as budgetsCtrl from '../controllers/budgets.js'

const router = Router()

// public routes
router.get('/', budgetsCtrl.index)

// protected routes
router.get('/:budgetId', isSignedIn, budgetsCtrl.show)
router.post('/', isSignedIn, budgetsCtrl.create)


export { router }
import { Router } from 'express'
import { isSignedIn } from '../middleware/is-signed-in.js'
import * as budgetsCtrl from '../controllers/budgets.js'

const router = Router()

// public routes

// protected routes

export { router }
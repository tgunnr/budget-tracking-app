import mongoose from "mongoose"

const Schema = mongoose.Schema

const expenseSchema = new Schema({
  name: String,
  price: Number,
  dueDate: Date
}, {
  timestamps: true
})

const budgetSchema = new Schema({
  name: String,
  complete: Boolean,
  expenses: [expenseSchema],
  owner: {type: Schema.Types.ObjectId, ref: 'User'}
}, {
  timestamps: true
})

const Budget = mongoose.model('Budget', budgetSchema)

export {
  Budget
}